# Working agreements

This repository is a public Astro and Starlight research garden. Everything under `src/content/docs/` must be safe for public distribution.

## Before editing

- Read `README.md`, `PUBLICATION_WORKFLOW.md`, and the relevant file under `src/content/docs/templates/`.
- Search for an existing project or page before creating a duplicate.
- Treat the private knowledge vault as source material, never as publishable content.
- Preserve standard Markdown readability and existing public routes.

## Content routing

- Project pages go in `src/content/docs/projects/<project-slug>/`.
- Reusable public templates go in `src/content/docs/templates/`.
- New projects must be linked from `src/content/docs/projects/index.md`.
- Raw captures, private reasoning, downloaded PDFs, and incomplete source notes stay in the private vault.

## Required publication metadata

Every Markdown file under `src/content/docs/` must include:

```yaml
visibility: public
publication_status: draft | review | published
draft: true | false
content_type: index | project | article | paper | note | resource | experiment | template
```

- Draft and review pages use `draft: true`.
- Published pages use `draft: false`.
- Published articles and paper pages include a non-empty `sources` list of canonical external URLs and a reader-visible `## Sources` section.
- Never add private provenance fields such as `source_notes`, `vault_path`, `private_notes`, or `pdf_path`.

## Publication gate

Before publishing a page:

1. Verify material factual claims against cited sources.
2. Prefer primary sources and canonical URLs.
3. Distinguish sourced claims from interpretation.
4. Keep meaningful limitations, uncertainty, and contradictory evidence.
5. Remove private commentary, personal information, credentials, local paths, and internal-only text.
6. Do not copy raw PDFs, copyrighted full text, or private Obsidian links into the garden.
7. Make the page self-contained for readers who cannot access the private vault.
8. Run `npm run verify`.
9. Record the garden path and public URL in the private vault without exposing that private path here.

## Editing and validation

- Preserve working links and stable kebab-case filenames.
- Do not add dependencies for content-only work.
- Keep custom browser JavaScript small and limited to behavior that needs it.
- Clearly distinguish syntax checks, local validation, and full verification.
- Commit only when the user requests it. If the active task asks for incremental commits, use one commit per coherent, green checkpoint.
- Do not push or deploy without an explicit request.

## Handoff

After changes, summarize:

- files created or updated and why;
- validation that actually ran;
- remaining risks;
- the exact next validation step.
