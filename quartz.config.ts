import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "Senthilnathan Research Garden",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "senthilnathan01.github.io/research-garden",
    ignorePatterns: [".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        title: "Space Grotesk",
        header: "Space Grotesk",
        body: "IBM Plex Sans",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f5f7fb",
          lightgray: "#d7dde8",
          gray: "#667085",
          darkgray: "#243042",
          dark: "#101828",
          secondary: "#0f9fa8",
          tertiary: "#f59e0b",
          highlight: "rgba(15, 159, 168, 0.10)",
          textHighlight: "#f9d68a66",
        },
        darkMode: {
          light: "#09090b",
          lightgray: "#27272a",
          gray: "#a1a1aa",
          darkgray: "#e4e4e7",
          dark: "#fafafa",
          secondary: "#22d3ee",
          tertiary: "#fbbf24",
          highlight: "rgba(34, 211, 238, 0.12)",
          textHighlight: "#134e4a88",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({
        enableInHtmlEmbed: false,
        enableCheckbox: true,
      }),
      Plugin.GitHubFlavoredMarkdown({
        enableSmartyPants: true,
        linkHeadings: true,
      }),
      Plugin.TableOfContents({
        maxDepth: 4,
        collapseByDefault: false,
      }),
      Plugin.CrawlLinks({
        markdownLinkResolution: "shortest",
        lazyLoad: true,
        openLinksInNewTab: true,
        externalLinkIcon: true,
      }),
      Plugin.Description({
        descriptionLength: 220,
      }),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
        rssLimit: 30,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
