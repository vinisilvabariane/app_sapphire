import { CtaSection } from "../components/CtaSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { HeroSection } from "../components/HeroSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { LandingFooter } from "../components/LandingFooter";
import { LandingHeader } from "../components/LandingHeader";
import { PricingSection } from "../components/PricingSection";
import { ShowcaseSection } from "../components/ShowcaseSection";
import { TestimonialsSection } from "../components/TestimonialsSection";
import { UseCasesMarquee } from "../components/UseCasesMarquee";
import { useLandingEffects } from "../components/useLandingEffects";

export default function LandingPage() {
    useLandingEffects();

    return (
        <div data-landing-page className="min-h-screen overflow-x-hidden bg-background text-foreground">
            <LandingHeader />
            <HeroSection />
            <UseCasesMarquee />
            <ShowcaseSection />
            <FeaturesSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <PricingSection />
            <CtaSection />
            <LandingFooter />
        </div>
    );
}
