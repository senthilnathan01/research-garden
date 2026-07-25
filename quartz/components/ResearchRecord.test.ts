import assert from "node:assert/strict"
import test from "node:test"
import { formatRecordLabel, parseValidationDate } from "../util/researchRecord"

test("formatRecordLabel turns metadata identifiers into readable labels", () => {
  assert.equal(formatRecordLabel("published"), "Published")
  assert.equal(formatRecordLabel("research_article"), "Research Article")
  assert.equal(formatRecordLabel("design-guide"), "Design Guide")
})

test("parseValidationDate accepts real ISO date-only values", () => {
  const parsed = parseValidationDate("2026-07-25")

  assert.ok(parsed)
  assert.equal(parsed.getFullYear(), 2026)
  assert.equal(parsed.getMonth(), 6)
  assert.equal(parsed.getDate(), 25)
})

test("parseValidationDate rejects malformed and impossible dates", () => {
  assert.equal(parseValidationDate("07/25/2026"), undefined)
  assert.equal(parseValidationDate("2026-02-30"), undefined)
  assert.equal(parseValidationDate(undefined), undefined)
})
