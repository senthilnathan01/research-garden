# Research Garden

This repository is a reusable Quartz 4 research garden for multiple projects, published to:

- [https://senthilnathan01.github.io/research-garden/](https://senthilnathan01.github.io/research-garden/)

<img width="1278" height="858" alt="Screenshot 2026-03-26 at 11 13 26 AM" src="https://github.com/user-attachments/assets/4983c222-02bf-42f7-ba4e-f7a884bd2332" />


It is designed as a long-lived garden, not a single-project microsite. New work should live under `content/projects/<project-slug>/`.

## What this repo contains

- `content/`
  - reusable project pages, placeholder project structure, and Markdown templates
- `content/projects/<project-slug>/`
  - the canonical location for each project garden
- `quartz/`
  - the Quartz 4 engine and components used to build the site
- `quartz.config.ts`
  - site-wide configuration, theme, plugins, and GitHub Pages base URL
- `quartz.layout.ts`
  - the shared layout, sidebars, navigation, footer links, and enabled widgets
- `.github/workflows/deploy.yml`
  - GitHub Pages workflow that builds and deploys the site

## Local setup

Install dependencies:

```bash
npm ci
```

Start the local Quartz dev server:

```bash
npm run dev
```

Build the static site:

```bash
npm run build
```

Run type and formatting checks:

```bash
npm run check
```

Run the Quartz test suite that ships with this repo:

```bash
npm test
```

## Content model

Every project lives under a dedicated slug:

```text
content/projects/<project-slug>/
```

The placeholder project included in this repo is the reference scaffold:

```text
content/projects/open-ai-challenge-parameter-golf/
```

Each project folder is expected to include:

```text
index.md
overview.md
papers/index.md
notes/index.md
resources/index.md
experiments/index.md
```

Use those pages as durable entry points, then add child notes beneath the relevant folders over time.

## Create a new project from the placeholder scaffold

1. Duplicate the placeholder project folder.

```bash
cp -R content/projects/open-ai-challenge-parameter-golf content/projects/<new-project-slug>
```

2. Update frontmatter titles, descriptions, and placeholder text in the copied files.
3. Replace internal links so they point to the new slug instead of `open-ai-challenge-parameter-golf`.
4. Add real notes under `papers/`, `notes/`, `resources/`, and `experiments/` as the project grows.
5. Add the new project to `content/projects/index.md`.

## Reusable Markdown templates

The template library lives in `content/templates/` and provides starter files for:

- project home pages
- project overview pages
- paper notes
- general research notes
- resource notes
- experiment logs

Use those templates when creating additional pages inside a project folder.

## Publish to GitHub Pages

1. Push this repository to GitHub.
2. In the repository settings, open **Pages** and set **Source** to **GitHub Actions**.
3. Push to `main` or `master`.
4. GitHub Actions will run `.github/workflows/deploy.yml` and publish the built `public/` output to:

- [https://senthilnathan01.github.io/research-garden/](https://senthilnathan01.github.io/research-garden/)

## Update workflow

For a normal content or config update:

```bash
npm run check
npm run build
git add .
git commit -m "Update research garden"
git push origin main
```

If you make broad structural changes, take a checkpoint commit before continuing so the garden stays easy to review and roll back.
