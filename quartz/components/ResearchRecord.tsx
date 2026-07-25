import { formatDate } from "./Date"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { formatRecordLabel, parseValidationDate } from "../util/researchRecord"
import style from "./styles/researchRecord.scss"

type ResearchArtifact = {
  label: string
  href: string
  kind?: string
}

function getArtifacts(value: unknown): ResearchArtifact[] {
  if (!Array.isArray(value)) return []

  return value.filter(
    (artifact): artifact is ResearchArtifact =>
      typeof artifact === "object" &&
      artifact !== null &&
      typeof artifact.label === "string" &&
      typeof artifact.href === "string",
  )
}

const ResearchRecord: QuartzComponent = ({ cfg, fileData }: QuartzComponentProps) => {
  const frontmatter = fileData.frontmatter
  if (!frontmatter) return null

  const status =
    typeof frontmatter.publication_status === "string" ? frontmatter.publication_status : undefined
  const contentType =
    typeof frontmatter.content_type === "string" ? frontmatter.content_type : undefined
  const validationDate = parseValidationDate(frontmatter.validated)
  const sources = Array.isArray(frontmatter.sources)
    ? frontmatter.sources.filter((source): source is string => typeof source === "string")
    : []
  const artifacts = getArtifacts(frontmatter.artifacts)

  if (
    !status &&
    !contentType &&
    !validationDate &&
    sources.length === 0 &&
    artifacts.length === 0
  ) {
    return null
  }

  return (
    <aside class="research-record" aria-label="Research record">
      <div class="research-record-summary">
        <span class="research-record-title">Research record</span>
        <dl>
          {status && (
            <div>
              <dt>Status</dt>
              <dd class={`status status-${status}`}>{formatRecordLabel(status)}</dd>
            </div>
          )}
          {contentType && (
            <div>
              <dt>Type</dt>
              <dd>{formatRecordLabel(contentType)}</dd>
            </div>
          )}
          {validationDate && (
            <div>
              <dt>Validated</dt>
              <dd>
                <time datetime={frontmatter.validated as string}>
                  {formatDate(validationDate, cfg.locale)}
                </time>
              </dd>
            </div>
          )}
        </dl>
      </div>
      {(artifacts.length > 0 || sources.length > 0) && (
        <nav class="research-record-links" aria-label="Research artifacts and sources">
          {artifacts.map((artifact) => (
            <a href={artifact.href} target="_blank" rel="noreferrer noopener">
              {artifact.label}
            </a>
          ))}
          {sources.length > 0 && (
            <a href="#sources">
              {sources.length} {sources.length === 1 ? "source" : "sources"}
            </a>
          )}
        </nav>
      )}
    </aside>
  )
}

ResearchRecord.css = style

export default (() => ResearchRecord) satisfies QuartzComponentConstructor
