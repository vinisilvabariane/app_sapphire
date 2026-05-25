import { FeatureCommandSection } from "../components/FeatureCommandSection";
import { FeaturesSection } from "../components/FeaturesSection";
import { LandingLayout } from "../components/LandingLayout";

export default function FeaturesPage() {
    return (
        <LandingLayout>
            <FeatureCommandSection />
            <FeaturesSection />
        </LandingLayout>
    );
}
