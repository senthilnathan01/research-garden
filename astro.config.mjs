import { defineConfig } from "astro/config"
import starlight from "@astrojs/starlight"

const site = "https://senthilnathan01.github.io"
const base = "/research-garden"

export default defineConfig({
  site,
  base,
  trailingSlash: "always",
  integrations: [
    starlight({
      title: "Research Garden",
      description:
        "Notes, experiments, references, and project logs from Senthilnathan's research work.",
      favicon: "/icon.png",
      customCss: ["./src/styles/custom.css"],
      editLink: {
        baseUrl: "https://github.com/senthilnathan01/research-garden/edit/main/src/content/docs/",
      },
      lastUpdated: true,
      social: [
        {
          icon: "github",
          label: "Research Garden on GitHub",
          href: "https://github.com/senthilnathan01/research-garden",
        },
      ],
      sidebar: [
        {
          label: "Garden",
          items: [{ slug: "" }, { slug: "projects" }, { slug: "graph" }],
        },
        {
          label: "Projects",
          items: [
            {
              autogenerate: {
                directory: "projects",
                collapsed: true,
              },
            },
          ],
        },
        {
          label: "Template library",
          items: [
            {
              autogenerate: {
                directory: "templates",
                collapsed: true,
              },
            },
          ],
        },
      ],
      components: {
        Header: "./src/components/Header.astro",
        Sidebar: "./src/components/Sidebar.astro",
        SiteTitle: "./src/components/SiteTitle.astro",
        PageTitle: "./src/components/PageTitle.astro",
        Footer: "./src/components/PageFooter.astro",
      },
      head: [
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            content: `${site}${base}/og-image.png`,
          },
        },
        {
          tag: "meta",
          attrs: {
            name: "twitter:card",
            content: "summary_large_image",
          },
        },
      ],
    }),
  ],
})
