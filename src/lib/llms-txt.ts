export interface AgentReadablePage {
  id: string
  title: string
  description: string
  contentType: string
}

const CORE_PAGE_IDS = new Set(["index", "projects"])

function pagePath(id: string): string {
  if (id === "index") return ""
  return `${id.replace(/\/index$/, "")}/`
}

function formatLink(page: AgentReadablePage, baseUrl: URL): string {
  const url = new URL(pagePath(page.id), baseUrl)
  return `- [${page.title}](${url}): ${page.description}`
}

function formatSection(title: string, pages: AgentReadablePage[], baseUrl: URL): string[] {
  if (pages.length === 0) return []

  return [`## ${title}`, "", ...pages.map((page) => formatLink(page, baseUrl)), ""]
}

export function buildLlmsTxt(pages: AgentReadablePage[], baseUrl: URL): string {
  const publishedPages = pages
    .filter((page) => page.id !== "graph")
    .sort((a, b) => a.title.localeCompare(b.title))

  const corePages = publishedPages.filter((page) => CORE_PAGE_IDS.has(page.id))
  const projects = publishedPages.filter((page) => page.contentType === "project")
  const research = publishedPages.filter(
    (page) => !CORE_PAGE_IDS.has(page.id) && page.contentType !== "project",
  )

  const lines = [
    "# Research Garden",
    "",
    "> Senthilnathan's public engineering and research documentation, including projects, notes, experiments, references, and results.",
    "",
    "Use the project pages as the canonical entry points. Content listed here is public and published; drafts and private working material are excluded.",
    "",
    ...formatSection("Start here", corePages, baseUrl),
    ...formatSection("Research projects", projects, baseUrl),
    ...formatSection("Research pages", research, baseUrl),
    "## Optional",
    "",
    `- [Knowledge graph](${new URL("graph/", baseUrl)}): Explore relationships between public projects and notes.`,
    "- [Source repository](https://github.com/senthilnathan01/research-garden): Inspect the source Markdown and site implementation.",
    "",
  ]

  return lines.join("\n")
}
