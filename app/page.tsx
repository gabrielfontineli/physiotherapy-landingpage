import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SymptomsSection } from "@/components/symptoms-section"
import { ConditionsSection } from "@/components/conditions-section"
import { ExpectSection } from "@/components/expect-section"
import { AboutSection } from "@/components/about-section"
import { TreatmentsSection } from "@/components/treatments-section"
import { LocationSection } from "@/components/location-section"
import { Footer } from "@/components/footer"
import { WhatsAppFab } from "@/components/whatsapp-fab"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <SymptomsSection />
        <ConditionsSection />
        <ExpectSection />
        <AboutSection />
        <TreatmentsSection />
        <LocationSection />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
