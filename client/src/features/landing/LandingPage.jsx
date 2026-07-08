import HeroSection          from './sections/HeroSection';
import TrustedBySection     from './sections/TrustedBySection';
import QRShowcaseSection    from './sections/QRShowcaseSection';
import BentoFeaturesSection from './sections/BentoFeaturesSection';
import DiscoverySection     from './sections/DiscoverySection';
import ReservationSection   from './sections/ReservationSection';
import StatsSection         from './sections/StatsSection';
import OwnerBenefitsSection from './sections/OwnerBenefitsSection';
import JourneyTimeline      from './sections/JourneyTimeline';
import TestimonialsSection  from './sections/TestimonialsSection';
import PricingSection       from './sections/PricingSection';
import FAQSection           from './sections/FAQSection';
import CTASection           from './sections/CTASection';
import Footer               from './sections/Footer';

// TrustedBySection:  logo cloud — 6-8 partner/restaurant logos scrolling marquee
// DiscoverySection:  live restaurant search with real API call + filtered cards
// ReservationSection: mockup of reservation flow
// OwnerBenefitsSection: 3-column benefits with icons for restaurant owners
// JourneyTimeline:   animated horizontal timeline (steps with GSAP)
// FAQSection:        accordion using Framer Motion for open/close
// CTASection:        full-width gradient CTA — "Open your restaurant on Scan & Dine today"

export default function LandingPage() {
  return (
    <main>
      <HeroSection />
      <TrustedBySection />
      <BentoFeaturesSection />
      <QRShowcaseSection />
      <StatsSection />
      <DiscoverySection />
      <ReservationSection />
      <OwnerBenefitsSection />
      <JourneyTimeline />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
    </main>
  );
}