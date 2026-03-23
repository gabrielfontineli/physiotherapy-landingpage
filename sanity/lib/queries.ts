import { client } from "./client"

const opts = { next: { revalidate: 60 } }

export type SanityTestimonial = { _id: string; name: string; time: string; text: string }
export type SanityFaq = { _id: string; question: string; answer: string }
export type SanityPainPoint = { _id: string; text: string }
export type SanityGuideModule = { _id: string; number: string; title: string; description: string }
export type SanityTrustStat = { _id: string; value: string; label: string; sub: string }
export type SanityForWhoItem = { _id: string; text: string }
export type SanityGuiaConfig = {
  topBarText?: string
  heroTagline?: string
  heroPreHeadline?: string
  heroHeadline?: string
  heroSubtitle?: string
  heroDescription?: string
  heroSocialProof?: string
  pricingOriginal?: string
  pricingInstallments?: string
  pricingFull?: string
  authorName?: string
  authorCredential?: string
  authorBio?: string
  authorSpecializations?: string[]
}

export async function getGuiaConfig(): Promise<SanityGuiaConfig> {
  return client.fetch(`*[_type == "guiaConfig" && _id == "guia-config"][0]`, {}, opts) ?? {}
}

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  return client.fetch(`*[_type == "testimonial"] | order(order asc) { _id, name, time, text }`, {}, opts)
}

export async function getFaqs(): Promise<SanityFaq[]> {
  return client.fetch(`*[_type == "faq"] | order(order asc) { _id, question, answer }`, {}, opts)
}

export async function getPainPoints(): Promise<SanityPainPoint[]> {
  return client.fetch(`*[_type == "painPoint"] | order(order asc) { _id, text }`, {}, opts)
}

export async function getGuideModules(): Promise<SanityGuideModule[]> {
  return client.fetch(`*[_type == "guideModule"] | order(order asc) { _id, number, title, description }`, {}, opts)
}

export async function getTrustStats(): Promise<SanityTrustStat[]> {
  return client.fetch(`*[_type == "trustStat"] | order(order asc) { _id, value, label, sub }`, {}, opts)
}

export async function getForWhoItems(): Promise<SanityForWhoItem[]> {
  return client.fetch(`*[_type == "forWhoItem"] | order(order asc) { _id, text }`, {}, opts)
}
