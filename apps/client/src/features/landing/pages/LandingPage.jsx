import { useState } from "react";
import PageTransition from "../../../shared/transitions/PageTransition";
import { AppPreloader } from "../../../shared/feedback/AppPreloader/AppPreloader";
import HeroSection from "../components/HeroSection/HeroSection";
import TrustedBySection from "../components/TrustedSection/TrustedBySection";
import ParallaxShowcase from "../components/ProblemSolution/ParallaxShowcase";
import FeaturesSection from "../components/FeaturesBento/FeaturesSection";
import HowItWorksSection from "../components/HowItWorks/HowItWorksSection";
import ShowRestaurants from "@/features/discovery-restaurant/pages/ShowRestaurant";
import AnalyticsSection from "../components/Analytics/AnalyticsSection";
import TestimonialsSection from "../components/Testimonials/TestimonialsSection";
import PricingSection from "../components/Pricing/PricingSection";
import NewsletterSection from "../components/NewsLetter/NewsletterSection";
import CTASection from "../components/CTA/CTASection";
import FAQSection from "../components/FAQ/FAQSection";

export default function LandingPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-surface flex flex-col pt-0 text-gray-500">
      <AppPreloader onComplete={() => setLoaded(true)} />
      {loaded && (
        <PageTransition>
          <main>
            <HeroSection />
            <TrustedBySection />
            <ParallaxShowcase />
            <FeaturesSection />
            <HowItWorksSection />
            {/* <ShowRestaurants /> */}
            <AnalyticsSection />
            <TestimonialsSection />
            <PricingSection />
            <CTASection />
            <FAQSection />
            <NewsletterSection />
          </main>
        </PageTransition>
      )}
    </div>
  );
}
