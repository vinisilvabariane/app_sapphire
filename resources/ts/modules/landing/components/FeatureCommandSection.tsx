import { ArrowRight } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { features, useCases } from "../data/landingData";

export function FeatureCommandSection() {
    return (
        <section className="landing-section bg-background px-6 py-14 lg:py-20">
            <div className="mx-auto grid max-w-screen-xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div data-landing-reveal className="space-y-7">
                    <span className="text-xs font-black uppercase tracking-[0.24em] text-primary">Recursos</span>
                    <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-normal sm:text-6xl xl:text-7xl">
                        Central de comando para opera\u00E7\u00F5es digitais.
                    </h1>
                    <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                        Dashboards, acessos e fluxos de trabalho aparecem como uma experi\u00EAncia \u00FAnica, desenhada para decis\u00E3o r\u00E1pida.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {useCases.map((item) => (
                            <span key={item} className="rounded-full border border-border bg-muted/40 px-4 py-2 text-sm font-bold">
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div data-landing-reveal className="rounded-[2rem] bg-black p-4 text-white shadow-2xl shadow-primary/10">
                    <div className="rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_20%_0%,rgba(91,163,232,0.28),transparent_34%),#050914] p-5">
                        <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-4">
                            <div>
                                <div className="text-xs font-black uppercase tracking-[0.22em] text-primary">Live workspace</div>
                                <div className="mt-1 text-2xl font-black">Sapphire Control</div>
                            </div>
                            <Button className="rounded-full bg-white text-primary hover:bg-white/90" asChild>
                                <Link href="/login">
                                    Testar <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className={`rounded-2xl border border-white/10 bg-white/[0.06] p-5 ${
                                        index === 0 ? "sm:col-span-2" : ""
                                    }`}
                                >
                                    <feature.icon className="mb-5 h-7 w-7 text-primary" />
                                    <h3 className="text-lg font-black">{feature.title}</h3>
                                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/55">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
