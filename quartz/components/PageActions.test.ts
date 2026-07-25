import assert from "node:assert/strict"
import test from "node:test"
import { sourceUrlForPage } from "../util/sourceUrl"

test("sourceUrlForPage links nested content files to their GitHub source", () => {
  assert.equal(
    sourceUrlForPage(
      "/workspace/research-garden/content/projects/open-ai-challenge-parameter-golf/index.md",
    ),
    "https://github.com/senthilnathan01/research-garden/blob/main/content/projects/open-ai-challenge-parameter-golf/index.md",
  )
})

test("sourceUrlForPage falls back to the repository when a file path is unavailable", () => {
  assert.equal(sourceUrlForPage(), "https://github.com/senthilnathan01/research-garden")
})
