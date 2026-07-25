import assert from "node:assert/strict"
import test from "node:test"

import { buildLlmsTxt } from "./llms-txt"

test("buildLlmsTxt creates a canonical agent index and excludes the graph from primary sections", () => {
  const output = buildLlmsTxt(
    [
      {
        id: "projects/ai-safety/index",
        title: "AI Safety",
        description: "Research notes on AI safety.",
        contentType: "project",
      },
      {
        id: "index",
        title: "Research Garden",
        description: "The public research homepage.",
        contentType: "index",
      },
      {
        id: "graph",
        title: "Graph",
        description: "Browse linked notes.",
        contentType: "index",
      },
    ],
    new URL("https://senthilnathan01.github.io/research-garden/"),
  )

  assert.match(output, /^# Research Garden\n\n>/)
  assert.match(
    output,
    /https:\/\/senthilnathan01\.github\.io\/research-garden\/projects\/ai-safety\//,
  )
  assert.match(
    output,
    /\[Research Garden\]\(https:\/\/senthilnathan01\.github\.io\/research-garden\/\)/,
  )
  assert.match(output, /## Optional[\s\S]*\/research-garden\/graph\//)
  assert.equal((output.match(/\[Knowledge graph\]/g) ?? []).length, 1)
  assert.doesNotMatch(output, /\[Graph\].*Browse linked notes/)
})
