---
title: Research Garden
description: Notes, experiments, references, and project logs from Senthilnathan's research work.
visibility: public
publication_status: published
draft: false
content_type: index
cssclasses:
  - home-page
tags:
  - garden
  - index
---

## Keep the context next to the work

Finished results are easy to save. The reasoning gets lost first. This garden keeps project notes, experiment logs, references, and submissions together, so I can still see why a decision made sense at the time.

### One folder per project

Every project starts with one landing page and a few working areas. Notes stay close to the decisions they support. I can return months later without rebuilding the whole story from memory.

### Find things three ways

- **Search** finds an idea when I cannot remember its folder.
- **Backlinks** show where a note is already being used.
- The **graph** is useful when relationships matter more than folders.
- **Templates** save setup time, but each project can change the structure.

## Folder layout

```text
src/content/docs/
  projects/
    <project-slug>/
      index.md
      bets/index.md
      log/index.md
      references/index.md
      submissions/index.md
      templates/
  templates/
```

The [parameter golf workspace](./projects/open-ai-challenge-parameter-golf/) is the working example. It is still small, which is useful: the structure exists, but there is no filler.
