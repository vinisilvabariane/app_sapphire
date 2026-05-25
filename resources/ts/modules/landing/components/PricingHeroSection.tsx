import { Link } from "@inertiajs/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { plans } from "../data/landingData";
import { primaryGradient } from "./landingStyles";

export function PricingHeroSection() {
    const highlightedPlan = plans.find((plan) => plan.highlighted) ?? plans[1];

    return (
        <section className="landing-section bg-muted/20 px-6 py-14 lg:py-20">
            <div className="mx-auto grid max-w-screen-xl gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
                <div data-landing-reveal className="space-y-7">
                    <span className="text-xs font-black uppercase tracking-[0.24em] text-primary">Planos</span>
                    <h1 className="max-w-4xl text-5xl font-black uppercase leading-[0.95] tracking-normal sm:text-6xl xl:text-7xl">
                        Pre\u00E7o claro para sair do piloto e escalar.
                    </h1>
                    <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
                        Compare por maturidade: comece validando o fluxo, avance para relat\u00F3rios e cres\u00E7a com suporte quando a opera\u00E7\u00E3o pedir.
                    </p>
                </div>

                <aside data-landing-reveal className="rounded-[2rem] border border-primary/25 bg-card p-7 shadow-2xl shadow-primary/10">
                    <div className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-primary">Mais escolhido</div>
                    <div className="flex items-end gap-1">
                        <span className="text-5xl font-black">{highlightedPlan.price}</span>
                        {highlightedPlan.period && <span className="mb-2 text-muted-foreground">{highlightedPlan.period}</span>}
                    </div>
                    <p className="mt-3 text-muted-foreground">{highlightedPlan.description}</p>
                    <div className="my-7 space-y-3">
                        {highlightedPlan.features.slice(0, 4).map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm font-medium">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                {feature}
                            </div>
                        ))}
                    </div>
                    <Button className="h-12 w-full rounded-full font-black" style={{ background: primaryGradient }} asChild>
                        <Link href="/login">
                            Come\u00E7ar pelo {highlightedPlan.name}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </aside>
            </div>
        </section>
    );
}
