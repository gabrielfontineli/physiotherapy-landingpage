import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { QuiroHeader } from "@/components/quiropraxia/quiro-header"
import { QuiroHero } from "@/components/quiropraxia/quiro-hero"
import { TrustBar } from "@/components/quiropraxia/trust-bar"
import { QuiroBreadcrumb } from "@/components/quiropraxia/quiro-breadcrumb"
import { QuiroAbout } from "@/components/quiropraxia/quiro-about"
import { ConditionsGrid } from "@/components/quiropraxia/conditions-grid"
import { TechniquesSection } from "@/components/quiropraxia/techniques-section"
import { InstitutionalVideo } from "@/components/quiropraxia/institutional-video"
import { ConsultSteps } from "@/components/quiropraxia/consult-steps"
import { QuiroTestimonials } from "@/components/quiropraxia/quiro-testimonials"
import { QuiroGallery } from "@/components/quiropraxia/quiro-gallery"
import { QuiroFaq } from "@/components/quiropraxia/quiro-faq"
import { QuiroFinalCta } from "@/components/quiropraxia/quiro-final-cta"
import { QuiroLocation } from "@/components/quiropraxia/quiro-location"
import { QuiroFooter } from "@/components/quiropraxia/quiro-footer"
import { WhatsAppFab } from "@/components/whatsapp-fab"
import { MainEngagementTracker } from "@/components/main-engagement-tracker"
import "@/components/quiropraxia/quiro.css"

const BASE_URL = "https://doutorguilhermecarvalho.com"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "quiro.metadata" })
  const path = locale === "pt" ? "/quiropraxia" : `/${locale}/quiropraxia`

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${BASE_URL}${path}`,
      languages: {
        "pt-BR": `${BASE_URL}/quiropraxia`,
        en: `${BASE_URL}/en/quiropraxia`,
      },
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `${BASE_URL}${path}`,
      siteName: "Dr. Guilherme Carvalho — Fisioterapeuta",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
      images: [{ url: "/quiropraxia/hero-poster.webp", width: 720, height: 1280 }],
    },
  }
}

export default async function QuiropraxiaPage() {
  const tFaq = await getTranslations("quiro.faq")
  const tBc = await getTranslations("quiro.breadcrumb")

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": ["MedicalBusiness", "LocalBusiness"],
      "@id": `${BASE_URL}/quiropraxia#business`,
      name: "Dr. Guilherme Carvalho — Quiropraxia e Fisioterapia em Natal",
      url: `${BASE_URL}/quiropraxia`,
      description:
        "Quiropraxia, osteopatia, dry needling e terapia manual em Natal/RN. Tratamento para dor lombar, hérnia de disco e nervo ciático.",
      telephone: "+5584981910924",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua João Pessoa, 198 — Sala 406",
        addressLocality: "Natal",
        addressRegion: "Rio Grande do Norte",
        postalCode: "59025-500",
        addressCountry: "BR",
      },
      geo: { "@type": "GeoCoordinates", latitude: -5.7838, longitude: -35.2027 },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "50",
        bestRating: "5",
        worstRating: "1",
      },
      medicalSpecialty: ["Physiotherapy", "Chiropractic", "Osteopathy"],
      hasCredential: "CREFITO 1 318268-F",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
        "@type": "Question",
        name: tFaq(`q${n}`),
        acceptedAnswer: { "@type": "Answer", text: tFaq(`a${n}`) },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: tBc("home"), item: BASE_URL },
        { "@type": "ListItem", position: 2, name: tBc("current"), item: `${BASE_URL}/quiropraxia` },
      ],
    },
  ]

  return (
    <div className="quiro min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <QuiroHeader />
      <main>
        <QuiroHero />
        <InstitutionalVideo />
        <TrustBar />
        <QuiroBreadcrumb />
        <QuiroAbout />
        <ConditionsGrid />
        <TechniquesSection />
        <ConsultSteps />
        <QuiroTestimonials />
        <QuiroGallery />
        <QuiroFaq />
        <QuiroFinalCta />
        <QuiroLocation />
      </main>
      <QuiroFooter />
      <WhatsAppFab />
      <MainEngagementTracker page="quiropraxia" />
    </div>
  )
}
