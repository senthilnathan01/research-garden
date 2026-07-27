import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import test from "node:test"

import { auditBuild } from "./audit-build.mjs"

function buildWithHtml(source) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "research-garden-build-audit-"))
  fs.writeFileSync(path.join(root, "index.html"), source)
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
