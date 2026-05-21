import { Separator } from "@/components/ui/separator";
import { footerGroups } from "../data/landingData";
import { BrandMark } from "./BrandMark";

export function LandingFooter() {
    return (
        <footer className="border-t border-border/40 px-6 py-14">
            <div className="mx-auto max-w-screen-xl">
                <div className="mb-12 flex flex-col items-start justify-between gap-10 md:flex-row">
                    <div className="max-w-xs space-y-4">
                        <BrandMark />
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            Gestão empresarial moderna. Rápida, segura e pronta para o crescimento do seu negócio.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-12 text-sm">
                        {footerGroups.map((group) => (
                            <div key={group.title} className="space-y-3">
                                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground">
                                    {group.title}
                                </div>
                                {group.links.map((link) => (
                                    <div key={link}>
                                        <a href="#" className="text-muted-foreground transition-colors hover:text-foreground">
                                            {link}
                                        </a>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                <Separator />

                <div className="flex flex-col items-center justify-between gap-4 pt-8 text-xs text-muted-foreground sm:flex-row">
                    <p>© {new Date().getFullYear()} Sapphire. Todos os direitos reservados.</p>
                    <p>Feito no Brasil</p>
                </div>
            </div>
        </footer>
    );
}
