import { CommercialIntro } from "../components/CommercialIntro";
import { CtaSection } from "../components/CtaSection";
import { LandingLayout } from "../components/LandingLayout";
import { PinnedStorySection } from "../components/PinnedStorySection";
import { ShowcaseSection } from "../components/ShowcaseSection";
import { UseCasesMarquee } from "../components/UseCasesMarquee";
import { pinnedStories } from "../data/landingData";

export default function LandingPage() {
    return (
        <LandingLayout>
            <CommercialIntro
                eyebrow="Sapphire OS"
                title="Opera\u00E7\u00E3o clara."
                accent="Time em movimento."
                description="Uma plataforma comercial para organizar chamados, dashboards e projetos com a velocidade que times modernos esperam."
            />
            <UseCasesMarquee />
            <PinnedStorySection
                eyebrow="O sistema"
                title="O scroll prende. A opera\u00E7\u00E3o aparece."
                description="A narrativa mostra como o Sapphire sai da promessa e chega no fluxo real de trabalho."
                items={pinnedStories.home}
            />
            <ShowcaseSection />
            <CtaSection />
        </LandingLayout>
    );
}
