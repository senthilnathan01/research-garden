import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "Main Site": "https://senthilnathan01.github.io/",
      "Garden Source": "https://github.com/senthilnathan01/research-garden",
      Quartz: "https://github.com/jackyzha0/quartz",
    },
  }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.GardenBrand(),
    Component.DesktopOnly(Component.GardenNav()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.DesktopOnly(Component.ReaderMode()) },
      ],
      wrap: "wrap",
      gap: "0.5rem",
    }),
    Component.Explorer({
      title: "Browse Garden",
      folderDefaultState: "collapsed",
    }),
  ],
  right: [
    Component.DesktopOnly(
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
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.RecentNotes({
      limit: 8,
    }),
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
    Component.GardenBrand(),
    Component.DesktopOnly(Component.GardenNav()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.DesktopOnly(Component.ReaderMode()) },
      ],
      wrap: "wrap",
      gap: "0.5rem",
    }),
    Component.Explorer({
      title: "Browse Garden",
      folderDefaultState: "collapsed",
    }),
  ],
  right: [
    Component.DesktopOnly(Component.Graph()),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
    Component.RecentNotes({
      limit: 8,
    }),
  ],
}
