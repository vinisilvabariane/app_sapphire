import { Link, router } from "@inertiajs/react";
import { useState } from "react";
import {
    ArrowRight,
    BarChart3,
    CheckCircle2,
    Clock3,
    FileText,
    Gauge,
    Kanban,
    Layers3,
    PlayCircle,
    Plus,
    Settings,
    ShieldCheck,
    Sparkles,
    Users,
    X,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AppUser = {
    created_at?: string | null;
    email?: string;
    last_login_at?: string | null;
    name?: string;
    onboarded_at?: string | null;
};

type HomePageProps = {
    showOnboarding?: boolean;
    user?: AppUser | null;
};

type Module = {
    description: string;
    gradient: string;
    href: string;
    icon: React.ElementType;
    id: string;
    metric: string;
    name: string;
    status: "available" | "soon";
};

const modules: Module[] = [
    {
        id: "workspaces",
        name: "Workspaces",
        description: "Board Kanban, backlog, sprints e tarefas no estilo Jira.",
        icon: Kanban,
        href: "/workspaces",
        status: "available",
        gradient: "from-blue-500 to-cyan-400",
        metric: "6 issues ativas",
    },
    {
        id: "analytics",
        name: "Analytics",
        description: "KPIs, relatórios e leitura de performance operacional.",
        icon: BarChart3,
        href: "#",
        status: "soon",
        gradient: "from-violet-500 to-fuchsia-400",
        metric: "Em preparação",
    },
    {
        id: "docs",
        name: "Documentos",
        description: "Base de conhecimento para processos, decisões e handoffs.",
        icon: FileText,
        href: "#",
        status: "soon",
        gradient: "from-emerald-500 to-teal-400",
        metric: "Em breve",
    },
    {
        id: "settings",
        name: "Configurações",
        description: "Perfil, preferências locais, segurança e tutorial do sistema.",
        icon: Settings,
        href: "/settings",
        status: "available",
        gradient: "from-slate-700 to-slate-500",
        metric: "Conta e app",
    },
];

const checklist = [
    "Acesse o Workspaces para organizar o sprint",
    "Revise seu perfil em Configurações",
    "Use o tutorial para entender o fluxo do sistema",
];

function formatDate(value?: string | null) {
    if (!value) {
        return "Não registrado";
    }

    return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
    }).format(new Date(value));
}

