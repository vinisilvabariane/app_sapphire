import { Link, usePage } from "@inertiajs/react";
import { ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Button } from "@/components/ui/button";
import { navItems } from "../data/landingData";
import { BrandMark } from "./BrandMark";
import { primaryGradient } from "./landingStyles";

export function LandingHeader() {
    const { url } = usePage();

    return (
        <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <div className="mx-auto grid h-16 max-w-screen-xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-6">
                <Link href="/" className="w-fit">
                    <BrandMark />
                </Link>

                <nav className="hidden items-center justify-center gap-1 rounded-full border border-border/50 bg-muted/30 px-2 py-1.5 md:flex">
                    {navItems.map((item) => {
                        const isActive = url === item.href;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`rounded-full px-3.5 py-1 text-sm transition-all hover:bg-background/70 hover:text-foreground ${
                                    isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground"
                                }`}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="flex min-w-0 items-center justify-end gap-2">
                    <ThemeToggle />
                    <Button variant="ghost" size="sm" className="hidden px-3 sm:inline-flex" asChild>
                        <Link href="/login">Entrar</Link>
                    </Button>
                    <Button
                        size="sm"
                        asChild
                        className="h-9 rounded-full px-3.5 text-xs font-bold shadow-md shadow-primary/25 sm:px-4 sm:text-sm"
                        style={{ background: primaryGradient }}
                    >
                        <Link href="/login" className="inline-flex items-center gap-1.5 whitespace-nowrap">
                            Começar grátis <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}
