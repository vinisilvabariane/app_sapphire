import { Star } from "lucide-react";
import { testimonials } from "../data/landingData";

export function ProofWallSection() {
    const featured = testimonials[0];

    return (
        <section className="landing-section bg-background px-6 py-14 lg:py-20">
            <div className="mx-auto grid max-w-screen-xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch">
                <div data-landing-reveal className="flex min-h-[520px] flex-col justify-between rounded-[2rem] bg-black p-8 text-white sm:p-10">
                    <div>
                        <span className="text-xs font-black uppercase tracking-[0.24em] text-primary">Depoimentos</span>
                        <h1 className="mt-6 text-5xl font-black uppercase leading-[0.95] tracking-normal sm:text-6xl xl:text-7xl">
                            Prova social sem ru\u00EDdo.
                        </h1>
                    </div>
                    <blockquote className="max-w-2xl text-2xl font-black leading-tight text-white/82 sm:text-3xl">
                        &ldquo;{featured.quote}&rdquo;
                    </blockquote>
                </div>

                <div className="grid gap-4">
                    <div data-landing-reveal className="rounded-[2rem] border border-border bg-card p-7">
                        <div className="mb-5 flex gap-1">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star key={index} className="h-5 w-5 fill-primary text-primary" />
                            ))}
                        </div>
                        <div className="text-4xl font-black">4.9/5</div>
                        <p className="mt-2 text-muted-foreground">Avalia\u00E7\u00E3o m\u00E9dia em experi\u00EAncias de opera\u00E7\u00E3o, onboarding e clareza t\u00E9cnica.</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {testimonials.slice(1).map((testimonial) => (
                            <article data-landing-reveal key={testimonial.name} className="rounded-[2rem] border border-border bg-card p-6">
                                <img src={testimonial.photo} alt={testimonial.name} className="mb-5 h-14 w-14 rounded-full object-cover" />
                                <p className="text-sm leading-relaxed text-muted-foreground">&ldquo;{testimonial.quote}&rdquo;</p>
                                <div className="mt-5 text-sm font-black">{testimonial.name}</div>
                                <div className="text-xs text-muted-foreground">
                                    {testimonial.role} · {testimonial.company}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