function WelcomeTutorial({
    onClose,
    open,
    user,
}: {
    onClose: () => void;
    open: boolean;
    user?: AppUser | null;
}) {
    if (!open) {
        return null;
    }

    const complete = (nextPath?: string) => {
        router.post(
            "/onboarding/complete",
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    onClose();

                    if (nextPath) {
                        router.visit(nextPath);
                    }
                },
            },
        );
    };

    return (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-background/80 p-4 backdrop-blur-xl">
            <div className="app-welcome-card relative w-full max-w-3xl overflow-hidden rounded-[2rem] border border-border bg-card shadow-2xl">
                <button
                    type="button"
                    onClick={() => complete()}
                    className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Fechar tutorial"
                >
                    <X className="h-4 w-4" />
                </button>

                <div
                    className="absolute inset-0 opacity-70"
                    style={{
                        background:
                            "radial-gradient(circle at 20% 18%, rgba(91,163,232,0.24), transparent 32%), radial-gradient(circle at 88% 8%, rgba(40,82,149,0.18), transparent 30%)",
                    }}
                />

                <div className="relative grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="flex min-h-[420px] flex-col justify-between bg-primary p-8 text-primary-foreground">
                        <div>
                            <div className="app-welcome-orb mb-8 flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-white/15">
                                <Sparkles className="h-9 w-9" />
                            </div>
                            <Badge className="mb-4 rounded-full bg-white/15 text-white" variant="secondary">
                                Primeiro acesso
                            </Badge>
                            <h2 className="max-w-sm text-4xl font-black leading-tight tracking-tight">
                                Bem-vindo ao Sapphire{user?.name ? `, ${user.name.split(" ")[0]}` : ""}.
                            </h2>
                            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
                                Esse guia rápido mostra onde começar e fica marcado no backend quando você conclui.
                            </p>
                        </div>
                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
                            Hub · Workspaces · Settings
                        </div>
                    </div>

                    <div className="space-y-5 p-8">
                        {[
                            {
                                icon: Layers3,
                                title: "Hub",
                                text: "Use o hub como ponto de partida para módulos, status e ações rápidas.",
                            },
                            {
                                icon: Kanban,
                                title: "Workspaces",
                                text: "Organize tarefas em backlog, sprint e colunas de execução.",
                            },
                            {
                                icon: Settings,
                                title: "Configurações",
                                text: "Atualize perfil, veja a sessão ativa e reabra esse tutorial quando quiser.",
                            },
                        ].map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <div key={step.title} className="flex gap-4 rounded-2xl border border-border/60 bg-background/80 p-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <div className="text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
                                            Passo {index + 1}
                                        </div>
                                        <h3 className="mt-1 text-sm font-black">{step.title}</h3>
                                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
                                    </div>
                                </div>
                            );
                        })}

                        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                            <Button type="button" className="flex-1" onClick={() => complete("/workspaces")}>
                                Abrir Workspaces
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                            <Button type="button" variant="outline" className="flex-1" onClick={() => complete()}>
                                Concluir tutorial
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function HomePage({ showOnboarding = false, user }: HomePageProps) {
    const [tutorialOpen, setTutorialOpen] = useState(showOnboarding);
    const firstName = user?.name?.split(" ")[0] ?? "Usuário";

    return (
        <DashboardLayout user={user ?? undefined} title="Hub">
            <WelcomeTutorial open={tutorialOpen} user={user} onClose={() => setTutorialOpen(false)} />

            <div className="mx-auto flex max-w-7xl flex-col gap-6">
                <section className="overflow-hidden rounded-[2rem] border border-border/70 bg-card shadow-sm">
                    <div className="relative p-6 sm:p-8">
                        <div
                            className="pointer-events-none absolute inset-0 opacity-80"
                            style={{
                                background:
                                    "radial-gradient(circle at 12% 16%, rgba(91,163,232,0.22), transparent 30%), radial-gradient(circle at 88% 8%, rgba(40,82,149,0.16), transparent 28%)",
                            }}
                        />

                        <div className="relative grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-end">
                            <div className="max-w-3xl space-y-5">
                                <Badge variant="secondary" className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                                    Operating hub
                                </Badge>
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                                        Olá, {firstName}. Seu workspace está pronto.
                                    </h1>
                                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        Centralize tarefas, módulos e configurações de conta em uma tela mais objetiva.
                                    </p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    <Button asChild>
                                        <Link href="/workspaces">
                                            Continuar no Workspaces
                                            <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => setTutorialOpen(true)}>
                                        <PlayCircle className="h-4 w-4" />
                                        Ver tutorial
                                    </Button>
                                </div>
                            </div>

                            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
                                {[
                                    { label: "Sessão", value: "Segura", icon: ShieldCheck },
                                    { label: "Último login", value: formatDate(user?.last_login_at), icon: Clock3 },
                                    { label: "Onboarding", value: user?.onboarded_at ? "Concluído" : "Pendente", icon: Gauge },
                                ].map((metric) => {
                                    const Icon = metric.icon;

                                    return (
                                        <div key={metric.label} className="rounded-2xl border border-border/60 bg-background/80 p-4 backdrop-blur">
                                            <div className="mb-2 flex items-center justify-between text-muted-foreground">
                                                <span className="text-xs font-bold uppercase tracking-wide">{metric.label}</span>
                                                <Icon className="h-4 w-4" />
                                            </div>
                                            <div className="text-sm font-black">{metric.value}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
                    <section className="grid gap-4 md:grid-cols-2">
                        {modules.map((mod) => {
                            const Icon = mod.icon;
                            const available = mod.status === "available";
                            const card = (
                                <div
                                    className={cn(
                                        "group h-full rounded-3xl border border-border/70 bg-card p-5 shadow-sm transition-all",
                                        available
                                            ? "hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                                            : "opacity-70",
                                    )}
                                >
                                    <div className="mb-5 flex items-start justify-between gap-4">
                                        <div className={cn("flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br text-white", mod.gradient)}>
                                            <Icon className="h-6 w-6" />
                                        </div>
                                        <Badge variant={available ? "secondary" : "outline"} className="rounded-full">
                                            {available ? "Disponível" : "Em breve"}
                                        </Badge>
                                    </div>
                                    <h2 className="text-lg font-black">{mod.name}</h2>
                                    <p className="mt-2 min-h-12 text-sm leading-relaxed text-muted-foreground">{mod.description}</p>
                                    <div className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                                        <span className="text-xs font-bold text-muted-foreground">{mod.metric}</span>
                                        {available && <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />}
                                    </div>
                                </div>
                            );

                            return available ? (
                                <Link key={mod.id} href={mod.href}>
                                    {card}
                                </Link>
                            ) : (
                                <div key={mod.id}>{card}</div>
                            );
                        })}
                    </section>

                    <aside className="space-y-6">
                        <section className="rounded-3xl border border-border/70 bg-card p-5 shadow-sm">
                            <div className="mb-4 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary" />
                                <h2 className="text-sm font-black">Próximas ações</h2>
                            </div>
                            <div className="space-y-3">
                                {checklist.map((item) => (
                                    <div key={item} className="flex gap-3 rounded-2xl bg-muted/40 p-3">
                                        <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                                        <span className="text-sm leading-relaxed text-muted-foreground">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-3xl border border-border/70 bg-card p-5 shadow-sm">
                            <div className="mb-4 flex items-center gap-2">
                                <Users className="h-4 w-4 text-primary" />
                                <h2 className="text-sm font-black">Resumo da conta</h2>
                            </div>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-muted-foreground">E-mail</span>
                                    <span className="truncate font-bold">{user?.email ?? "Não informado"}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-muted-foreground">Criada em</span>
                                    <span className="font-bold">{formatDate(user?.created_at)}</span>
                                </div>
                            </div>
                            <Button asChild variant="outline" className="mt-5 w-full">
                                <Link href="/settings">
                                    <Settings className="h-4 w-4" />
                                    Ajustar configurações
                                </Link>
                            </Button>
                        </section>

                        <section className="rounded-3xl border border-primary/15 bg-primary/5 p-5">
                            <div className="flex items-start gap-3">
                                <Plus className="mt-0.5 h-4 w-4 text-primary" />
                                <div>
                                    <h2 className="text-sm font-black">Atalho recomendado</h2>
                                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                        Crie uma issue no Workspaces e avance pelas colunas para validar o fluxo.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </aside>
                </div>
            </div>
        </DashboardLayout>
    );
}
