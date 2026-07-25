import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"
import yaml from "js-yaml"

const allowedStatuses = new Set(["draft", "review", "published"])
const allowedTypes = new Set([
  "index",
  "project",
  "article",
  "paper",
  "note",
  "resource",
  "experiment",
  "template",
])
const sourcedTypes = new Set(["article", "paper"])
const validatedTypes = new Set(["project", "article", "paper", "resource", "experiment"])
const allowedArtifactKinds = new Set(["brief", "code", "data", "demo", "paper", "results", "other"])
const privateFields = ["source_notes", "vault_path", "private_notes", "pdf_path"]
const forbiddenExtensions = new Set([".pdf", ".doc", ".docx", ".ppt", ".pptx"])

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0
}

function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  if (!match) {
    return { error: "missing YAML frontmatter" }
  }

  try {
    const data = yaml.load(match[1], { schema: yaml.JSON_SCHEMA })
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return { error: "frontmatter must be a YAML mapping" }
    }
    return { data }
  } catch (error) {
    return { error: `invalid YAML frontmatter: ${error.message}` }
  }
}

function isIsoDateOnly(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false

  const date = new Date(`${value}T00:00:00`)
  if (Number.isNaN(date.getTime())) return false

  const [year, month, day] = value.split("-").map(Number)
  return date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day
}

export function validateMarkdown(relativePath, source) {
  const errors = []
  const parsed = parseFrontmatter(source)
  if (parsed.error) {
    return [`${relativePath}: ${parsed.error}`]
  }

  const frontmatter = parsed.data

  if (!isNonEmptyString(frontmatter.title)) {
    errors.push(`${relativePath}: title must be a non-empty string`)
  }
  if (!isNonEmptyString(frontmatter.description)) {
    errors.push(`${relativePath}: description must be a non-empty string`)
  }
  if (frontmatter.visibility !== "public") {
    errors.push(`${relativePath}: visibility must be public`)
  }
  if (!allowedStatuses.has(frontmatter.publication_status)) {
    errors.push(`${relativePath}: publication_status must be draft, review, or published`)
  }
  if (!allowedTypes.has(frontmatter.content_type)) {
    errors.push(`${relativePath}: content_type is missing or unsupported`)
  }
  if (typeof frontmatter.draft !== "boolean") {
    errors.push(`${relativePath}: draft must be a boolean`)
  } else if (frontmatter.publication_status === "published" && frontmatter.draft !== false) {
    errors.push(`${relativePath}: published pages must set draft: false`)
  } else if (
    ["draft", "review"].includes(frontmatter.publication_status) &&
    frontmatter.draft !== true
  ) {
    errors.push(`${relativePath}: draft and review pages must set draft: true`)
  }

  for (const field of privateFields) {
    if (Object.hasOwn(frontmatter, field)) {
      errors.push(`${relativePath}: public frontmatter must not include ${field}`)
    }
  }

  if (
    frontmatter.publication_status === "published" &&
    validatedTypes.has(frontmatter.content_type) &&
    !isIsoDateOnly(frontmatter.validated)
  ) {
    errors.push(
      `${relativePath}: published ${frontmatter.content_type} pages need a validated date in YYYY-MM-DD format`,
    )
  } else if (frontmatter.validated !== undefined && !isIsoDateOnly(frontmatter.validated)) {
    errors.push(`${relativePath}: validated must use a real date in YYYY-MM-DD format`)
  }

  if (frontmatter.artifacts !== undefined) {
    if (!Array.isArray(frontmatter.artifacts)) {
      errors.push(`${relativePath}: artifacts must be a list`)
    } else {
      for (const artifact of frontmatter.artifacts) {
        if (!artifact || typeof artifact !== "object" || Array.isArray(artifact)) {
          errors.push(`${relativePath}: every artifact must be a mapping`)
          continue
        }
        if (!isNonEmptyString(artifact.label)) {
          errors.push(`${relativePath}: every artifact needs a non-empty label`)
        }
        if (!isNonEmptyString(artifact.href) || !/^https?:\/\//.test(artifact.href)) {
          errors.push(`${relativePath}: every artifact href must be an absolute http(s) URL`)
        }
        if (artifact.kind !== undefined && !allowedArtifactKinds.has(artifact.kind)) {
          errors.push(
            `${relativePath}: artifact kind must be brief, code, data, demo, paper, results, or other`,
          )
        }
      }
    }
  }

  if (
    frontmatter.publication_status === "published" &&
    sourcedTypes.has(frontmatter.content_type)
  ) {
    const sources = frontmatter.sources
    if (!Array.isArray(sources) || sources.length === 0) {
      errors.push(
        `${relativePath}: published ${frontmatter.content_type} pages need a non-empty sources list`,
      )
    } else {
      for (const sourceUrl of sources) {
        if (!isNonEmptyString(sourceUrl) || !/^https?:\/\//.test(sourceUrl)) {
          errors.push(`${relativePath}: every source must be an absolute http(s) URL`)
        }
      }
    }

    if (!/^## Sources\s*$/m.test(source)) {
      errors.push(
        `${relativePath}: published ${frontmatter.content_type} pages need a ## Sources section`,
      )
    }
  }

  if (/\/Users\/|file:\/\//i.test(source)) {
    errors.push(`${relativePath}: local filesystem paths are not public-safe`)
  }
  if (/\b(?:DO NOT PUBLISH|INTERNAL ONLY)\b/i.test(source)) {
    errors.push(`${relativePath}: contains an explicit private-content marker`)
  }

  return errors
}

export function isForbiddenArtifact(relativePath) {
  return forbiddenExtensions.has(path.extname(relativePath).toLowerCase())
}

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(entryPath) : [entryPath]
  })
}

export function validateContent(contentRoot) {
  const errors = []
  const files = walk(contentRoot)
  const markdownFiles = files.filter((file) => file.endsWith(".md"))

  for (const file of files) {
    const relativePath = path.relative(path.dirname(contentRoot), file)
    if (isForbiddenArtifact(relativePath)) {
      errors.push(`${relativePath}: raw document artifacts cannot be published`)
    }
  }

  for (const file of markdownFiles) {
    const relativePath = path.relative(path.dirname(contentRoot), file)
    errors.push(...validateMarkdown(relativePath, fs.readFileSync(file, "utf8")))
  }

  return { errors, markdownCount: markdownFiles.length }
}

function main() {
  const repositoryRoot = path.resolve(import.meta.dirname, "..")
  const contentRoot = path.join(repositoryRoot, "content")
  const result = validateContent(contentRoot)

  if (result.errors.length > 0) {
    console.error("Content publication validation failed:")
    for (const error of result.errors) {
      console.error(`- ${error}`)
    }
    process.exitCode = 1
    return
  }

  console.log(
    `Content publication validation passed (${result.markdownCount} Markdown files checked).`,
  )
}

const invokedPath = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href
if (invokedPath === import.meta.url) {
  main()
}
