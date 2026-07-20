import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"
import { NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations } from "next-intl/server"
import { routing } from "@/i18n/routing"
import "../globals.css"

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

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

  const title = t("title")
  const description = t("description")
  const url = "https://doutorguilhermecarvalho.com"

  return {
    metadataBase: new URL(url),
    title,
    description,
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/icon-dark-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: "/apple-icon.png",
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Dr. Guilherme Carvalho — Fisioterapeuta",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/dr-guilherme-about-new.png",
          width: 1200,
          height: 630,
          alt: "Dr. Guilherme Carvalho — Fisioterapeuta especialista em coluna em Natal/RN",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/dr-guilherme-about-new.png"],
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
        {/* Preconnect aos hosts de tracking (GTM injeta GA + Facebook). Abre o
            handshake TLS cedo — Lighthouse apontou ~600ms de economia. */}
        {GTM_ID && (
          <>
            <link rel="preconnect" href="https://www.googletagmanager.com" />
            <link rel="preconnect" href="https://connect.facebook.net" crossOrigin="" />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `}
          </Script>
        )}
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0" width="0" style={{ display: "none", visibility: "hidden" }}
              title="gtm"
            />
          </noscript>
        )}
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
