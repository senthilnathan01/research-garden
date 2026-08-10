import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import test from "node:test"

import { auditBuild } from "./audit-build.mjs"

const pageViewCounter =
  '<img src="https://hits.sh/senthilnathan01.github.io/research-garden.svg?view=total" data-page-view-counter>'

function buildWithHtml(source) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "research-garden-build-audit-"))
  fs.writeFileSync(path.join(root, "index.html"), `${source}${pageViewCounter}`)
  return root
}

test("allows the canonical main-site link as an external destination", (t) => {
  const root = buildWithHtml('<a href="https://senthilnathan01.github.io/">Main site</a>')
  t.after(() => fs.rmSync(root, { recursive: true }))

  assert.deepEqual(auditBuild(root).errors, [])
})

test("continues to reject accidental same-origin links outside the garden base path", (t) => {
  const root = buildWithHtml('<a href="https://senthilnathan01.github.io/about/">About</a>')
  t.after(() => fs.rmSync(root, { recursive: true }))

  assert.deepEqual(auditBuild(root).errors, [
    "index.html: link escapes base path: https://senthilnathan01.github.io/about/",
  ])
})

test("requires the shared site-wide page-view counter on every rendered page", (t) => {
  const root = buildWithHtml("")
  t.after(() => fs.rmSync(root, { recursive: true }))
  fs.writeFileSync(path.join(root, "index.html"), "<main>Research Garden</main>")

  assert.deepEqual(auditBuild(root).errors, [
    "index.html: expected exactly one site-wide page-view counter, found 0",
    "index.html: page-view counter must use the shared garden endpoint",
  ])
})

test("rejects counters that would fragment traffic across another endpoint", (t) => {
  const root = buildWithHtml("")
  t.after(() => fs.rmSync(root, { recursive: true }))
  fs.writeFileSync(
    path.join(root, "index.html"),
    '<img src="https://hits.sh/senthilnathan01.github.io/research-garden/projects.svg" data-page-view-counter>',
  )

  assert.deepEqual(auditBuild(root).errors, [
    "index.html: page-view counter must use the shared garden endpoint",
  ])
})
