import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"
import "../globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "metadata" })

  return {
    title: t("title"),
    description: t("description"),
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon-dark-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: "/apple-icon.png",
    },
  }
}

export const viewport: Viewport = {
  themeColor: "#1a2e5a",
  width: "device-width",
  initialScale: 1,
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["MedicalBusiness", "LocalBusiness"],
  name: "Dr. Guilherme Carvalho — Fisioterapeuta",
  description:
    "Fisioterapeuta especialista em coluna, quiropraxia, osteopatia e acupuntura em Natal, RN. Tratamento individualizado para hérnia de disco, ciático e dor lombar.",
  telephone: "+5584981910924",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua João Pessoa, 198 — Sala 406",
    addressLocality: "Natal",
    addressRegion: "Rio Grande do Norte",
    addressCountry: "BR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "50",
    bestRating: "5",
    worstRating: "1",
  },
  medicalSpecialty: ["Physiotherapy", "Osteopathy", "Chiropractic", "Acupuncture"],
  hasCredential: "CREFITO 1 318268-F",
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
