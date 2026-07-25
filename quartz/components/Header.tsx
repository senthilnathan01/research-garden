import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Header: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return children.length > 0 ? <header>{children}</header> : null
}

Header.css = `
header {
  position: sticky;
  z-index: 100;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.85rem;
  width: 100%;
  height: 3.75rem;
  box-sizing: border-box;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--light) 91%, transparent);
  padding: 0 1.4rem;
  backdrop-filter: blur(16px);
}

header h1 {
  margin: 0;
  flex: auto;
}

header > .search {
  width: min(20rem, 24vw);
  max-width: none;
  margin-left: auto;
}

header > .darkmode {
  flex: 0 0 auto;
}

@media (max-width: 800px) {
  header {
    height: 3.5rem;
    padding: 0 0.8rem;
  }

  header > .search {
    width: auto;
    margin-left: auto;
  }

  header > .search .search-button {
    width: 2.25rem;
    padding: 0;
  }

  header > .search .search-button p,
  header > .search .search-button kbd {
    display: none;
  }
}
`

export default (() => Header) satisfies QuartzComponentConstructor
