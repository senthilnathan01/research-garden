import type { APIRoute } from "astro"
import { getCollection } from "astro:content"

import { buildLlmsTxt } from "../lib/llms-txt"

export const prerender = true

export const GET: APIRoute = async ({ site }) => {
  if (!site) {
    throw new Error("The canonical site URL is required to generate llms.txt")
  }

  const pages = (
    await getCollection("docs", ({ data }) => data.publication_status === "published")
  ).map(({ id, data }) => ({
    id,
    title: data.title,
    description: data.description,
    contentType: data.content_type,
  }))

  const baseUrl = new URL(import.meta.env.BASE_URL, site)

  return new Response(buildLlmsTxt(pages, baseUrl), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
