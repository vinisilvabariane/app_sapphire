import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stats } from "../data/landingData";
import { primaryGradient } from "./landingStyles";

type CommercialIntroProps = {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    primaryHref?: string;
    primaryLabel?: string;
};

export function CommercialIntro({
    eyebrow,
    title,
    accent,
    description,
    primaryHref = "/login",
    primaryLabel = "Come\u00E7ar agora",
}: CommercialIntroProps) {
    return (
        <section className="landing-section relative isolate overflow-hidden bg-black px-6 py-16 text-white sm:py-20 lg:py-24">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(91,163,232,0.28),transparent_32%),linear-gradient(135deg,#020711_0%,#071326_48%,#000_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

            <div className="relative mx-auto grid max-w-screen-xl gap-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
                <div data-landing-reveal className="max-w-5xl space-y-8">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-black uppercase tracking-[0.28em] text-primary">
                            {eyebrow}
                        </span>
                        <div className="h-px flex-1 bg-white/15" />
                    </div>

                    <h1 className="max-w-5xl text-5xl font-black uppercase leading-[0.92] tracking-normal sm:text-6xl lg:text-7xl xl:text-8xl">
                        {title}
                        <span className="block text-primary">{accent}</span>
                    </h1>

                    <p className="max-w-2xl text-lg leading-relaxed text-white/64 sm:text-xl">
                        {description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                        <Button
                            size="lg"
                            className="h-12 rounded-full px-8 text-sm font-black uppercase tracking-wide shadow-2xl shadow-primary/25"
                            style={{ background: primaryGradient }}
                            asChild
                        >
                            <Link href={primaryHref}>
                                {primaryLabel}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-12 rounded-full border-white/20 bg-white/5 px-8 text-sm font-black uppercase tracking-wide text-white hover:bg-white/10 hover:text-white"
                            asChild
                        >
                            <Link href="/planos">Ver planos</Link>
                        </Button>
                    </div>
                </div>

                <div data-landing-reveal className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    {stats.map((stat, index) => (
                        <div key={stat.label} className="border-t border-white/15 pt-5">
                            <div className="flex items-start justify-between gap-4">
                                <span className="text-xs font-black text-white/34">0{index + 1}</span>
                                <div className="text-right">
                                    <div className="text-3xl font-black tracking-normal text-white">{stat.value}</div>
                                    <div className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-white/45">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
