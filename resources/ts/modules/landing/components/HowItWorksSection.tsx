import { motion } from "framer-motion";
import { steps } from "../data/landingData";
import { fadeUp, stagger } from "./landingMotion";
import { gradientText } from "./landingStyles";
import { SectionHeading } from "./SectionHeading";

export function HowItWorksSection() {
    return (
        <section id="how" className="border-y border-border/40 bg-muted/15 px-6 py-24">
            <div className="mx-auto max-w-screen-xl space-y-16">
                <SectionHeading
                    eyebrow="Como funciona"
                    title="Do zero ao operacional"
                    accent="em minutos"
                />

                <motion.div
                    className="grid gap-10 md:grid-cols-3"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {steps.map((step, index) => (
                        <motion.div key={step.number} variants={fadeUp} className="relative space-y-5">
                            <div className="flex items-center gap-4">
                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl border-2 border-primary/30 bg-primary/10">
                                    <span className="text-lg font-black" style={gradientText}>
                                        {step.number}
                                    </span>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="hidden h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent md:block" />
                                )}
                            </div>
                            <h3 className="text-xl font-bold">{step.title}</h3>
                            <p className="leading-relaxed text-muted-foreground">{step.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
