import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

const siteOrigin = "https://senthilnathan01.github.io"
const basePath = "/research-garden"
const maximumJavaScriptBytes = 250 * 1024

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(entryPath) : [entryPath]
  })
}

function pageUrlForFile(buildRoot, file) {
  const relativePath = path.relative(buildRoot, file).split(path.sep).join("/")
  if (relativePath === "index.html") return `${siteOrigin}${basePath}/`
  if (relativePath.endsWith("/index.html")) {
    return `${siteOrigin}${basePath}/${relativePath.replace(/index\.html$/, "")}`
  }
  return `${siteOrigin}${basePath}/${relativePath}`
}

function targetFileForUrl(buildRoot, url) {
  const relativePath = decodeURIComponent(url.pathname.slice(basePath.length)).replace(/^\//, "")
  if (relativePath === "404/") return path.join(buildRoot, "404.html")
  if (relativePath === "" || relativePath.endsWith("/")) {
    return path.join(buildRoot, relativePath, "index.html")
  }
  return path.join(buildRoot, relativePath)
}

function auditLinks(buildRoot, htmlFiles) {
  const errors = []
  let checkedLinks = 0

  for (const file of htmlFiles) {
    const source = fs.readFileSync(file, "utf8")
    const pageUrl = pageUrlForFile(buildRoot, file)
    const references = [...source.matchAll(/\b(?:href|src)=["']([^"'<>]+)["']/g)].map(
      (match) => match[1],
    )

    for (const reference of references) {
      if (
        reference.startsWith("data:") ||
        reference.startsWith("mailto:") ||
        reference.startsWith("tel:") ||
        reference.startsWith("javascript:")
      ) {
        continue
      }

      const url = new URL(reference, pageUrl)
      if (url.origin !== siteOrigin) continue

      checkedLinks += 1
      if (!url.pathname.startsWith(`${basePath}/`) && url.pathname !== basePath) {
        errors.push(`${path.relative(buildRoot, file)}: link escapes base path: ${reference}`)
        continue
      }

      const targetFile = targetFileForUrl(buildRoot, url)
      if (!fs.existsSync(targetFile)) {
        errors.push(`${path.relative(buildRoot, file)}: missing target for ${reference}`)
        continue
      }

      if (url.hash && targetFile.endsWith(".html")) {
        const targetSource = fs.readFileSync(targetFile, "utf8")
        const fragment = decodeURIComponent(url.hash.slice(1))
        const escapedFragment = fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        if (!new RegExp(`(?:id|name)=["']${escapedFragment}["']`).test(targetSource)) {
          errors.push(`${path.relative(buildRoot, file)}: missing fragment for ${reference}`)
        }
      }
    }
  }

  return { checkedLinks, errors }
}

function auditJavaScript(buildRoot, files) {
  return files
    .filter((file) => file.endsWith(".js"))
    .flatMap((file) => {
      const bytes = fs.statSync(file).size
      return bytes > maximumJavaScriptBytes
        ? [
            `${path.relative(buildRoot, file)}: ${bytes.toLocaleString()} bytes exceeds the ${maximumJavaScriptBytes.toLocaleString()} byte limit`,
          ]
        : []
    })
}

export function auditBuild(buildRoot) {
  if (!fs.existsSync(buildRoot)) {
    return { errors: [`Build output does not exist: ${buildRoot}`], htmlCount: 0, checkedLinks: 0 }
  }

  const files = walk(buildRoot)
  const htmlFiles = files.filter((file) => file.endsWith(".html"))
  const linkAudit = auditLinks(buildRoot, htmlFiles)
  const errors = [...linkAudit.errors, ...auditJavaScript(buildRoot, files)]

  return { errors, htmlCount: htmlFiles.length, checkedLinks: linkAudit.checkedLinks }
}

function main() {
  const repositoryRoot = path.resolve(import.meta.dirname, "..")
  const result = auditBuild(path.join(repositoryRoot, "dist"))

  if (result.errors.length > 0) {
    console.error("Static build audit failed:")
    for (const error of result.errors) console.error(`- ${error}`)
    process.exitCode = 1
    return
  }

  console.log(
    `Static build audit passed (${result.htmlCount} HTML files, ${result.checkedLinks} local links checked).`,
  )
}

const invokedPath = process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href
if (invokedPath === import.meta.url) main()
