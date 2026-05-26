import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";

type PinnedStoryItem = {
    eyebrow: string;
    title: string;
    description: string;
    icon: LucideIcon;
};

type PinnedStorySectionProps = {
    eyebrow: string;
    title: string;
    description: string;
    items: PinnedStoryItem[];
};

export function PinnedStorySection({ eyebrow, title, description, items }: PinnedStorySectionProps) {
    return (
        <section className="landing-section isolate overflow-visible bg-background px-6 py-16 lg:py-24">
            <div className="mx-auto grid max-w-screen-xl items-start gap-12 lg:grid-cols-[minmax(460px,0.95fr)_minmax(300px,0.65fr)] lg:gap-16 xl:grid-cols-[minmax(540px,1fr)_minmax(320px,0.62fr)] xl:gap-20">
                <aside className="relative z-40 min-w-0 lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] lg:self-start">
                    <div className="relative flex h-full min-h-[540px] overflow-hidden rounded-[2rem] bg-black p-8 text-white shadow-2xl shadow-black/25 sm:p-10 lg:p-12">
                        <div className="absolute inset-x-0 top-0 h-1 bg-primary" aria-hidden="true" />
                        <div
                            className="absolute inset-0 opacity-[0.18]"
                            aria-hidden="true"
                            style={{
                                backgroundImage:
                                    "linear-gradient(rgba(255,255,255,.42) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.42) 1px, transparent 1px)",
                                backgroundPosition: "0 0",
                                backgroundSize: "44px 44px",
                            }}
                        />
                        <div className="relative flex min-h-0 w-full flex-col justify-center gap-8 lg:gap-10">
                            <span className="inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-[0.24em] text-white/75">
                                {eyebrow}
                            </span>
                            <div className="space-y-6">
                                <h2 className="max-w-[11ch] text-5xl font-black uppercase leading-[0.94] tracking-normal sm:text-6xl lg:text-[4rem] xl:text-7xl">
                                    {title}
                                </h2>
                                <p className="max-w-lg text-lg leading-relaxed text-white/70">{description}</p>
                            </div>
                        </div>
                    </div>
                </aside>

                <div className="relative z-10 min-w-0 space-y-5 lg:pt-20">
                    {items.map((item, index) => (
                        <article
                            data-landing-reveal
                            key={item.title}
                            className="commercial-pin-card group rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-xl shadow-black/5 transition-colors hover:border-primary/40 sm:p-8"
                        >
                            <div className="grid min-w-0 gap-6 md:grid-cols-[minmax(0,1fr)_170px] md:items-center xl:grid-cols-[minmax(0,1fr)_210px]">
                                <div className="min-w-0 space-y-6">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-black text-muted-foreground">0{index + 1}</span>
                                        <span className="text-xs font-black uppercase tracking-[0.22em] text-primary">
                                            {item.eyebrow}
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        <h3 className="text-2xl font-black uppercase leading-tight tracking-normal sm:text-3xl">
                                            {item.title}
                                        </h3>
                                        <p className="max-w-xl leading-relaxed text-muted-foreground">{item.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-bold text-primary">
                                        <CheckCircle2 className="h-4 w-4" />
                                        Pronto para opera\u00E7\u00E3o real
                                    </div>
                                </div>

                                <div className="commercial-orbit relative mx-auto flex aspect-square w-full max-w-[170px] items-center justify-center rounded-full border border-primary/20 bg-primary/5 xl:max-w-[210px]">
                                    <div className="absolute inset-8 rounded-full border border-dashed border-primary/25" />
                                    <div className="commercial-orbit-ring absolute inset-4 rounded-full">
                                        <span className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-lg shadow-primary/40" />
                                        <span className="absolute bottom-8 left-2 h-2 w-2 rounded-full bg-foreground/50" />
                                        <span className="absolute right-4 top-20 h-2.5 w-2.5 rounded-full bg-primary/55" />
                                    </div>
                                    <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-background shadow-2xl shadow-primary/10 ring-1 ring-border">
                                        <item.icon className="h-10 w-10 text-primary" />
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
