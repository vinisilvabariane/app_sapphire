import { ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/LogoMark";

export function ShowcaseSection() {
    return (
        <section className="landing-section relative h-[600px] overflow-hidden bg-black md:h-[700px]">
            <div className="landing-logo-grid absolute inset-0" />
            <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(5,12,26,0.2)_0%,rgba(5,12,26,0.38)_38%,rgba(0,0,0,0.84)_72%,#000_100%)]" />
            <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,#000_0%,rgba(0,0,0,0.76)_32%,transparent_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0.82)_28%,transparent_100%)]" />

            <div className="absolute inset-y-0 left-0 hidden w-1/2 items-center justify-center md:flex">
                <div data-landing-reveal className="relative">
                    <div className="absolute inset-0 scale-150 rounded-full bg-primary/20 blur-3xl" />
                    <LogoMark className="relative h-56 w-56 drop-shadow-[0_34px_90px_rgba(91,163,232,0.36)] xl:h-72 xl:w-72" />
                </div>
            </div>

            <div className="absolute inset-0 flex items-center">
                <div className="mx-auto flex w-full max-w-screen-xl justify-end px-8 md:px-14">
                    <div data-landing-reveal className="w-full max-w-xl space-y-7 text-white">
                        <div className="flex items-center gap-3">
                            <div className="h-px w-10 bg-primary" />
                            <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">
                                {"Sapphire em a\u00E7\u00E3o"}
                            </span>
                        </div>

                        <h3 className="text-4xl font-black leading-[1.08] tracking-normal sm:text-5xl xl:text-6xl">
                            Times produtivos.
                            <br />
                            Resultados reais.
                        </h3>

                        <p className="text-lg leading-relaxed text-white/65">
                            {"Uma base limpa para evoluir autentica\u00E7\u00E3o, rotas, requests e dashboards sem acumular c\u00F3digo solto na p\u00E1gina principal."}
                        </p>

                        <Button
                            size="lg"
                            className="h-12 bg-white px-8 font-bold text-primary shadow-2xl shadow-black/30 hover:bg-white/90"
                            asChild
                        >
                            <Link href="/login">
                                {"Come\u00E7ar agora"} <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
