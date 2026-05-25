import { Link } from "@inertiajs/react";
import { ArrowRight, ChevronRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { gradientText, primaryGradient } from "./landingStyles";
import { HeroMockup } from "./HeroMockup";
import { LandingParticles } from "./LandingParticles";

export function HeroSection() {
    return (
        <section
            className="relative flex min-h-screen items-center overflow-hidden bg-background px-6 pt-16"
            style={{ background: "var(--background)" }}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
                style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, #285295 1px, transparent 0)",
                    backgroundSize: "42px 42px",
                }}
            />
            <LandingParticles />

            <div className="relative z-10 mx-auto grid w-full max-w-screen-2xl items-center gap-14 py-24 lg:grid-cols-[56fr_44fr] xl:gap-16">
                <div className="landing-hero-sequence max-w-3xl space-y-9 lg:translate-x-12 xl:translate-x-20">
                    <a
                        href="#features"
                        className="group inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-4 py-1.5 text-xs font-medium transition-colors hover:bg-primary/10"
                    >
                        <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-black tracking-wide text-white">
                            NOVO
                        </span>
                        <span className="text-muted-foreground">Sapphire 1.0 chegou, veja os recursos</span>
                        <ChevronRight className="h-3 w-3 text-primary transition-transform group-hover:translate-x-0.5" />
                    </a>

                    <div className="space-y-2">
                        <h1 className="text-5xl font-black leading-[1.08] tracking-normal sm:text-6xl xl:text-[5.15rem]">
                            {"Menos esfor\u00E7o."}
                        </h1>
                        <h1
                            className="text-5xl font-black leading-[1.08] tracking-normal sm:text-6xl xl:text-[5.15rem]"
                            style={gradientText}
                        >
                            Mais resultado.
                        </h1>
                    </div>

                    <p className="max-w-xl text-xl leading-relaxed text-muted-foreground">
                        {"Sapphire centraliza sua opera\u00E7\u00E3o em uma plataforma moderna, segura e r\u00E1pida."}
                        {" Do controle de acesso aos relat\u00F3rios, tudo em um \u00FAnico lugar."}
                    </p>

                    <div className="flex flex-wrap gap-3 pt-1">
                        <Button
                            size="lg"
                            asChild
                            className="h-12 px-9 text-base font-black tracking-wide shadow-xl shadow-primary/35"
                            style={{ background: primaryGradient }}
                        >
                            <Link href="/login">
                                {"Come\u00E7ar agora, gr\u00E1tis"}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold">
                            {"Ver demonstra\u00E7\u00E3o"}
                        </Button>
                    </div>

                    <div className="flex items-center gap-5 pt-1">
                        <div className="flex -space-x-2.5">
                            {["F", "R", "C", "M", "J"].map((letter, index) => (
                                <div
                                    key={letter}
                                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background text-xs font-black text-primary"
                                    style={{ background: `rgba(40,82,149,${0.1 + index * 0.04})` }}
                                >
                                    {letter}
                                </div>
                            ))}
                        </div>
                        <div className="space-y-0.5">
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star key={index} className="h-3.5 w-3.5 fill-primary text-primary" />
                                ))}
                                <span className="ml-1.5 text-sm font-black">4.9</span>
                                <span className="ml-0.5 text-xs text-muted-foreground">/5</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                                Confiado por <span className="font-semibold text-foreground">+200 empresas</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="landing-hero-mockup hidden lg:block">
                    <HeroMockup />
                </div>
            </div>
        </section>
    );
}
