import { motion } from "framer-motion";
import { fadeUp, stagger } from "./landingMotion";
import { gradientText } from "./landingStyles";

type SectionHeadingProps = {
    eyebrow: string;
    title: string;
    accent: string;
    description?: string;
    inverted?: boolean;
};

export function SectionHeading({
    eyebrow,
    title,
    accent,
    description,
    inverted = false,
}: SectionHeadingProps) {
    return (
        <motion.div
            className="mx-auto max-w-2xl space-y-4 text-center"
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
        >
            <motion.p
                variants={fadeUp}
                className="text-[11px] font-black uppercase tracking-[0.22em] text-primary"
            >
                {eyebrow}
            </motion.p>
            <motion.h2
                variants={fadeUp}
                className={`text-3xl font-black tracking-tight sm:text-5xl ${
                    inverted ? "text-white" : ""
                }`}
            >
                {title} <span style={gradientText}>{accent}</span>
            </motion.h2>
            {description && (
                <motion.p
                    variants={fadeUp}
                    className={`text-lg leading-relaxed ${
                        inverted ? "text-white/60" : "text-muted-foreground"
                    }`}
                >
                    {description}
                </motion.p>
            )}
        </motion.div>
    );
}
