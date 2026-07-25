# Publication workflow

This repository is public. The full research record stays in a separately configured private knowledge vault.

## What promotion means

Promotion creates a public, self-contained derivative of private research. It does not move or expose the private source notes.

| Private knowledge vault                   | Public research garden                         |
| ----------------------------------------- | ---------------------------------------------- |
| Raw captures and incomplete reasoning     | Refined narrative                              |
| Paper PDFs and detailed reading notes     | Canonical external links and concise citations |
| Private context and provenance            | Public-safe context                            |
| Open questions and unsupported hypotheses | Qualified claims with evidence                 |
| Obsidian paths and private wikilinks      | Standard Markdown links                        |

## Prepare the draft

A private draft is ready for promotion when:

- its status is `ready-to-publish`;
- material claims point to evidence;
- bibliographic metadata and canonical URLs are resolved;
- uncertainty and contradictory evidence are represented;
- its privacy checklist is complete.

## Create the public page

Create or update:

```text
src/content/docs/projects/<project-slug>/<article-slug>.md
```

Start from `src/content/docs/templates/article-template.md`. New pages begin as:

```yaml
visibility: public
publication_status: draft
draft: true
content_type: article
validated: YYYY-MM-DD
sources: []
artifacts:
  - label: Reproduction code
    href: https://github.com/example/reproduction
    kind: code
```

Do not include private vault paths or private note names. Keep private provenance in the vault and expose only public evidence here.

## Review and publish

Before setting `publication_status: published` and `draft: false`:

1. Verify factual claims and citations.
2. Set `validated` to the date the claims and links were last checked.
3. Add direct links to public code, data, papers, demos, or results.
4. Complete the editorial and privacy checklist in the article template.
5. Run `npm run verify`.
6. Review the rendered page when layout or rich content changed.

The content validator enforces the metadata state machine. It blocks private provenance fields and local paths, rejects raw document artifacts, requires validation dates for published research pages, checks public artifact links, and requires sources for published articles and paper pages.

## Record the result privately

After publication, update the originating vault draft:

```yaml
status: published
garden_path: src/content/docs/projects/<project-slug>/<article-slug>.md
published_url: https://senthilnathan01.github.io/research-garden/projects/<project-slug>/<article-slug>/
published_at: YYYY-MM-DD
```

The link is deliberately one-way. Private notes may point to the public page; the public page must not reveal private notes.
