import { FullSlug, pathToRoot, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const SiteHeader: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const current = (fileData.slug ?? "index") as FullSlug
  const root = pathToRoot(current)

  return (
    <div class="site-header">
      <a class="site-header-brand" href={root}>
        <span>
          <strong>Research Garden</strong>
          <small>Senthilnathan</small>
        </span>
      </a>
      <nav class="site-header-nav" aria-label="Primary navigation">
        <a href={resolveRelative(current, "projects/index" as FullSlug)}>Projects</a>
        <a href={resolveRelative(current, "templates/index" as FullSlug)}>Templates</a>
        <a href={resolveRelative(current, "graph" as FullSlug)}>Graph</a>
      </nav>
      <a
        class="site-header-external"
        href="https://senthilnathan01.github.io/"
        target="_blank"
        rel="noreferrer noopener"
      >
        Main site
      </a>
    </div>
  )
}

SiteHeader.css = `
.site-header {
  display: contents;
}

.site-header-brand {
  display: flex;
  align-items: center;
  min-width: 14.5rem;
  color: var(--dark) !important;
  text-decoration: none;
}

.site-header-brand > span {
  display: flex;
  flex-direction: column;
  gap: 0.04rem;
}

.site-header-brand strong {
  font-family: var(--headerFont);
  font-size: 0.9rem;
  font-weight: 650;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.site-header-brand small {
  color: var(--gray);
  font-family: var(--codeFont);
  font-size: 0.62rem;
  letter-spacing: 0.04em;
}

.site-header-nav {
  display: flex;
  align-items: center;
  gap: 0.15rem;
}

.site-header-nav a,
.site-header-external {
  border-radius: 7px;
  padding: 0.45rem 0.65rem;
  color: var(--darkgray) !important;
  font-size: 0.79rem;
  font-weight: 550;
}

.site-header-nav a:hover,
.site-header-external:hover {
  background: var(--surface-raised);
  color: var(--dark) !important;
}

.site-header-external {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-left: auto;
  white-space: nowrap;
}

@media (max-width: 800px) {
  .site-header-brand {
    min-width: 0;
  }

  .site-header-brand small,
  .site-header-nav,
  .site-header-external {
    display: none;
  }
}
`

export default (() => SiteHeader) satisfies QuartzComponentConstructor
