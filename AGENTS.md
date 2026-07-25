# AGENTS.md

This repository is a public Quartz research garden. Everything under `content/` must be safe for public distribution.

## Before editing

- Read `README.md`, `PUBLICATION_WORKFLOW.md`, and the relevant file under `content/templates/`.
- Search for an existing project or page before creating a duplicate.
- Treat the configured private knowledge-vault folder as source material, never as publishable content.
- Preserve the existing Quartz structure and Markdown readability.

## Content routing

- Project pages -> `content/projects/<project-slug>/`
- Reusable public templates -> `content/templates/`
- New projects must be linked from `content/projects/index.md`.
- Keep raw captures, private reasoning, downloaded PDFs, and incomplete source notes in the knowledge vault.

## Required publication metadata

Every Markdown file under `content/` must include:

```yaml
visibility: public
publication_status: draft | review | published
draft: true | false
content_type: index | project | article | paper | note | resource | experiment | template
```

- `draft` and `review` pages must use `draft: true`.
- `published` pages must use `draft: false`.
- Published `article` and `paper` pages must include a non-empty `sources` list of canonical external URLs and a reader-visible `## Sources` section.
- Never add private provenance fields such as `source_notes`, `vault_path`, `private_notes`, or `pdf_path` to public frontmatter.

## Publication gate

Before changing a page to `publication_status: published`:

1. Verify every material factual claim against a cited source.
2. Prefer primary sources and canonical URLs.
3. Distinguish source claims from interpretation or inference.
4. Represent meaningful limitations, uncertainty, and contradictory evidence.
5. Remove private commentary, personal information, credentials, local filesystem paths, and internal-only text.
6. Do not copy raw PDFs, copyrighted full text, or private Obsidian links into the garden.
7. Make the page self-contained for readers who cannot access the knowledge vault.
8. Run:
   - `npm run validate:content`
   - `npm run check`
   - `npm test`
   - `npm run build`
9. After publication, update the originating private vault draft with the garden path and public URL. Never expose that private path in the garden.

## Editing and validation

- Do not rewrite unrelated sections or modify the Quartz engine for content-only work.
- Preserve working internal links and use stable kebab-case filenames.
- Do not add dependencies for content work.
- Clearly distinguish implemented, syntax-checked, locally validated, and fully verified work.
- Do not commit, push, or deploy unless the user explicitly requests it.

## Output

After changes, summarize:

- files created;
- files updated;
- why each changed;
- validation actually run and its result;
- remaining risks and the exact next validation step.
