import { Link } from "@inertiajs/react";
import { CheckCircle2, ChevronRight, Gem, ShieldCheck, Sparkles } from "lucide-react";
import LoginForm from "@/modules/auth/components/LoginForm";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const gt: React.CSSProperties = {
    background: "linear-gradient(135deg, #5ba3e8 0%, #285295 55%, #1a3a6e 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
};

export default function Login() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(circle at 78% 22%, rgba(91,163,232,0.16) 0%, rgba(91,163,232,0.06) 28%, transparent 48%), radial-gradient(circle at 14% 18%, rgba(40,82,149,0.12) 0%, rgba(40,82,149,0.04) 30%, transparent 52%), var(--background)",
                }}
            />
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.035] dark:opacity-[0.06]"
                style={{
                    backgroundImage: "radial-gradient(circle at 1px 1px, #285295 1px, transparent 0)",
                    backgroundSize: "42px 42px",
                }}
            />

            <header className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/85 backdrop-blur-xl">
                <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

                <div className="mx-auto grid h-16 max-w-screen-xl grid-cols-[1fr_auto_1fr] items-center px-6">
                    <Link href="/" className="flex w-fit items-center gap-2.5">
                        <div
                            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl shadow-md shadow-primary/40"
                            style={{ background: "linear-gradient(135deg, #3a6cbd 0%, #285295 60%, #1a3a6e 100%)" }}
                        >
                            <Gem className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-lg font-black tracking-tight" style={gt}>Sapphire</span>
                    </Link>

                    <nav className="hidden items-center justify-center gap-0.5 rounded-full border border-border/50 bg-muted/30 px-2 py-1.5 md:flex">
                        {(["Recursos", "Planos", "Como funciona", "Depoimentos"] as const).map((label, index) => (
                            <Link
                                key={label}
                                href={["/#features", "/#pricing", "/#how", "/#testimonials"][index]}
                                className="whitespace-nowrap rounded-full px-3.5 py-1 text-sm text-muted-foreground transition-all hover:bg-background/70 hover:text-foreground"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex min-w-0 items-center justify-end gap-2">
                        <ThemeToggle />
                        <Button variant="ghost" size="sm" className="hidden px-3 sm:inline-flex" asChild>
                            <Link href="/">Voltar ao site</Link>
                        </Button>
                        <Button
                            size="sm"
                            asChild
                            className="h-9 rounded-full px-3.5 text-xs font-bold shadow-md shadow-primary/25 sm:px-4 sm:text-sm"
                            style={{ background: "linear-gradient(135deg, #3a6cbd, #285295)" }}
                        >
                            <Link href="/" className="inline-flex items-center gap-1.5 whitespace-nowrap">
                                Inicio <ChevronRight className="h-3.5 w-3.5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>

            <main className="relative z-10 mx-auto grid min-h-screen w-full max-w-screen-xl items-center gap-12 px-6 pb-14 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:pt-32">
                <section className="hidden max-w-2xl -translate-y-4 space-y-8 lg:block">
                    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-bold text-primary">
                        <Sparkles className="h-3.5 w-3.5" />
                        Plataforma de operacoes Sapphire
                    </div>

                    <div className="space-y-5">
                        <h1 className="text-5xl font-black leading-tight tracking-normal xl:text-[4.8rem]">
                            Acesse seu painel com
                            <span style={gt}> seguranca.</span>
                        </h1>
                        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                            Continue de onde parou: chamados, indicadores, equipes e relatorios em um so lugar.
                        </p>
                    </div>

                    <div className="grid max-w-xl gap-3">
                        {[
                            "Sessao protegida por cookies HttpOnly",
                            "Dados centralizados para sua equipe",
                            "Dashboard pronto para acompanhar KPIs",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3 text-sm font-medium text-muted-foreground">
                                <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
                                {item}
                            </div>
                        ))}
                    </div>

                    <div className="inline-flex items-center gap-3 rounded-2xl border border-border/60 bg-card/70 px-4 py-3 shadow-sm backdrop-blur">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                            <div className="text-sm font-bold">Ambiente seguro</div>
                            <div className="text-xs text-muted-foreground">
                                Autenticacao e rotas protegidas por middleware
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto w-full max-w-md lg:translate-x-4 xl:translate-x-8">
                    <div className="mb-7 space-y-2 text-center lg:text-left">
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-primary">Login</p>
                        <h2 className="text-3xl font-black tracking-tight">Entrar na conta</h2>
                        <p className="text-sm text-muted-foreground">Use suas credenciais para acessar o Sapphire.</p>
                    </div>

                    <LoginForm />
                </section>
            </main>
        </div>
    );
}
