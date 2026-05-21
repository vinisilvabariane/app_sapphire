import { motion } from "framer-motion";
import { stats } from "../data/landingData";
import { fadeUp, stagger } from "./landingMotion";
import { gradientText } from "./landingStyles";

export function StatsSection() {
    return (
        <section className="bg-black px-6 py-24">
            <div className="mx-auto max-w-screen-xl">
                <motion.div
                    className="grid grid-cols-2 gap-4 md:grid-cols-4"
                    variants={stagger}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-60px" }}
                >
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={fadeUp}
                            className="space-y-1 rounded-2xl border border-border/50 bg-card p-6 text-center transition-colors hover:border-primary/30"
                        >
                            <div className="text-4xl font-black" style={gradientText}>
                                {stat.value}
                            </div>
                            <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
