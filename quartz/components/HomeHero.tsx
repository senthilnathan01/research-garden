import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const HomeHero: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const current = (fileData.slug ?? "index") as FullSlug

  return (
    <section class="home-hero">
      <div class="home-hero-kicker">
        <span aria-hidden="true"></span>
        Open research, structured to compound
      </div>
      <h1>
        Build ideas in public.
        <br />
        Keep the trail.
      </h1>
      <p class="home-hero-lede">
        A living workspace for projects, experiments, references, and the decisions that connect
        them.
      </p>
      <div class="home-hero-actions">
        <a
          class="home-primary-action"
          href={resolveRelative(current, "projects/index" as FullSlug)}
        >
          Explore projects <span aria-hidden="true">→</span>
        </a>
        <button class="home-search-action search-proxy" type="button">
          Search the garden <kbd>⌘ K</kbd>
        </button>
      </div>
      <div class="home-hero-grid">
        <a
          class="home-feature home-feature-wide"
          href={resolveRelative(
            current,
            "projects/open-ai-challenge-parameter-golf/index" as FullSlug,
          )}
        >
          <span class="home-feature-label">Active project</span>
          <strong>OpenAI Challenge: Parameter Golf</strong>
          <p>Bets, experiment logs, references, and candidate submissions in one working trail.</p>
          <span class="home-feature-link">Open workspace →</span>
        </a>
        <a class="home-feature" href={resolveRelative(current, "templates/index" as FullSlug)}>
          <span class="home-feature-index">06</span>
          <strong>Reusable templates</strong>
          <p>
            Start a paper note, experiment, resource, or project without rebuilding the structure.
          </p>
          <span class="home-feature-link">Browse templates →</span>
        </a>
        <a class="home-feature" href={resolveRelative(current, "graph" as FullSlug)}>
          <span class="home-feature-index">∞</span>
          <strong>Connected by design</strong>
          <p>Follow backlinks and graph relationships when folders alone are not enough.</p>
          <span class="home-feature-link">Open the graph →</span>
        </a>
      </div>
    </section>
  )
}

HomeHero.css = `
.home-hero {
  padding: 3.3rem 0 1.25rem;
}

.home-hero-kicker {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 1.35rem;
  color: var(--secondary);
  font-family: var(--codeFont);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.home-hero-kicker > span {
  width: 0.48rem;
  height: 0.48rem;
  border-radius: 999px;
  background: var(--secondary);
  box-shadow: 0 0 0 5px color-mix(in srgb, var(--secondary) 13%, transparent);
}

.home-hero h1 {
  max-width: 46rem;
  margin: 0;
  color: var(--dark);
  font-family: var(--titleFont);
  font-size: clamp(2.9rem, 6.5vw, 5.65rem);
  font-weight: 610;
  letter-spacing: -0.065em;
  line-height: 0.96;
}

.home-hero-lede {
  max-width: 38rem;
  margin: 1.4rem 0 0;
  color: var(--gray);
  font-size: clamp(1.05rem, 1.5vw, 1.22rem);
  line-height: 1.65;
}

.home-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-top: 1.7rem;
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
  border-radius: 9px;
  padding: 0.65rem 0.9rem;
  font-family: var(--bodyFont);
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
}

.home-primary-action {
  border-color: var(--secondary);
  background: var(--secondary);
  color: white !important;
  box-shadow: 0 8px 22px color-mix(in srgb, var(--secondary) 20%, transparent);
}

.home-primary-action:hover {
  border-color: color-mix(in srgb, var(--secondary) 84%, black);
  background: color-mix(in srgb, var(--secondary) 90%, black);
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
  border-radius: 5px;
  background: var(--light);
  padding: 0.08rem 0.35rem;
  color: var(--gray);
  font-family: var(--codeFont);
  font-size: 0.64rem;
  box-shadow: 0 1px 0 var(--line);
}

.home-hero-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 3.5rem;
}

.home-feature {
  position: relative;
  display: flex;
  min-height: 12.5rem;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
  padding: 1.25rem;
  color: var(--darkgray) !important;
  transition:
    transform 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease;
}

.home-feature:hover {
  transform: translateY(-2px);
  border-color: var(--line-strong);
  box-shadow: var(--shadow);
}

.home-feature-wide {
  grid-column: 1 / -1;
  min-height: 14.5rem;
  padding: 1.5rem;
  background:
    radial-gradient(circle at 88% 14%, color-mix(in srgb, var(--secondary) 17%, transparent), transparent 35%),
    var(--surface);
}

.home-feature-label {
  width: fit-content;
  border: 1px solid color-mix(in srgb, var(--secondary) 30%, var(--line));
  border-radius: 999px;
  background: color-mix(in srgb, var(--secondary) 8%, var(--surface));
  padding: 0.25rem 0.5rem;
  color: var(--secondary);
  font-family: var(--codeFont);
  font-size: 0.66rem;
  font-weight: 600;
  text-transform: uppercase;
}

.home-feature-index {
  margin-bottom: 1.4rem;
  color: var(--secondary);
  font-family: var(--codeFont);
  font-size: 0.8rem;
}

.home-feature strong {
  max-width: 30rem;
  color: var(--dark);
  font-family: var(--headerFont);
  font-size: 1.08rem;
  letter-spacing: -0.02em;
}

.home-feature-wide strong {
  margin-top: 2.4rem;
  font-size: clamp(1.35rem, 2.5vw, 1.8rem);
}

.home-feature p {
  max-width: 35rem;
  margin: 0.55rem 0 1.25rem;
  color: var(--gray);
  font-size: 0.86rem;
  line-height: 1.55;
}

.home-feature-link {
  margin-top: auto;
  color: var(--secondary);
  font-size: 0.78rem;
  font-weight: 600;
}

@media (max-width: 800px) {
  .home-hero {
    padding-top: 2.35rem;
  }

  .home-hero h1 {
    font-size: clamp(2.65rem, 13vw, 4.5rem);
  }

  .home-hero-grid {
    grid-template-columns: 1fr;
    margin-top: 2.5rem;
  }

  .home-feature-wide {
    grid-column: auto;
  }
}
`

export default (() => HomeHero) satisfies QuartzComponentConstructor
