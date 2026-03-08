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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* 1. HERO - Capturar atenção e gerar clique */}
        <HeroSection />
        
        {/* 2. SINTOMAS - O visitante se identifica */}
        <SymptomsSection />
        
        {/* 3. SERVIÇOS - Presencial / Teleatendimento / E-book */}
        <ServicesSection />
        
        {/* 4. MÉTODO - Como funciona o tratamento */}
        <MethodSection />
        
        {/* 5. SOBRE - Autoridade e confiança */}
        <AboutSection />
        
        {/* 6. DEPOIMENTOS - Prova social */}
        <TestimonialsSection />
        
        {/* Formulário de Pré-triagem (integrado) */}
        <TriageFormSection />
        
        {/* 7. LOCALIZAÇÃO */}
        <LocationSection />
        
        {/* 8. CTA FINAL - Última chamada para ação */}
        <FinalCtaSection />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
