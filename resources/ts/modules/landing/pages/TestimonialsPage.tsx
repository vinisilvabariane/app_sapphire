import { LandingLayout } from "../components/LandingLayout";
import { ProofWallSection } from "../components/ProofWallSection";
import { TestimonialsSection } from "../components/TestimonialsSection";

export default function TestimonialsPage() {
    return (
        <LandingLayout>
            <ProofWallSection />
            <TestimonialsSection />
        </LandingLayout>
    );
}
