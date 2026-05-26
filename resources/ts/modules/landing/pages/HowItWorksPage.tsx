import { FeatureCommandSection } from "../components/FeatureCommandSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { HowItWorksSection } from "../components/HowItWorksSection";
import { LandingLayout } from "../components/LandingLayout";
import { ProcessJourneySection } from "../components/ProcessJourneySection";

export default function HowItWorksPage() {
    return (
        <LandingLayout>
            <ProcessJourneySection />
            <FeatureCommandSection />
            <FeaturesSection />
            <HowItWorksSection />
        </LandingLayout>
    );
}
