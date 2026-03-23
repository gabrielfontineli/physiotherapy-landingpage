import { client } from "./client"

export type SanityTestimonial = {
  _id: string
  name: string
  time: string
  text: string
}

export type SanityFaq = {
  _id: string
  question: string
  answer: string
}

export async function getTestimonials(): Promise<SanityTestimonial[]> {
  return client.fetch(
    `*[_type == "testimonial"] | order(order asc) { _id, name, time, text }`,
    {},
    { next: { revalidate: 60 } }
  )
}

export async function getFaqs(): Promise<SanityFaq[]> {
  return client.fetch(
    `*[_type == "faq"] | order(order asc) { _id, question, answer }`,
    {},
    { next: { revalidate: 60 } }
  )
}
