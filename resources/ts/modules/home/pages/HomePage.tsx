import { Link, router } from "@inertiajs/react";
import { useState, type ElementType } from "react";
import { ArrowRight, BarChart3, FileText, Kanban, X } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type AppUser = {
    created_at?: string | null;
    email?: string;
    last_login_at?: string | null;
    name?: string;
    onboarded_at?: string | null;
    show_tutorial?: boolean;
};

type HomePageProps = {
    showTutorial?: boolean;
    user?: AppUser | null;
};

type HubCategory = "all" | "projects" | "analytics" | "knowledge";

type HubCard = {
    category: Exclude<HubCategory, "all">;
    description: string;
    href: string;
    icon: ElementType;
    label?: string;
    name: string;
    status: "available" | "soon";
    tone: {
        accent: string;
        icon: string;
    };
};

const hubFilters: Array<{ id: HubCategory; label: string }> = [
    { id: "all", label: "Todos" },
    { id: "projects", label: "Projetos" },
    { id: "analytics", label: "Indicadores" },
    { id: "knowledge", label: "Conhecimento" },
];

const hubCards: HubCard[] = [
    {
        category: "projects",
        name: "Workspaces",
        description: "Quadros, backlog e tarefas do time.",
        href: "/workspaces",
        icon: Kanban,
        label: "Abrir",
        status: "available",
        tone: {
            accent: "bg-emerald-500",
            icon: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
        },
    },
    {
        category: "analytics",
        name: "Analytics",
        description: "Indicadores e relatórios operacionais.",
        href: "#",
        icon: BarChart3,
        status: "soon",
        tone: {
            accent: "bg-amber-500",
            icon: "bg-amber-500/12 text-amber-700 dark:text-amber-300",
        },
    },
    {
        category: "knowledge",
        name: "Documentos",
        description: "Gere documentação de software com modelos guiados.",
        href: "/documentos",
        icon: FileText,
        label: "Criar",
        status: "available",
        tone: {
            accent: "bg-violet-500",
            icon: "bg-violet-500/12 text-violet-700 dark:text-violet-300",
        },
    },
];

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
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
            <Card className="relative w-full max-w-lg gap-0 overflow-hidden rounded-lg">
                <button
                    type="button"
                    onClick={() => complete()}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    aria-label="Fechar tutorial"
                >
                    <X className="h-4 w-4" />
                </button>

                <CardHeader className="pr-14">
                    <Badge variant="secondary" className="mb-3 w-fit rounded-lg">
                        Primeiro acesso
                    </Badge>
                    <CardTitle className="text-2xl">
                        Bem-vindo{user?.name ? `, ${user.name.split(" ")[0]}` : ""}.
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                        Este hub reúne os atalhos principais do Sapphire. Cada card
                        abre um módulo ou indica uma área que ainda será liberada.
                    </p>

                    <div className="grid gap-3">
                        {hubCards.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div key={item.name} className="flex gap-3 rounded-lg border p-3">
                                    <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", item.tone.icon)}>
                                        <Icon className="h-4 w-4" />
                                    </span>
                                    <div>
                                        <p className="text-sm font-medium">{item.name}</p>
                                        <p className="text-sm leading-relaxed text-muted-foreground">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                        <Button type="button" onClick={() => complete("/workspaces")}>
                            Abrir Workspaces
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                        <Button type="button" variant="outline" onClick={() => complete()}>
                            Concluir
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function HubModuleCard({ item }: { item: HubCard }) {
    const Icon = item.icon;
    const available = item.status === "available";

    const content = (
        <Card
            className={cn(
                "relative h-full gap-0 overflow-hidden rounded-lg transition-colors",
                available ? "hover:border-primary/40 hover:bg-muted/20" : "opacity-70",
            )}
        >
            <span className={cn("absolute inset-x-0 top-0 h-1", item.tone.accent)} />
            <CardContent className="flex h-full flex-col p-5">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <span className={cn("flex h-10 w-10 items-center justify-center rounded-lg", item.tone.icon)}>
                        <Icon className="h-5 w-5" />
                    </span>
                    <Badge variant={available ? "secondary" : "outline"} className="rounded-lg">
                        {available ? item.label : "Em breve"}
                    </Badge>
                </div>

                <div className="min-h-24">
                    <h2 className="text-base font-semibold">{item.name}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.description}
                    </p>
                </div>

                <div className="mt-auto flex items-center justify-between border-t pt-4 text-sm font-medium">
                    <span>{available ? "Acessar módulo" : "Indisponível"}</span>
                    {available && <ArrowRight className="h-4 w-4" />}
                </div>
            </CardContent>
        </Card>
    );

    if (!available) {
        return content;
    }

    return (
        <Link href={item.href} className="block h-full">
            {content}
        </Link>
    );
}

export default function HomePage({ showTutorial = false, user }: HomePageProps) {
    const [tutorialOpen, setTutorialOpen] = useState(showTutorial || user?.show_tutorial === true);
    const [activeFilter, setActiveFilter] = useState<HubCategory>("all");
    const firstName = user?.name?.split(" ")[0] ?? "Usuário";
    const visibleCards = activeFilter === "all"
        ? hubCards
        : hubCards.filter((item) => item.category === activeFilter);

    return (
        <DashboardLayout user={user ?? undefined} title="Hub">
            <WelcomeTutorial open={tutorialOpen} user={user} onClose={() => setTutorialOpen(false)} />

            <div className="mx-auto flex max-w-6xl flex-col gap-6">
                <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Sapphire OS</p>
                        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
                            Olá, {firstName}
                        </h1>
                    </div>
                </section>

                <section className="flex flex-wrap gap-2">
                    {hubFilters.map((filter) => {
                        const active = filter.id === activeFilter;
                        const count = filter.id === "all"
                            ? hubCards.length
                            : hubCards.filter((item) => item.category === filter.id).length;

                        return (
                            <button
                                key={filter.id}
                                type="button"
                                onClick={() => setActiveFilter(filter.id)}
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
                                    active
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
                                )}
                                aria-pressed={active}
                            >
                                {filter.label}
                                <span
                                    className={cn(
                                        "rounded-lg px-1.5 py-0.5 text-[11px]",
                                        active ? "bg-primary-foreground/15" : "bg-muted text-muted-foreground",
                                    )}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </section>

                <section className="grid gap-4 md:grid-cols-3">
                    {visibleCards.map((item) => (
                        <HubModuleCard key={item.name} item={item} />
                    ))}
                </section>
            </div>
        </DashboardLayout>
    );
}
