import { LandingLayout } from "../components/LandingLayout";
import { PricingHeroSection } from "../components/PricingHeroSection";
import { PricingSection } from "../components/PricingSection";

export default function PricingPage() {
    return (
        <LandingLayout>
            <PricingHeroSection />
            <PricingSection />
        </LandingLayout>
    );
}
