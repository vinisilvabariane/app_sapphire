import { Link } from "@inertiajs/react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { assurances } from "../data/landingData";
import { BrandMark } from "./BrandMark";
import { gradientText, primaryGradient } from "./landingStyles";

export function CtaSection() {
    return (
        <section className="landing-section border-y border-border/40 bg-muted/20 px-6 py-12 lg:py-14">
            <div className="mx-auto max-w-screen-xl">
                <div data-landing-reveal className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl space-y-5">
                        <div className="flex items-center gap-3">
                            <BrandMark compact />
                            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-primary">
                                Sapphire
                            </span>
                        </div>

                        <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                            Pronto para operar com
                            <span style={gradientText}> mais clareza?</span>
                        </h2>

                        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                            {"Comece hoje com uma base limpa para login, JWT, rotas e p\u00E1ginas."}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 md:items-end">
                        <Button
                            size="lg"
                            className="h-12 px-9 text-base font-black shadow-xl shadow-primary/25"
                            style={{ background: primaryGradient }}
                            asChild
                        >
                            <Link href="/login">
                                {"Come\u00E7ar agora"}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>

                        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground md:justify-end">
                            {assurances.map((item) => (
                                <div key={item.label} className="flex items-center gap-1.5">
                                    <Check className="h-3.5 w-3.5 flex-shrink-0 text-primary" />
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
