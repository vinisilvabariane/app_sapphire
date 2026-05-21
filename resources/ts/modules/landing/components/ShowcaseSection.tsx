import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";

export function ShowcaseSection() {
    const ref = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const imageY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);

    return (
        <section ref={ref} className="relative h-[600px] overflow-hidden bg-black md:h-[700px]">
            <motion.div style={{ y: imageY }} className="absolute inset-0 scale-125 will-change-transform">
                <img
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1600&auto=format&fit=crop&q=80"
                    alt=""
                    className="h-full w-full object-cover object-left brightness-95 contrast-110 saturate-105"
                />
            </motion.div>

            <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.32)_34%,rgba(0,0,0,0.78)_60%,#000_86%,#000_100%)]" />
            <div className="absolute inset-x-0 top-0 h-64 bg-[linear-gradient(180deg,#000_0%,rgba(0,0,0,0.82)_24%,rgba(0,0,0,0.36)_62%,transparent_100%)]" />
            <div className="absolute inset-x-0 bottom-0 h-72 bg-[linear-gradient(0deg,#000_0%,rgba(0,0,0,0.86)_24%,rgba(0,0,0,0.38)_64%,transparent_100%)]" />

            <div className="absolute inset-0 flex items-center">
                <div className="mx-auto flex w-full max-w-screen-xl justify-end px-8 md:px-14">
                    <motion.div
                        className="w-full max-w-xl space-y-7 text-white"
                        initial={{ opacity: 1, x: 48 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-px w-10 bg-primary" />
                            <span className="text-xs font-bold uppercase tracking-[0.22em] text-white/55">
                                Sapphire em ação
                            </span>
                        </div>

                        <h3 className="text-4xl font-black leading-[1.08] tracking-normal sm:text-5xl xl:text-6xl">
                            Times produtivos.
                            <br />
                            Resultados reais.
                        </h3>

                        <p className="text-lg leading-relaxed text-white/65">
                            Uma base limpa para evoluir autenticação, rotas, requests e dashboards sem acumular
                            código solto na página principal.
                        </p>

                        <Button
                            size="lg"
                            className="h-12 bg-white px-8 font-bold text-primary shadow-2xl shadow-black/30 hover:bg-white/90"
                            asChild
                        >
                            <Link href="/login">
                                Começar agora <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
