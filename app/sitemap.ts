import type { MetadataRoute } from "next"

const BASE_URL = "https://doutorguilhermecarvalho.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/guia", "/quiropraxia"]

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.9,
    alternates: {
      languages: {
        "pt-BR": `${BASE_URL}${route}`,
        en: `${BASE_URL}/en${route}`,
      },
    },
  }))
}
