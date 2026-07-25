import { defineCollection } from "astro:content"
import { z } from "astro/zod"
import { docsLoader } from "@astrojs/starlight/loaders"
import { docsSchema } from "@astrojs/starlight/schema"

const validationDate = z.preprocess(
  (value: unknown) => (value instanceof Date ? value.toISOString().slice(0, 10) : value),
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
)

const researchFields = z.object({
  description: z.string().min(1),
  visibility: z.literal("public"),
  publication_status: z.enum(["draft", "review", "published"]),
  content_type: z.enum(["index", "project", "article", "paper", "note", "resource", "experiment"]),
  validated: validationDate.optional(),
  sources: z.array(z.url()).optional(),
  artifacts: z
    .array(
      z.object({
        label: z.string().min(1),
        href: z.url(),
        kind: z.enum(["brief", "code", "data", "demo", "paper", "results", "other"]).optional(),
      }),
    )
    .optional(),
  tags: z.array(z.string()).optional(),
  cssclasses: z.array(z.string()).optional(),
})

export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({ extend: researchFields }),
  }),
}
