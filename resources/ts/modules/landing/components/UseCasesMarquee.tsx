import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { useCases } from "../data/landingData";

export function UseCasesMarquee() {
    return (
        <section className="overflow-hidden border-y border-border/40 bg-muted/15 py-4">
            <div className="mx-auto mb-3 flex max-w-screen-xl items-center gap-4 px-6">
                <span className="whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    O que você resolve com Sapphire
                </span>
                <div className="h-px flex-1 bg-border/40" />
            </div>
            <div className="relative">
                <motion.div
                    className="flex w-max gap-3 px-6"
                    animate={{ x: ["0px", "-50%"] }}
                    transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                >
                    {[...useCases, ...useCases].map((useCase, index) => (
                        <Badge
                            key={`${useCase}-${index}`}
                            variant="secondary"
                            className="whitespace-nowrap border border-primary/15 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-foreground"
                        >
                            {useCase}
                        </Badge>
                    ))}
                </motion.div>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />
            </div>
        </section>
    );
}
