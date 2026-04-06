import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SymptomsSection } from "@/components/symptoms-section"
import { ServicesSection } from "@/components/services-section"
import { MethodSection } from "@/components/method-section"
import { AboutSection } from "@/components/about-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { TriageFormSection } from "@/components/triage-form-section"
import { LocationSection } from "@/components/location-section"
import { FinalCtaSection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"
import { WhatsAppFab } from "@/components/whatsapp-fab"
import { MainEngagementTracker } from "@/components/main-engagement-tracker"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SymptomsSection />
        <ServicesSection />
        <MethodSection />
        <AboutSection />
        <TestimonialsSection />
        <TriageFormSection />
        <LocationSection />
        <FinalCtaSection />
      </main>
      <Footer />
      <WhatsAppFab />
      <MainEngagementTracker />
    </>
  )
}
