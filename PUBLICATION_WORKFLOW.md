# Publication Workflow

This repository contains public output. The full research record remains in a separately configured private knowledge vault.

## Promotion contract

Promotion means writing a public, self-contained derivative of private research. It does not mean moving, synchronizing, or exposing the private source notes.

| Private knowledge vault                   | Public research garden                         |
| ----------------------------------------- | ---------------------------------------------- |
| Raw captures and incomplete reasoning     | Refined narrative                              |
| Paper PDFs and detailed reading notes     | Canonical external links and concise citations |
| Private context and provenance            | Public-safe context                            |
| Open questions and unsupported hypotheses | Qualified claims with evidence                 |
| Obsidian paths and private wikilinks      | Working public Quartz links                    |

## Prepare in the vault

A private publication draft is ready for promotion only when:

- its status is `ready-to-publish`;
- material claims are connected to evidence locations;
- bibliographic metadata and canonical external URLs are resolved;
- uncertainty and contradictory evidence are represented;
- its privacy checklist is complete.

## Create the public page

Create or update:

```text
content/projects/<project-slug>/<article-slug>.md
```

Start from `content/templates/article-template.md`. New pages begin as:

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

The public page must not contain private vault paths or note names. Keep provenance in the vault and expose only public evidence here.

## Review and publish

Before changing the page to `publication_status: published` and `draft: false`:

1. Verify factual claims and citations.
2. Set `validated` to the date the claims and links were last checked.
3. Add direct public artifact links for code, data, papers, demos, or results when they exist.
4. Complete the editorial and privacy checklist in the article template.
5. Run `npm run validate:content`.
6. Run `npm run check`.
7. Run `npm test`.
8. Run `npm run build`.
9. Review the rendered page locally when layout or rich content changed.

`npm run validate:content` enforces the metadata state machine, blocks private provenance fields and local paths, rejects raw document artifacts under `content/`, requires validation dates for published research pages, validates public artifact links, and requires sources for published articles and paper pages.

## Record the public result privately

After publication, update the originating vault draft with:

```yaml
status: published
garden_path: content/projects/<project-slug>/<article-slug>.md
published_url: https://senthilnathan01.github.io/research-garden/projects/<project-slug>/<article-slug>
published_at: YYYY-MM-DD
```

The backlink is deliberately one-way: private notes may link to the public page; the public page must not reveal private notes.
