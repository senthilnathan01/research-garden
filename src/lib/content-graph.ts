import fs from "node:fs"
import path from "node:path"
import yaml from "js-yaml"

export type GardenPage = {
  id: string
  title: string
  description: string
  sourcePath: string
}

export type GardenEdge = {
  source: string
  target: string
}

export type GardenGraph = {
  pages: GardenPage[]
  edges: GardenEdge[]
}

const defaultContentRoot = path.resolve("src/content/docs")

function walk(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name)
    return entry.isDirectory() ? walk(entryPath) : [entryPath]
  })
}

function pageIdFromSourcePath(sourcePath: string): string {
  const withoutExtension = sourcePath.replace(/\.(?:md|mdx)$/, "")
  return withoutExtension.replace(/(?:^|\/)index$/, "").replace(/\/$/, "")
}

function readFrontmatter(source: string): Record<string, unknown> {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
  if (!match) return {}

  const parsed = yaml.load(match[1], { schema: yaml.JSON_SCHEMA })
  return parsed && typeof parsed === "object" && !Array.isArray(parsed)
    ? (parsed as Record<string, unknown>)
    : {}
}

function stripFencedCode(source: string): string {
  return source.replace(/^(?:```|~~~)[^\n]*\n[\s\S]*?^(?:```|~~~)\s*$/gm, "")
}

export function resolveGardenLink(sourcePath: string, href: string): string | undefined {
  const cleanHref = href.trim().replace(/^<|>$/g, "")
  if (cleanHref.length === 0 || cleanHref.startsWith("#") || /^(?:[a-z]+:|\/\/)/i.test(cleanHref)) {
    return
  }

  const withoutQuery = decodeURIComponent(cleanHref.split(/[?#]/, 1)[0] ?? "")
  const withoutBase = withoutQuery.replace(/^\/research-garden(?=\/|$)/, "")
  const sourceDirectory = path.posix.dirname(sourcePath)
  const resolved = withoutBase.startsWith("/")
    ? withoutBase
    : path.posix.resolve("/", sourceDirectory, withoutBase)

  return resolved
    .replace(/^\//, "")
    .replace(/\.(?:md|mdx)$/, "")
    .replace(/(?:^|\/)index$/, "")
    .replace(/\/$/, "")
}

export function buildGardenGraph(contentRoot = defaultContentRoot): GardenGraph {
  const markdownFiles = walk(contentRoot)
    .filter((file) => /\.(?:md|mdx)$/.test(file))
    .sort()

  const documents = markdownFiles.map((file) => {
    const sourcePath = path.relative(contentRoot, file).split(path.sep).join("/")
    const source = fs.readFileSync(file, "utf8")
    const frontmatter = readFrontmatter(source)

    return {
      page: {
        id: pageIdFromSourcePath(sourcePath),
        title: typeof frontmatter.title === "string" ? frontmatter.title : sourcePath,
        description: typeof frontmatter.description === "string" ? frontmatter.description : "",
        sourcePath,
      },
      source,
    }
  })

  const pageIds = new Set(documents.map(({ page }) => page.id))
  const edges = documents.flatMap(({ page, source }) => {
    const links = [...stripFencedCode(source).matchAll(/!?\[[^\]]*]\(([^)\s]+)(?:\s+[^)]*)?\)/g)]
    return links
      .filter((match) => !match[0].startsWith("!"))
      .map((match) => resolveGardenLink(page.sourcePath, match[1] ?? ""))
      .filter(
        (target): target is string =>
          target !== undefined && target !== page.id && pageIds.has(target),
      )
      .map((target) => ({ source: page.id, target }))
  })

  return {
    pages: documents.map(({ page }) => page),
    edges: [...new Map(edges.map((edge) => [`${edge.source}->${edge.target}`, edge])).values()],
  }
}

export function getBacklinks(id: string, graph = buildGardenGraph()): GardenPage[] {
  const sourceIds = new Set(
    graph.edges.filter((edge) => edge.target === id).map((edge) => edge.source),
  )
  return graph.pages.filter((page) => sourceIds.has(page.id))
}

export function getGardenPage(id: string, graph = buildGardenGraph()): GardenPage | undefined {
  return graph.pages.find((page) => page.id === id)
}
