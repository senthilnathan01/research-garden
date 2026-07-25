import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { sourceUrlForPage } from "../util/sourceUrl"
// @ts-ignore
import script from "./scripts/pageActions.inline"

const PageActions: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title ?? "Research Garden"

  return (
    <div class="page-actions" data-page-title={title}>
      <button type="button" class="copy-page" aria-live="polite">
        <span class="copy-page-label">Copy page</span>
      </button>
      <a href={sourceUrlForPage(fileData.filePath)} target="_blank" rel="noreferrer noopener">
        View source
      </a>
    </div>
  )
}

PageActions.afterDOMLoaded = script
PageActions.css = `
.page-actions {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-top: 0.8rem;
}

.page-actions button,
.page-actions a {
  display: inline-flex;
  min-height: 2rem;
  align-items: center;
  gap: 0.35rem;
  box-sizing: border-box;
  border: 1px solid var(--line);
  border-radius: 7px;
  background: var(--surface);
  padding: 0.34rem 0.55rem;
  color: var(--gray) !important;
  font-family: var(--bodyFont);
  font-size: 0.72rem;
  font-weight: 550;
  cursor: pointer;
}

.page-actions button:hover,
.page-actions a:hover {
  border-color: var(--line-strong);
  background: var(--surface-raised);
  color: var(--dark) !important;
}

.page-actions button.copied {
  border-color: color-mix(in srgb, var(--secondary) 45%, var(--line));
  color: var(--secondary) !important;
}
`

export default (() => PageActions) satisfies QuartzComponentConstructor
