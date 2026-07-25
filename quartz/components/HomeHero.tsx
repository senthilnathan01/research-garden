import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const HomeHero: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const current = (fileData.slug ?? "index") as FullSlug

  return (
    <div class="home-intro">
      <section class="home-hero">
        <div class="home-hero-copy">
          <h1>The messy work stays.</h1>
          <p>Projects, experiments, and references, kept beside the decisions that shaped them.</p>
          <div class="home-hero-actions">
            <a
              class="home-primary-action"
              href={resolveRelative(current, "projects/index" as FullSlug)}
            >
              Browse projects
            </a>
            <button class="home-search-action search-proxy" type="button">
              Search the garden <kbd>⌘ K</kbd>
            </button>
          </div>
        </div>
        <picture class="home-hero-visual">
          <source media="(max-width: 800px)" srcset="./static/research-workbench-900.webp" />
          <img
            src="./static/research-workbench.webp"
            alt="An open research notebook, experiment plots, and a laptop on a working desk"
            width="1440"
            height="900"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
        </picture>
      </section>

      <nav class="home-entry-points" aria-label="Research garden highlights">
        <a
          class="home-current-project"
          href={resolveRelative(
            current,
            "projects/open-ai-challenge-parameter-golf/index" as FullSlug,
          )}
        >
          <span>
            <small>Current project</small>
            <strong>OpenAI Challenge: Parameter Golf</strong>
          </span>
          <p>
            Track bets, experiments, references, and submissions for the parameter golf challenge.
          </p>
          <b>View project</b>
        </a>
        <div class="home-reference-links">
          <a href={resolveRelative(current, "templates/index" as FullSlug)}>
            <strong>Templates</strong>
            <p>Start with a useful structure, then change it to fit the work.</p>
            <span>Browse templates</span>
          </a>
          <a href={resolveRelative(current, "graph" as FullSlug)}>
            <strong>Graph</strong>
            <p>See which notes connect and where an idea shows up again.</p>
            <span>Open graph</span>
          </a>
        </div>
      </nav>
    </div>
  )
}

HomeHero.css = `
.home-intro {
  padding: clamp(2.4rem, 5vw, 4.6rem) 0 1rem;
}

.home-hero {
  display: grid;
  grid-template-columns: minmax(0, 0.86fr) minmax(22rem, 1.14fr);
  align-items: center;
  gap: clamp(2rem, 5vw, 4.5rem);
}

.home-hero-copy h1 {
  max-width: 9ch;
  margin: 0;
  color: var(--dark);
  font-family: var(--titleFont);
  font-size: clamp(3.15rem, 5vw, 4.75rem);
  font-weight: 630;
  letter-spacing: -0.065em;
  line-height: 0.98;
}

.home-hero-copy > p {
  max-width: 30rem;
  margin: 1.3rem 0 0;
  color: var(--gray);
  font-size: clamp(1rem, 1.5vw, 1.12rem);
  line-height: 1.6;
}

.home-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.65rem;
}

.home-primary-action,
.home-search-action {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  box-sizing: border-box;
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 0.65rem 0.9rem;
  font-family: var(--bodyFont);
  font-size: 0.82rem;
  font-weight: 620;
  white-space: nowrap;
  cursor: pointer;
  transition:
    transform 160ms cubic-bezier(0.16, 1, 0.3, 1),
    border-color 160ms ease,
    background-color 160ms ease;
}

.home-primary-action {
  border-color: var(--secondary);
  background: var(--secondary);
  color: #f7fffb !important;
}

.home-primary-action:hover {
  border-color: var(--tertiary);
  background: var(--tertiary);
}

.home-primary-action:active,
.home-search-action:active {
  transform: translateY(1px);
}

.home-search-action {
  background: var(--surface);
  color: var(--darkgray);
}

.home-search-action:hover {
  border-color: var(--line-strong);
  background: var(--surface-raised);
  color: var(--dark);
}

.home-search-action kbd {
  border: 1px solid var(--line);
  border-radius: 4px;
  background: var(--light);
  padding: 0.08rem 0.35rem;
  color: var(--gray);
  font-family: var(--codeFont);
  font-size: 0.62rem;
  box-shadow: 0 1px 0 var(--line);
}

.home-hero-visual {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 8 / 5;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface-raised);
}

.home-hero-visual::after {
  content: "";
  position: absolute;
  inset: 0;
  border: 1px solid color-mix(in srgb, var(--light) 55%, transparent);
  border-radius: inherit;
  pointer-events: none;
}

.home-hero-visual img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

:root[saved-theme="dark"] .home-hero-visual img {
  filter: brightness(0.82) saturate(0.88);
}

.home-entry-points {
  margin-top: clamp(2.5rem, 5vw, 4.25rem);
  border-top: 1px solid var(--line);
}

.home-current-project {
  display: grid;
  grid-template-columns: minmax(14rem, 1.1fr) minmax(16rem, 1fr) auto;
  align-items: center;
  gap: 1.5rem;
  border-bottom: 1px solid var(--line);
  padding: 1.3rem 0;
  color: var(--darkgray) !important;
}

.home-current-project > span {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.home-current-project small {
  color: var(--secondary);
  font-family: var(--codeFont);
  font-size: 0.66rem;
  font-weight: 600;
}

.home-current-project strong,
.home-reference-links strong {
  color: var(--dark);
  font-family: var(--headerFont);
  letter-spacing: -0.02em;
}

.home-current-project p,
.home-reference-links p {
  margin: 0;
  color: var(--gray);
  font-size: 0.8rem;
  font-weight: 450;
  line-height: 1.5;
}

.home-current-project b,
.home-reference-links span {
  color: var(--secondary);
  font-size: 0.75rem;
  font-weight: 620;
  white-space: nowrap;
}

.home-current-project:hover strong,
.home-reference-links a:hover strong {
  color: var(--secondary);
}

.home-reference-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-bottom: 1px solid var(--line);
}

.home-reference-links a {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 0.5rem;
  min-height: 8.75rem;
  box-sizing: border-box;
  padding: 1.25rem 0;
  color: var(--darkgray) !important;
}

.home-reference-links a + a {
  border-left: 1px solid var(--line);
  padding-left: 1.5rem;
}

.home-reference-links a:first-child {
  padding-right: 1.5rem;
}

@media (prefers-reduced-motion: no-preference) {
  .home-hero-copy {
    animation: home-enter 520ms cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  .home-hero-visual {
    animation: home-enter 600ms 80ms cubic-bezier(0.16, 1, 0.3, 1) both;
  }
}

@keyframes home-enter {
  from {
    opacity: 0;
    transform: translateY(14px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 800px) {
  .home-intro {
    padding-top: 2.1rem;
  }

  .home-hero {
    grid-template-columns: 1fr;
    gap: 1.8rem;
  }

  .home-hero-copy h1 {
    max-width: 10ch;
    font-size: clamp(2.75rem, 13vw, 4rem);
  }

  .home-hero-visual {
    aspect-ratio: 8 / 5;
  }

  .home-current-project {
    grid-template-columns: 1fr;
    gap: 0.65rem;
  }

  .home-reference-links {
    grid-template-columns: 1fr;
  }

  .home-reference-links a + a {
    border-top: 1px solid var(--line);
    border-left: 0;
    padding-left: 0;
  }

  .home-reference-links a:first-child {
    padding-right: 0;
  }
}
`

export default (() => HomeHero) satisfies QuartzComponentConstructor
