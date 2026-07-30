# Figure and visual style

How figures, diagrams, and social cards look, so the website and the daily social posts read as one brand. Applies to anyone (human or agent) making a visual for this project.

## Source of truth

- **Palette and type live in `src/styles/custom.css`.** Do not hardcode brand colors in a figure; read the CSS variables. Change the palette in one place and everything follows.
- **This file is the conventions.** The `field-notes` agent skill mirrors the same tokens for off-site export (see below).

## Visual language (everywhere)

- **Flat.** No border-radius, no shadow, no glow, no panel gradients. The site already forces radius and shadow to `0` globally; figures match.
- **Hairlines, not boxes.** Separate things with 1px `--rg-line` rules, like a reference manual.
- **One accent.** Green (`--sl-color-accent`) marks the single most important mark or word. Everything else is ink or muted.
- **Type:** Geist (`--sl-font`) for content; Geist Mono (`--sl-font-mono`) for labels, axes, eyebrows, annotations, in uppercase with wide tracking.
- **Generous whitespace, sentence case, restraint over decoration.** A faint dotted grid is the house texture (see the graph canvas).

## Website figures (`src/content/docs/**`)

Author diagrams as **theme-aware inline SVG** (or a small Astro component) that reads the CSS variables, so they adapt to light and dark automatically:

| Role                    | Use                                        |
| ----------------------- | ------------------------------------------ |
| Marks / emphasis        | `var(--sl-color-accent)`                   |
| Strokes / text          | `var(--rg-text)`                           |
| Hairlines / frames      | `var(--rg-line)`                           |
| Grid dots / faint lines | `var(--rg-line-strong)`                    |
| Labels                  | `var(--rg-muted)` in `var(--sl-font-mono)` |

- **Never hardcode a hex value in a website figure.** A fixed color breaks in the other theme.
- **Accessible:** every figure gets `role="img"` and a `<title>` / `aria-label`.
- **Prefer SVG** for diagrams. There is no Mermaid integration; add one deliberately only if a page truly needs it.
- Keep figure JavaScript tiny or absent. Static SVG is the default (the build rejects any JS file over 250 KB).

## Social cards (the daily X series)

The `field-notes` skill produces standalone **1080×1350 PNG** cards from private vault notes for @arcane_bloom. They use this same visual language, but as a fixed **light-paper export with hardcoded hex** (they leave the site, so CSS variables are not available). The palette is identical: green / paper / Geist / flat / dotted grid.

Keep the two in step: **if the brand palette changes in `custom.css`, update the `field-notes` skill's token block too.** The skill lives in `~/.claude/skills/field-notes/` and `~/.codex/skills/field-notes/`.
