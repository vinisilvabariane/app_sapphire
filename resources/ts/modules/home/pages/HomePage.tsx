import { Link } from "@inertiajs/react";
import { Kanban, BarChart3, FileText, ArrowRight } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HomePageProps = {
    user?: {
        name?: string;
        email?: string;
    } | null;
};

type Module = {
    id: string;
    name: string;
    description: string;
    icon: React.ElementType;
    href: string;
    status: "available" | "soon";
    iconBg: string;
    iconColor: string;
};

const modules: Module[] = [
    {
        id: "workspaces",
        name: "Workspaces",
        description:
            "Gestão de tarefas e projetos no estilo Jira. Crie quadros kanban, organize sprints e acompanhe o progresso das equipes.",
        icon: Kanban,
        href: "/workspaces",
        status: "available",
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-500",
    },
    {
        id: "analytics",
        name: "Analytics",
        description:
            "Dashboards e relatórios de desempenho. Visualize métricas, acompanhe KPIs e tome decisões baseadas em dados.",
        icon: BarChart3,
        href: "#",
        status: "soon",
        iconBg: "bg-violet-500/10",
        iconColor: "text-violet-500",
    },
    {
        id: "docs",
        name: "Documentos",
        description:
            "Base de conhecimento centralizada. Crie, edite e compartilhe documentação de forma colaborativa com sua equipe.",
        icon: FileText,
        href: "#",
        status: "soon",
        iconBg: "bg-emerald-500/10",
        iconColor: "text-emerald-500",
    },
];

export default function HomePage({ user }: HomePageProps) {
    const firstName = user?.name?.split(" ")[0] ?? null;

    return (
        <DashboardLayout user={user ?? undefined} title="Hub">
            <div className="max-w-5xl mx-auto">
                {/* Welcome */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold tracking-tight">
                        {firstName ? `Olá, ${firstName} 👋` : "Bem-vindo ao Sapphire"}
                    </h1>
                    <p className="text-muted-foreground mt-1 text-sm">
                        Selecione um módulo para começar.
                    </p>
                </div>

                {/* Module grid */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {modules.map((mod) => {
                        const Icon = mod.icon;
                        const available = mod.status === "available";
                        return (
                            <Card
                                key={mod.id}
                                className={cn(
                                    "group flex flex-col transition-shadow",
                                    available
                                        ? "hover:shadow-md cursor-pointer"
                                        : "opacity-60",
                                )}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div
                                            className={cn(
                                                "p-2.5 rounded-lg",
                                                mod.iconBg,
                                            )}
                                        >
                                            <Icon
                                                className={cn(
                                                    "h-5 w-5",
                                                    mod.iconColor,
                                                )}
                                            />
                                        </div>
                                        {!available && (
                                            <Badge
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                Em breve
                                            </Badge>
                                        )}
                                    </div>
                                    <CardTitle className="text-base mt-3">
                                        {mod.name}
                                    </CardTitle>
                                    <CardDescription className="text-sm leading-relaxed">
                                        {mod.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-0 mt-auto">
                                    {available ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            asChild
                                            className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors"
                                        >
                                            <Link href={mod.href}>
                                                Acessar
                                                <ArrowRight className="ml-2 h-3.5 w-3.5" />
                                            </Link>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            disabled
                                            className="w-full"
                                        >
                                            Disponível em breve
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </DashboardLayout>
    );
}
