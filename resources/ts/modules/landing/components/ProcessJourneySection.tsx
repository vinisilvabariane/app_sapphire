import { ArrowRight, CheckCircle2 } from "lucide-react";
import { steps } from "../data/landingData";
import { primaryGradient } from "./landingStyles";

export function ProcessJourneySection() {
    return (
        <section className="landing-section relative isolate overflow-hidden bg-black px-6 py-16 text-white sm:py-20 lg:py-24">
            <div
                className="absolute inset-0 opacity-[0.35]"
                aria-hidden="true"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.16) 1px, transparent 1px)",
                    backgroundSize: "56px 56px",
                }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_22%,rgba(91,163,232,0.22),transparent_28%),linear-gradient(135deg,#020711_0%,#071326_54%,#000_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

            <div className="relative mx-auto grid max-w-screen-xl gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.72fr)] lg:items-center">
                <div data-landing-reveal className="max-w-4xl space-y-8">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-black uppercase tracking-[0.28em] text-primary">
                            Recursos
                        </span>
                        <div className="h-px flex-1 bg-white/15" />
                    </div>

                    <div className="space-y-6">
                        <h1 className="text-5xl font-black uppercase leading-[0.92] tracking-normal sm:text-6xl lg:text-7xl xl:text-8xl">
                            Da primeira conta ao time operando.
                        </h1>
                        <p className="max-w-2xl text-lg leading-relaxed text-white/64 sm:text-xl">
                            O Sapphire organiza o caminho de entrada, configura\u00E7\u00E3o e rotina para a equipe sair do improviso sem depender de uma implanta\u00E7\u00E3o longa.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                        {steps.map((step) => (
                            <div key={step.number} className="border-t border-white/15 pt-4">
                                <div className="text-sm font-black text-primary">{step.number}</div>
                                <div className="mt-2 text-sm font-bold leading-snug text-white/72">{step.title}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div data-landing-reveal className="rounded-lg border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 backdrop-blur">
                    <div className="rounded-lg bg-black/70 p-5 ring-1 ring-white/10">
                        <div className="mb-6 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                            <div>
                                <div className="text-xs font-black uppercase tracking-[0.22em] text-primary">
                                    Onboarding
                                </div>
                                <div className="mt-1 text-2xl font-black">Fluxo guiado</div>
                            </div>
                            <div
                                className="flex h-11 w-11 items-center justify-center rounded-lg text-white shadow-lg shadow-primary/25"
                                style={{ background: primaryGradient }}
                                aria-hidden="true"
                            >
                                <ArrowRight className="h-5 w-5" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            {steps.map((step, index) => (
                                <article
                                    key={step.number}
                                    className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 rounded-lg border border-white/10 bg-white/[0.05] p-4"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-sm font-black text-primary">
                                        {step.number}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <h2 className="text-base font-black uppercase leading-tight">{step.title}</h2>
                                            {index === 0 && <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />}
                                        </div>
                                        <p className="mt-2 text-sm leading-relaxed text-white/55">{step.description}</p>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
