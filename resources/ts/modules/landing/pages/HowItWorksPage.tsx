import { HowItWorksSection } from "../components/HowItWorksSection";
import { LandingLayout } from "../components/LandingLayout";
import { ProcessJourneySection } from "../components/ProcessJourneySection";

export default function HowItWorksPage() {
    return (
        <LandingLayout>
            <ProcessJourneySection />
            <HowItWorksSection />
        </LandingLayout>
    );
}
