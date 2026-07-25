# Research Garden

This is where I publish engineering notes, experiments, references, and the decisions behind them.

The live site is [senthilnathan01.github.io/research-garden](https://senthilnathan01.github.io/research-garden/).

![Research Garden](./public/og-image.png)

The site runs on [Astro](https://astro.build/) and [Starlight](https://starlight.astro.build/). Starlight handles the documentation shell, accessibility, search, mobile navigation, and static rendering. The research-specific parts live in this repository: provenance records, backlinks, source actions, the home page, and the content graph.

## Repository map

```text
src/
  components/         Custom research and documentation UI
  content/docs/       Public Markdown pages
  lib/                Build-time graph and provenance helpers
  styles/             Site design tokens and component styles
public/               Images and social preview assets
scripts/              Publication validation
```

Other important files:

- `astro.config.mjs` contains the Starlight navigation, metadata, component overrides, and GitHub Pages base path.
- `PUBLICATION_WORKFLOW.md` defines the private-vault to public-garden contract.
- `ARCHITECTURE.md` records the framework choice and the features rebuilt after Quartz.
- `.github/workflows/deploy.yml` verifies and publishes the static site.

## Work locally

The project requires Node 22.12 or newer.

```bash
npm ci
npm run dev
```

The development server prints its local URL. The production build goes to `dist/`.

Run the full local release gate with:

```bash
npm run verify
```

That command validates public content, checks Astro and TypeScript, checks formatting, runs the tests, builds the same static output used by GitHub Pages, and audits every internal link in that output.

Individual commands are also available:

```bash
npm run validate:content
npm run check
npm test
npm run build
npm run audit:build
npm run preview
```

## Add a project

Every project has its own folder:

```text
src/content/docs/projects/<project-slug>/
```

The parameter golf project is the reference structure:

```text
src/content/docs/projects/open-ai-challenge-parameter-golf/
  index.md
  bets/index.md
  log/index.md
  references/index.md
  submissions/index.md
  templates/
```

Copy that folder when the structure fits. Rename or remove sections when it does not. Projects should reflect the work rather than conform to one fixed taxonomy.

After copying it:

1. Update the frontmatter, descriptions, and links.
2. Add the project to `src/content/docs/projects/index.md`.
3. Run `npm run verify`.

The reusable page templates live in `src/content/docs/templates/`.

## Publish research safely

Private research stays in a separate knowledge vault. This repository receives a public, self-contained derivative.

New pages start with:

```yaml
visibility: public
publication_status: draft
draft: true
content_type: article
```

Before publishing, verify the claims and links, remove private paths and raw documents, record the validation date, and add public sources or artifacts. Then set `publication_status: published`, set `draft: false`, and run `npm run verify`.

The validator blocks private provenance fields, local filesystem paths, raw document files, invalid state transitions, and incomplete source metadata. The full contract is in `PUBLICATION_WORKFLOW.md`.

## Deploy

GitHub Pages must use GitHub Actions as its source. A push to `main` or `master` runs the workflow, executes `npm run verify`, and deploys `dist/`.

Commits should be small enough to review and roll back, but each commit should leave the repository in a working state. A coherent UI change, test addition, or documentation update is a useful commit boundary. A single line is usually not.
