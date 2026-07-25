# Site architecture

## Decision

The research garden uses Astro and Starlight. Quartz was removed in July 2026.

Starlight supplies the parts that are expensive to rebuild and easy to get wrong: accessible navigation, full-text search, responsive documentation layouts, code rendering, metadata, and static generation. Astro keeps the site mostly HTML and CSS. Custom behavior is limited to the pieces that belong to this garden.

## What replaced Quartz

| Previous feature        | Current implementation                                 |
| ----------------------- | ------------------------------------------------------ |
| Quartz content pipeline | Starlight content collection under `src/content/docs/` |
| Obsidian wikilinks      | Portable Markdown links                                |
| FlexSearch modal        | Starlight's Pagefind search                            |
| Quartz explorer         | Route-aware Starlight sidebar groups                   |
| Quartz backlinks        | Build-time link analysis in `src/lib/content-graph.ts` |
| Quartz graph and D3     | Small interactive SVG graph using the same link data   |
| Quartz page actions     | Removed from the public reading experience             |
| Quartz research record  | Retained as validation metadata, not rendered UI       |
| Quartz SPA runtime      | Static HTML pages with normal navigation               |
| Global math resources   | Removed until a page actually needs math               |

Project folder index pages render at stable paths such as `/projects/ai-safety/`.

## Content graph

`src/lib/content-graph.ts` reads the Markdown files during the build. It extracts standard Markdown links, resolves them relative to the source file, and ignores external URLs and fenced code samples.

The result feeds two views:

- page footers list notes that link to the current page;
- the graph page renders a scoped, interactive SVG and a filterable directory of every public page.

Draft and review pages are excluded. Published project indexes are identified by `content_type: project`; that metadata drives the project directory and graph scopes. The graph renders only the selected scope, while the directory reveals matching pages in batches, so the interface remains usable as the collection grows.

There is no graph library. A small browser script handles pan, zoom, node dragging, relationship highlighting, page filtering, and batching.

## Navigation model

The homepage is a public project directory rather than an internal workspace map. Projects are the primary entry point; the graph and full-text search are secondary ways to explore.

The left sidebar follows the reader:

- garden-level pages show the garden and all projects;
- a project page shows a route back to all projects and only that project's pages;

## Frontmatter and publication safety

`src/content.config.ts` extends Starlight's schema with the research fields used by this garden. Astro checks their types during the build. `scripts/validate-content.mjs` adds publication rules that are broader than type checking, including privacy markers, state transitions, validation dates, artifact URLs, and source requirements.

Both checks run in `npm run verify`. After the build, the same command checks every local link and fragment in `dist/` and rejects any browser JavaScript file larger than 250 KB.

## Deployment

Astro builds a static site into `dist/`. The GitHub Actions workflow uses Astro's official Pages action, runs the complete verification command, and deploys only after it passes.

The site and base path are set in `astro.config.mjs`:

```text
site: https://senthilnathan01.github.io
base: /research-garden
```

Internal UI links use Astro's base URL. Content links are relative, which keeps them valid in local development and on GitHub Pages.
