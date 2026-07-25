import assert from "node:assert/strict"
import test from "node:test"
import { formatRecordLabel, parseValidationDate } from "./research-record"

test("formats machine-readable record labels", () => {
  assert.equal(formatRecordLabel("published"), "Published")
  assert.equal(formatRecordLabel("experiment_note"), "Experiment Note")
})

test("parses valid date-only values", () => {
  assert.equal(parseValidationDate("2026-07-25")?.toISOString(), "2026-07-25T00:00:00.000Z")
})

test("rejects invalid validation dates", () => {
  assert.equal(parseValidationDate("not-a-date"), undefined)
  assert.equal(parseValidationDate(undefined), undefined)
})
