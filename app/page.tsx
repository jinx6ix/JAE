import HeroSection from "@/components/hero-section"
import FeaturesSection from "@/components/features-section"
import ServicesSection from "@/components/services-section"
import TestimonialsSection from "@/components/testimonials-section"
import CtaSection from "@/components/cta-section"
import StatsSection from "@/components/stats-section"
import PartnersSection from "@/components/partners-section"
import BlogPreviewSection from "@/components/blog-preview-section"
import FaqSection from "@/components/faq-section"

// src/App.tsx


export default function Home() {
  return (
    <>
          <HeroSection />
          <StatsSection />
          <ServicesSection />
          <FeaturesSection />
          <PartnersSection />
          <TestimonialsSection />
          <BlogPreviewSection />
          <FaqSection />
          <CtaSection />

    </>
  )
}
