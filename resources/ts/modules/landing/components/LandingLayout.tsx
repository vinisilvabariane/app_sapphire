import type { ReactNode } from "react";
import { LandingFooter } from "./LandingFooter";
import { LandingHeader } from "./LandingHeader";
import { useLandingEffects } from "./useLandingEffects";

type LandingLayoutProps = {
    children: ReactNode;
};

export function LandingLayout({ children }: LandingLayoutProps) {
    useLandingEffects();

    return (
        <div data-landing-page className="min-h-screen overflow-x-clip bg-background pt-16 text-foreground">
            <LandingHeader />
            {children}
            <LandingFooter />
        </div>
    );
}
