import { MapPin, Monitor, BookOpen, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getTranslations } from "next-intl/server"
import { WHATSAPP_URL, HOTMART_URL } from "@/lib/config"

const colorClasses = {
  primary: "bg-primary/10 text-primary border-primary/20",
  accent: "bg-accent/10 text-accent border-accent/40",
  green: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
}

const buttonClasses = {
  primary: "btn-lift bg-primary text-primary-foreground hover:bg-primary/90",
  accent: "btn-glow-accent bg-accent text-accent-foreground hover:bg-accent/90",
  green: "btn-lift bg-emerald-600 text-white hover:bg-emerald-700",
}

export async function ServicesSection() {
  const t = await getTranslations("services")

  const services = [
    {
      id: "presencial",
      icon: MapPin,
      title: t("presencialTitle"),
      subtitle: t("presencialSubtitle"),
      color: "primary" as const,
      bullets: [t("presencialB1"), t("presencialB2"), t("presencialB3")],
      cta: t("presencialCta"),
      href: WHATSAPP_URL,
      external: true,
    },
    {
      id: "online",
      icon: Monitor,
      title: t("onlineTitle"),
      subtitle: t("onlineSubtitle"),
      color: "accent" as const,
      featured: true,
      bullets: [t("onlineB1"), t("onlineB2"), t("onlineB3")],
      cta: t("onlineCta"),
      href: "#triagem",
      external: false,
    },
    {
      id: "ebook",
      icon: BookOpen,
      title: t("ebookTitle"),
      subtitle: t("ebookSubtitle"),
      color: "green" as const,
      bullets: [t("ebookB1"), t("ebookB2"), t("ebookB3")],
      cta: t("ebookCta"),
      href: HOTMART_URL,
      external: true,
    },
  ]

  return (
    <section id="servicos" className="py-16 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold uppercase tracking-widest text-primary">
            {t("tagline")}
          </span>
          <h2 className="mt-4 font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground text-balance">
            {t("title")}
          </h2>
          <p className="mt-4 text-muted-foreground text-pretty">
            {t("subtitle")}
          </p>
        </div>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.id}
                className={`relative flex flex-col rounded-2xl border bg-card p-5 sm:p-6 transition-all hover:shadow-lg ${
                  service.featured
                    ? "border-accent/40 ring-2 ring-accent/20"
                    : "border-border hover:border-primary/30"
                }`}
              >
                {service.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
                      {t("featured")}
                    </span>
                  </div>
                )}

                <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${colorClasses[service.color]}`}>
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="mt-4 text-lg font-bold text-foreground">{service.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{service.subtitle}</p>

                <ul className="mt-4 flex-1 space-y-2">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-foreground/80">
                      <CheckCircle className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`mt-6 w-full font-semibold ${buttonClasses[service.color]}`}
                >
                  <a
                    href={service.href}
                    target={service.external ? "_blank" : undefined}
                    rel={service.external ? "noopener noreferrer" : undefined}
                  >
                    {service.featured && <span className="btn-shine" aria-hidden="true" />}
                    <span className="relative">{service.cta}</span>
                    <ArrowRight className="relative ml-2 h-4 w-4" />
                  </a>
                </Button>

                {service.id === "online" && (
                  <p className="mt-4 text-center text-xs text-muted-foreground">
                    {t("onlineNote")}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
