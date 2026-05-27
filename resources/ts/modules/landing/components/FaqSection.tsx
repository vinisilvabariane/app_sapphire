import { ChevronDown, HelpCircle } from "lucide-react";
import { faqs } from "../data/landingData";

export function FaqSection() {
    return (
        <section className="landing-section bg-background px-6 py-14 lg:py-20">
            <div className="mx-auto grid max-w-screen-xl gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
                <div data-landing-reveal className="space-y-6 lg:sticky lg:top-24">
                    <span className="text-xs font-black uppercase tracking-[0.24em] text-primary">
                        Perguntas frequentes
                    </span>
                    <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-normal sm:text-6xl xl:text-7xl">
                        Tire as principais d\u00FAvidas antes de entrar.
                    </h1>
                    <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                        Respostas diretas sobre opera\u00E7\u00E3o, seguran\u00E7a, crescimento e integra\u00E7\u00E3o do Sapphire.
                    </p>
                </div>

                <div className="landing-stagger space-y-4">
                    {faqs.map((faq, index) => (
                        <details
                            data-landing-reveal
                            key={faq.question}
                            className="group rounded-lg border border-border/70 bg-card p-6 shadow-sm transition-all open:border-primary/35 open:shadow-xl open:shadow-primary/10"
                            open={index === 0}
                        >
                            <summary className="flex cursor-pointer list-none items-start justify-between gap-5">
                                <span className="flex min-w-0 gap-4">
                                    <span className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <HelpCircle className="h-5 w-5" />
                                    </span>
                                    <span className="text-xl font-black leading-snug">{faq.question}</span>
                                </span>
                                <ChevronDown className="mt-1 h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                            </summary>
                            <p className="ml-[3.25rem] mt-5 max-w-2xl leading-relaxed text-muted-foreground">
                                {faq.answer}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}
