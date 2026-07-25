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
| Quartz explorer         | Starlight sidebar groups                               |
| Quartz backlinks        | Build-time link analysis in `src/lib/content-graph.ts` |
| Quartz graph and D3     | Static SVG graph generated from the same link analysis |
| Quartz page actions     | Small Astro component with browser clipboard support   |
| Quartz research record  | Typed Starlight frontmatter and an Astro component     |
| Quartz SPA runtime      | Static HTML pages with normal navigation               |
| Global math resources   | Removed until a page actually needs math               |

The public routes did not change. Folder index pages still render at paths such as `/projects/` and `/templates/`.

## Content graph

`src/lib/content-graph.ts` reads the Markdown files during the build. It extracts standard Markdown links, resolves them relative to the source file, and ignores external URLs and fenced code samples.

The result feeds two views:

- page footers list notes that link to the current page;
- the graph page renders a static, linked SVG and an accessible list of every node.

There is no graph library and no graph JavaScript in the browser.

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
