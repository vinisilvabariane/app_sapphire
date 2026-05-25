import { steps } from "../data/landingData";

export function ProcessJourneySection() {
    return (
        <section className="landing-section overflow-hidden bg-black px-6 py-14 text-white lg:py-20">
            <div className="mx-auto max-w-screen-xl">
                <div data-landing-reveal className="mb-12 max-w-3xl space-y-5">
                    <span className="text-xs font-black uppercase tracking-[0.24em] text-primary">Como funciona</span>
                    <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-normal sm:text-6xl xl:text-7xl">
                        Uma jornada curta at\u00E9 a opera\u00E7\u00E3o rodar.
                    </h1>
                    <p className="text-lg leading-relaxed text-white/62">
                        O desenho da implanta\u00E7\u00E3o troca explica\u00E7\u00E3o longa por etapas visuais, claras e acion\u00E1veis.
                    </p>
                </div>

                <div className="grid gap-4 lg:grid-cols-3">
                    {steps.map((step, index) => (
                        <article
                            data-landing-reveal
                            key={step.number}
                            className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-7"
                        >
                            <div className="absolute -right-8 -top-8 text-[9rem] font-black leading-none text-white/[0.04]">
                                {step.number}
                            </div>
                            <div className="relative flex h-full flex-col justify-between gap-12">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-black text-primary">{step.number}</span>
                                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs font-bold text-white/55">
                                        Etapa {index + 1}
                                    </span>
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black uppercase leading-tight">{step.title}</h2>
                                    <p className="mt-4 leading-relaxed text-white/58">{step.description}</p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
