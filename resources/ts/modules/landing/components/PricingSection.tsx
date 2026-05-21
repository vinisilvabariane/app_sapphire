import { Link } from "@inertiajs/react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { plans } from "../data/landingData";
import { fadeUp, stagger } from "./landingMotion";
import { gradientText } from "./landingStyles";
import { SectionHeading } from "./SectionHeading";

export function PricingSection() {
    return (
        <section id="pricing" className="border-t border-border/40 bg-muted/15 px-6 py-24">
            <div className="mx-auto max-w-screen-xl space-y-14">
                <SectionHeading
                    eyebrow="Planos"
                    title="Simples e"
                    accent="transparente"
                    description="Comece grátis. Escale quando precisar. Sem surpresas na fatura."
                />

                <motion.div
                    className="grid items-stretch gap-5 md:grid-cols-3"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {plans.map((plan) => (
                        <motion.div
                            key={plan.name}
                            variants={fadeUp}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            className={`relative flex flex-col gap-6 rounded-2xl bg-card p-8 transition-all ${
                                plan.highlighted
                                    ? "border-2 border-primary shadow-2xl shadow-primary/15"
                                    : "border border-border/60 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                            }`}
                        >
                            {plan.highlighted && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="inline-flex rounded-full bg-primary px-4 py-1 text-xs font-bold text-white shadow-lg shadow-primary/30">
                                        Mais popular
                                    </span>
                                </div>
                            )}

                            <div>
                                <div
                                    className={`mb-3 text-sm font-bold uppercase tracking-widest ${
                                        plan.highlighted ? "text-primary" : "text-muted-foreground"
                                    }`}
                                >
                                    {plan.name}
                                </div>
                                <div className="flex items-end gap-1">
                                    <span className="text-5xl font-black" style={plan.highlighted ? gradientText : undefined}>
                                        {plan.price}
                                    </span>
                                    {plan.period && (
                                        <span className="mb-1.5 ml-0.5 text-muted-foreground">{plan.period}</span>
                                    )}
                                </div>
                                <p className="mt-2 text-sm text-muted-foreground">{plan.description}</p>
                            </div>

                            <Separator />

                            <ul className="flex-1 space-y-3">
                                {plan.features.map((feature) => (
                                    <li
                                        key={feature}
                                        className={`flex items-center gap-2.5 text-sm ${
                                            plan.highlighted ? "" : "text-muted-foreground"
                                        }`}
                                    >
                                        <Check className="h-4 w-4 flex-shrink-0 text-primary" />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={plan.highlighted ? "default" : "outline"}
                                className={plan.highlighted ? "w-full shadow-lg shadow-primary/25" : "w-full"}
                                size="lg"
                                asChild
                            >
                                <Link href="/login">
                                    {plan.action}
                                    {plan.highlighted && <ArrowRight className="ml-2 h-4 w-4" />}
                                </Link>
                            </Button>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.p
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="text-center text-sm text-muted-foreground"
                >
                    Todos os planos incluem 14 dias de teste grátis. Cancele a qualquer momento.
                </motion.p>
            </div>
        </section>
    );
}
