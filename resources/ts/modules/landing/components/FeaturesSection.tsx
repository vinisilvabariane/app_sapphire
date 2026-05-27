import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { features } from "../data/landingData";
import { SectionHeading } from "./SectionHeading";

export function FeaturesSection() {
    return (
        <section id="features" className="landing-section bg-black px-6 py-14 lg:py-16">
            <div className="mx-auto max-w-screen-xl space-y-14">
                <SectionHeading
                    eyebrow="Recursos"
                    title="Uma plataforma."
                    accent="Possibilidades infinitas."
                    description={"Cada detalhe foi pensado para sua equipe trabalhar melhor, sem fric\u00E7\u00E3o e sem complexidade."}
                    inverted
                />

                <div className="landing-stagger grid gap-4 md:grid-cols-3">
                    {features.map((feature) => (
                        <div
                            data-landing-reveal
                            key={feature.title}
                            className={`group space-y-4 rounded-lg border border-border/60 bg-card p-8 transition-all hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 ${
                                feature.wide ? "md:col-span-2" : ""
                            }`}
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 transition-colors group-hover:bg-primary/20">
                                <feature.icon className="h-6 w-6 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold">{feature.title}</h3>
                            <p className="leading-relaxed text-muted-foreground">{feature.description}</p>
                            {feature.tags ? (
                                <div className="flex flex-wrap gap-2 pt-1">
                                    {feature.tags.map((tag) => (
                                        <Badge key={tag} variant="secondary" className="text-xs font-medium">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                feature.wide && (
                                    <div className="flex items-center gap-1.5 pt-2 text-sm font-semibold text-primary transition-all group-hover:gap-3">
                                        Saiba mais <ArrowRight className="h-4 w-4" />
                                    </div>
                                )
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
