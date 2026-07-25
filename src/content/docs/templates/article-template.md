---
title: Public Article Template
description: Publication-gated template for a sourced public research article.
visibility: public
publication_status: published
draft: false
content_type: template
tags:
  - templates
  - article
---

```md
---
title: [Article Title]
description: [One-sentence promise to the reader.]
visibility: public
publication_status: draft
draft: true
content_type: article
validated: YYYY-MM-DD
sources: []
artifacts:
  - label: "Descriptive artifact name"
    href: https://example.com/
    kind: code
tags:
  - article
---

[Open with the question, tension, or result. Make the article self-contained.]

## Bottom line

[State the conclusion and calibrate its certainty.]

## What the evidence shows

[Build the argument from verified evidence. Cite material factual claims.]

## Interpretation

[Explain what follows from the evidence and label inference clearly.]

## Limitations

- [Meaningful uncertainty, disagreement, or generalization limit]

## Implications

[Explain why the result matters and what a reader should do with it.]

## Sources

- [Canonical external URL]
```

## Editorial and privacy gate

Before changing the copied page to `publication_status: published` and `draft: false`:

- [ ] Every material factual claim is supported.
- [ ] Primary sources and canonical URLs are used where available.
- [ ] Source claims and interpretation are distinguishable.
- [ ] Limitations and contradictory evidence are represented.
- [ ] Quotations are short, accurate, and properly attributed.
- [ ] Private commentary, personal data, credentials, and local paths are absent.
- [ ] The page contains no raw PDFs, copyrighted full text, or private vault links.
- [ ] The article works for a reader without access to the private vault.
- [ ] `sources` contains every canonical external source URL used.
- [ ] `validated` records the date the published claims and links were last checked.
- [ ] `artifacts` links directly to public code, data, demos, papers, or results where relevant.
- [ ] `npm run validate:content`, `npm run check`, `npm test`, and `npm run build` pass.
