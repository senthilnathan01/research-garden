import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const GardenBrand: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const current = (fileData.slug ?? "index") as FullSlug

  return (
    <section class={classNames(displayClass, "garden-brand")}>
      <a
        class="garden-brand-eyebrow"
        href="https://senthilnathan01.github.io/"
        target="_blank"
        rel="noreferrer noopener"
      >
        ~/senthil
      </a>
      <div class="garden-brand-copy">
        <h2>Research Garden</h2>
        <p>
          Linked projects, notes, papers, resources, and experiments in one shared Quartz garden.
        </p>
      </div>
      <div class="garden-brand-actions">
        <a href={resolveRelative(current, "projects/index" as FullSlug)}>Projects</a>
        <a href={resolveRelative(current, "templates/index" as FullSlug)}>Templates</a>
        <a href="https://senthilnathan01.github.io/" target="_blank" rel="noreferrer noopener">
          Main Site
        </a>
      </div>
    </section>
  )
}

GardenBrand.css = `
.garden-brand {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.garden-brand-copy h2 {
  margin: 0;
}

.garden-brand-copy p {
  margin: 0.35rem 0 0 0;
}

.garden-brand-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
}
`

export default (() => GardenBrand) satisfies QuartzComponentConstructor
