import { Star } from "lucide-react";
import { testimonials } from "../data/landingData";
import { SectionHeading } from "./SectionHeading";

export function TestimonialsSection() {
    return (
        <section id="testimonials" className="landing-section px-6 py-14 lg:py-16">
            <div className="mx-auto max-w-screen-xl space-y-14">
                <SectionHeading eyebrow="Depoimentos" title="Quem usa," accent="recomenda" />

                <div className="landing-stagger grid gap-5 md:grid-cols-3">
                    {testimonials.map((testimonial) => (
                        <div
                            data-landing-reveal
                            key={testimonial.name}
                            className="space-y-5 rounded-2xl border border-border/60 bg-card p-7 transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10"
                        >
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <Star key={index} className="h-4 w-4 fill-primary text-primary" />
                                ))}
                            </div>
                            <p className="text-sm italic leading-relaxed text-muted-foreground">
                                &ldquo;{testimonial.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-3 pt-1">
                                <img
                                    src={testimonial.photo}
                                    alt={testimonial.name}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-11 w-11 rounded-full object-cover ring-2 ring-primary/20"
                                />
                                <div>
                                    <div className="text-sm font-bold">{testimonial.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {testimonial.role} {"\u00B7"} {testimonial.company}
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
