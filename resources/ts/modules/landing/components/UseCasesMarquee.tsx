import { useCases } from "../data/landingData";

const marqueeItems = Array.from({ length: 5 }, () => useCases).flat();
const marqueeLoop = [...marqueeItems, ...marqueeItems];

export function UseCasesMarquee() {
    return (
        <section className="landing-section overflow-hidden border-y border-border/40 bg-muted/15 py-5">
            <div className="mx-auto mb-3 flex max-w-screen-xl items-center gap-4 px-6">
                <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    {"O que voc\u00EA resolve com Sapphire"}
                </span>
                <div className="h-px flex-1 bg-border/40" />
            </div>
            <div className="relative">
                <div className="landing-text-marquee-track flex w-max items-center gap-12 px-8">
                    {marqueeLoop.map((useCase, index) => (
                        <span
                            key={`${useCase}-${index}`}
                            aria-hidden={index >= marqueeItems.length}
                            className="whitespace-nowrap text-sm font-black tracking-tight text-foreground sm:text-base"
                        >
                            {useCase}
                        </span>
                    ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
            </div>
        </section>
    );
}
