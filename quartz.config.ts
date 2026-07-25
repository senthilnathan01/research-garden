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
        title: "Inter",
        header: "Inter",
        body: "Inter",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#ffffff",
          lightgray: "#e8ebe9",
          gray: "#6b746f",
          darkgray: "#38413c",
          dark: "#141917",
          secondary: "#0f8f63",
          tertiary: "#087652",
          highlight: "rgba(15, 143, 99, 0.09)",
          textHighlight: "#bdebd577",
        },
        darkMode: {
          light: "#101311",
          lightgray: "#2a302d",
          gray: "#929c96",
          darkgray: "#d9dfdb",
          dark: "#f5f7f6",
          secondary: "#48d597",
          tertiary: "#79e8b6",
          highlight: "rgba(72, 213, 151, 0.11)",
          textHighlight: "#17644588",
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
