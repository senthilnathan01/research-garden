# Publication workflow

This repository is public. The full research record stays in a separately configured private knowledge vault.

## What promotion means

Promotion creates a public, self-contained derivative of private research. It does not move or expose the private source notes.

| Private knowledge vault                   | Public research garden                                |
| ----------------------------------------- | ----------------------------------------------------- |
| Raw captures and incomplete reasoning     | Refined narrative                                     |
| Paper PDFs and detailed reading notes     | Canonical external links and concise citations        |
| Private context and provenance            | Public-safe context                                   |
| Open questions and unsupported hypotheses | Qualified claims with evidence                        |
| Obsidian paths and private wikilinks      | Standard Markdown links                               |
| Full re-explanation of every concept      | A short explanation plus a link to the canonical page |

Promotion refines for safety and accuracy. It does not neutralize the author's voice, strip the first person, or hedge every claim into vagueness. A promoted page still reads like a person wrote it.

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

New pages begin as:

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

Give every page the same reading structure:

```markdown
# Title

One or two sentences that state the single main takeaway.

## Context

Why this matters and what the reader needs. Explain a prerequisite concept in a
sentence or two and link to its canonical page instead of re-explaining it.

## <the work>

The body, ordered from simple to hard. Push long derivations, proofs, and
caveats into footnotes or collapsible sections so the main line stays clear.

## Key takeaways

- The one thing to remember.
- Any supporting points.

## Sources
```

## The reader gate

Safety and accuracy are not enough. Every published page also has to be easy to read, understand, and remember. Run this gate at the `review` status, before `published`.

### Who the garden is for

Write for a general reader who is curious but may not share your background. Most readers lean toward machine learning, but assume little prior knowledge. When a page reaches a hard concept, start simple and add difficulty gradually, so a motivated reader can follow it without prior study. Do not re-explain a concept the garden already covers: give it a sentence or two and link to the canonical page.

### Structure every page for reading

- Lead with the answer. State the single main takeaway in the first screen, before setup or history.
- One idea per page. If you cannot name the page's single idea in one sentence, split it.
- Layer the depth. A reader should be able to follow the page from the title, then the summary, then the headings, then the body. Push long derivations, caveats, and asides into footnotes, collapsible sections, or an appendix so the main line stays clear.
- Prefer the concrete. Open with a specific example, number, or case before the general principle.
- Show the reasoning. Readers remember why, not just what. Keep the decision and the evidence behind a claim visible.
- End with what to remember. Close with a short, explicit list of takeaways.

### The reader test

Before promoting `review` to `published`, confirm:

- Stranger: a reader with neither your vault nor your context can still follow the thesis.
- One idea: you can name the page's single idea in one sentence.
- Why: the reasoning behind each material claim is visible, not flattened into a bare conclusion.
- Voice: the page still sounds like a person, not a laundered abstract.
- Memory: after closing the page, one clear sentence stays with you.

### Visuals

Use a diagram when it carries an idea faster than prose. Author diagrams as Mermaid so they stay in version control and render in the static build.

### Freshness

Research goes stale. Keep `validated` current, and treat it as a reader-visible signal of when the claims were last checked. Revisit pages whose `validated` date is old before trusting or promoting them further.

## Review and publish

Before setting `publication_status: published` and `draft: false`:

1. Verify factual claims and citations.
2. Run the reader gate above: the page leads with its takeaway, holds to one idea, links rather than re-explains prerequisites, ends with takeaways, and passes the reader test.
3. Set `validated` to the date the claims and links were last checked, and treat it as the reader-visible freshness signal.
4. Add direct links to public code, data, papers, demos, or results.
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
