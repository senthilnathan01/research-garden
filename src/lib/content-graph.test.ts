import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import test from "node:test"
import { buildGardenGraph, getBacklinks, resolveGardenLink } from "./content-graph"

test("resolves links relative to their source file", () => {
  assert.equal(resolveGardenLink("projects/index.md", "./alpha/"), "projects/alpha")
  assert.equal(resolveGardenLink("projects/alpha/index.md", "../../graph/"), "graph")
  assert.equal(resolveGardenLink("index.md", "/research-garden/graph/"), "graph")
  assert.equal(resolveGardenLink("index.md", "https://example.com"), undefined)
})

test("builds graph edges and backlinks without indexing code examples", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "research-garden-graph-"))
  fs.mkdirSync(path.join(root, "notes"))
  fs.writeFileSync(
    path.join(root, "index.md"),
    "---\ntitle: Home\ndescription: Home\ncontent_type: index\ntags:\n  - garden\n---\n[Alpha](./notes/alpha/)\n",
  )
  fs.writeFileSync(
    path.join(root, "notes", "alpha.md"),
    "---\ntitle: Alpha\ndescription: Alpha\ncontent_type: note\n---\n```md\n[Ignored](../)\n```\n",
  )
  fs.writeFileSync(
    path.join(root, "notes", "draft.md"),
    "---\ntitle: Draft\ndescription: Private draft\ndraft: true\ncontent_type: note\n---\n",
  )

  const graph = buildGardenGraph(root)
  assert.deepEqual(graph.edges, [{ source: "", target: "notes/alpha" }])
  assert.deepEqual(
    graph.pages.map(({ id, contentType, tags }) => ({ id, contentType, tags })),
    [
      { id: "", contentType: "index", tags: ["garden"] },
      { id: "notes/alpha", contentType: "note", tags: [] },
    ],
  )
  assert.deepEqual(
    getBacklinks("notes/alpha", graph).map((page) => page.title),
    ["Home"],
  )

  fs.rmSync(root, { recursive: true })
})
