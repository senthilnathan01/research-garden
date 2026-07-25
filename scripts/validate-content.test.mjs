import assert from "node:assert/strict"
import test from "node:test"
import { isForbiddenArtifact, validateMarkdown } from "./validate-content.mjs"

const validPublishedArticle = `---
title: A verified article
description: A concise public description.
visibility: public
publication_status: published
draft: false
content_type: article
sources:
  - https://doi.org/10.0000/example
---

# A verified article

Supported text.

## Sources

- https://doi.org/10.0000/example
`

test("accepts a published article with public metadata and sources", () => {
  assert.deepEqual(
    validateMarkdown("content/projects/example/article.md", validPublishedArticle),
    [],
  )
})

test("requires sources and a Sources section for published articles", () => {
  const invalid = validPublishedArticle
    .replace("sources:\n  - https://doi.org/10.0000/example", "sources: []")
    .replace("\n## Sources\n\n- https://doi.org/10.0000/example\n", "\n")
  const errors = validateMarkdown("content/projects/example/article.md", invalid)

  assert.equal(errors.length, 2)
  assert.match(errors[0], /non-empty sources list/)
  assert.match(errors[1], /## Sources section/)
})

test("keeps draft pages out of the published site", () => {
  const invalid = validPublishedArticle
    .replace("publication_status: published", "publication_status: draft")
    .replace("draft: false", "draft: false")
  const errors = validateMarkdown("content/projects/example/article.md", invalid)

  assert.equal(errors.length, 1)
  assert.match(errors[0], /draft and review pages must set draft: true/)
})

test("rejects private provenance and local paths", () => {
  const invalid = validPublishedArticle
    .replace("content_type: article", "content_type: article\nvault_path: secret")
    .replace("Supported text.", "Supported text from /Users/name/private-note.md.")
  const errors = validateMarkdown("content/projects/example/article.md", invalid)

  assert.equal(errors.length, 2)
  assert.match(errors[0], /must not include vault_path/)
  assert.match(errors[1], /local filesystem paths/)
})

test("rejects raw publication artifacts by extension", () => {
  assert.equal(isForbiddenArtifact("content/files/paper.pdf"), true)
  assert.equal(isForbiddenArtifact("content/files/paper.md"), false)
})
