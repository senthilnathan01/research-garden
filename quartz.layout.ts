import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

const footerLinks = {
  "Main Site": "https://senthilnathan01.github.io/",
  "Garden Source": "https://github.com/senthilnathan01/research-garden",
  Quartz: "https://github.com/jackyzha0/quartz",
}

const recentNotesConfig = {
  limit: 8,
  showTags: false,
  filter: (page: { slug?: string; frontmatter?: { tags?: string[] } }) =>
    !page.slug?.startsWith("templates/") &&
    !page.slug?.includes("/templates/") &&
    !page.frontmatter?.tags?.includes("index"),
}

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [Component.SiteHeader(), Component.Search(), Component.Darkmode()],
  afterBody: [Component.Backlinks(), Component.RecentNotes(recentNotesConfig)],
  footer: Component.DesktopOnly(
    Component.Footer({
      links: footerLinks,
    }),
  ),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.HomeHero(),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.PageActions(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
  left: [
    Component.DesktopOnly(Component.GardenNav()),
    Component.Explorer({
      title: "Research index",
      folderDefaultState: "open",
    }),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.ConditionalRender({
      component: Component.DesktopOnly(
        Component.Graph({
          localGraph: {
            depth: 2,
            enableRadial: true,
          },
          globalGraph: {
            depth: -1,
            enableRadial: true,
          },
        }),
      ),
      condition: (page) => page.fileData.slug === "graph",
    }),
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.HomeHero(),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.PageActions(),
      condition: (page) => page.fileData.slug !== "index",
    }),
  ],
  left: [
    Component.DesktopOnly(Component.GardenNav()),
    Component.Explorer({
      title: "Research index",
      folderDefaultState: "open",
    }),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.ConditionalRender({
      component: Component.DesktopOnly(Component.Graph()),
      condition: (page) => page.fileData.slug === "graph",
    }),
  ],
}
