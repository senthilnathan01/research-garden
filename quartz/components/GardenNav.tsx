import { FullSlug, pathToRoot, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

type NavItem = {
  label: string
  slug?: FullSlug
  href?: string
  match: (current: string) => boolean
}

type NavGroup = {
  label: string
  items: NavItem[]
}

const groups: NavGroup[] = [
  {
    label: "Garden",
    items: [
      { label: "Home", match: (s) => s === "index" || s === "" },
      {
        label: "Projects",
        slug: "projects/index" as FullSlug,
        match: (s) => s === "projects" || s.startsWith("projects/"),
      },
      {
        label: "Templates",
        slug: "templates/index" as FullSlug,
        match: (s) => s === "templates" || s.startsWith("templates/"),
      },
      {
        label: "Graph",
        slug: "graph" as FullSlug,
        match: (s) => s === "graph",
      },
    ],
  },
  {
    label: "External",
    items: [
      {
        label: "Main Site",
        href: "https://senthilnathan01.github.io/",
        match: () => false,
      },
    ],
  },
]

const GardenNav: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const current = (fileData.slug ?? "index") as FullSlug
  const root = pathToRoot(current)

  return (
    <nav class={classNames(displayClass, "garden-nav")} aria-label="Garden navigation">
      {groups.map((group) => (
        <div class="garden-nav-group">
          <div class="garden-nav-label">{group.label}</div>
          <ul class="garden-nav-list">
            {group.items.map((item) => {
              const href = item.href ?? (item.slug ? resolveRelative(current, item.slug) : root)
              const active = item.match(current)
              return (
                <li>
                  <a
                    href={href}
                    class={active ? "active" : undefined}
                    target={item.href ? "_blank" : undefined}
                    rel={item.href ? "noreferrer noopener" : undefined}
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

GardenNav.css = `
.garden-nav {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.garden-nav-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.garden-nav-label {
  font-family: var(--codeFont);
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gray);
}

.garden-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.garden-nav-list a {
  display: flex;
  align-items: center;
  min-height: 2rem;
  padding: 0 0.2rem;
  border-bottom: 1px solid transparent;
  color: var(--darkgray);
  font-family: var(--bodyFont);
  font-size: 0.92rem;
  font-weight: 500;
  background: transparent;
}

.garden-nav-list a:hover {
  color: var(--dark);
  border-color: var(--lightgray);
}

.garden-nav-list a.active {
  color: var(--dark);
  border-color: var(--secondary);
}
`

export default (() => GardenNav) satisfies QuartzComponentConstructor
