import { useState, type DragEvent } from "react";
import { AlertTriangle, ArrowRight, CheckCircle2, CircleDot, ClipboardList, Search, Timer } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type AppUser = {
    email?: string;
    last_login_at?: string | null;
    name?: string;
    onboarded_at?: string | null;
    show_tutorial?: boolean;
};

type WorkspacesPageProps = {
    user?: AppUser | null;
};

type IssueStatus = "todo" | "progress" | "review" | "done";
type IssuePriority = "Alta" | "Media" | "Baixa";

type Issue = {
    assignee: string;
    description: string;
    id: string;
    key: string;
    points: number;
    priority: IssuePriority;
    status: IssueStatus;
    title: string;
};

const columns: Array<{
    accent: string;
    icon: React.ElementType;
    id: IssueStatus;
    title: string;
}> = [
    { id: "todo", title: "A fazer", icon: ClipboardList, accent: "bg-slate-500" },
    { id: "progress", title: "Em andamento", icon: Timer, accent: "bg-blue-500" },
    { id: "review", title: "Revisão", icon: Search, accent: "bg-amber-500" },
    { id: "done", title: "Concluído", icon: CheckCircle2, accent: "bg-emerald-500" },
];

const initialIssues: Issue[] = [
    {
        id: "issue-1",
        key: "SAP-24",
        title: "Criar board Kanban",
        description: "Organizar colunas, cards e fluxo de status para o time.",
        priority: "Alta",
        status: "progress",
        assignee: "Vini",
        points: 8,
    },
    {
        id: "issue-2",
        key: "SAP-25",
        title: "Priorizar backlog",
        description: "Separar tarefas que entram no sprint atual.",
        priority: "Media",
        status: "todo",
        assignee: "Ana",
        points: 5,
    },
    {
        id: "issue-3",
        key: "SAP-26",
        title: "Validar login JWT",
        description: "Garantir cookie, rota protegida e redirecionamento pós-login.",
        priority: "Alta",
        status: "done",
        assignee: "Rafa",
        points: 3,
    },
    {
        id: "issue-4",
        key: "SAP-27",
        title: "Revisar experiência do hub",
        description: "Melhorar módulos, atalhos e onboarding inicial.",
        priority: "Baixa",
        status: "review",
        assignee: "Clara",
        points: 2,
    },
];

const statusOrder: IssueStatus[] = ["todo", "progress", "review", "done"];

const priorityStyles: Record<IssuePriority, string> = {
    Alta: "text-red-600 dark:text-red-400",
    Media: "text-amber-600 dark:text-amber-400",
    Baixa: "text-emerald-600 dark:text-emerald-400",
};

function nextStatus(status: IssueStatus) {
    return statusOrder[Math.min(statusOrder.indexOf(status) + 1, statusOrder.length - 1)];
}

export default function WorkspacesPage({ user }: WorkspacesPageProps) {
    const [draggingIssueId, setDraggingIssueId] = useState<string | null>(null);
    const [issues, setIssues] = useState(initialIssues);
    const [search, setSearch] = useState("");

    const filteredIssues = issues.filter((issue) =>
        [issue.key, issue.title, issue.description, issue.assignee]
            .join(" ")
            .toLowerCase()
            .includes(search.trim().toLowerCase()),
    );
    const doneIssues = issues.filter((issue) => issue.status === "done").length;
    const completion = Math.round((doneIssues / issues.length) * 100);

    const moveIssue = (issueId: string, status: IssueStatus) => {
        setIssues((currentIssues) =>
            currentIssues.map((issue) => (issue.id === issueId ? { ...issue, status } : issue)),
        );
    };

    const handleDragStart = (event: DragEvent<HTMLElement>, issueId: string) => {
        event.dataTransfer.effectAllowed = "move";
        event.dataTransfer.setData("text/plain", issueId);
        setDraggingIssueId(issueId);
    };

    const handleDrop = (event: DragEvent<HTMLElement>, status: IssueStatus) => {
        event.preventDefault();
        const issueId = event.dataTransfer.getData("text/plain") || draggingIssueId;

        if (issueId) {
            moveIssue(issueId, status);
        }

        setDraggingIssueId(null);
    };

    return (
        <DashboardLayout user={user ?? undefined} title="Workspaces">
            <div className="mx-auto flex max-w-7xl flex-col gap-6">
                <section className="rounded-lg border border-border/70 bg-card p-6 shadow-sm sm:p-8">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl space-y-3">
                            <Badge variant="secondary" className="w-fit rounded-lg bg-primary/10 px-3 py-1 text-primary">
                                SAP-BOARD
                            </Badge>
                            <h1 className="text-3xl font-black tracking-tight">Sprint Sapphire Core</h1>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                Um board simples no estilo Jira para acompanhar backlog, execução, revisão e entrega.
                            </p>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3 lg:min-w-[520px]">
                            {[
                                ["Conclusão", `${completion}%`],
                                ["Issues", issues.length],
                                ["Alta prioridade", issues.filter((issue) => issue.priority === "Alta" && issue.status !== "done").length],
                            ].map(([label, value]) => (
                                <div key={label} className="rounded-lg border border-border/60 bg-background p-4">
                                    <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</span>
                                    <div className="mt-2 text-2xl font-black">{value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="rounded-lg border border-border/70 bg-card p-4 shadow-sm">
                    <div className="mb-4 flex flex-col gap-3 px-1 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-base font-black">Board do sprint</h2>
                            <p className="text-xs text-muted-foreground">Arraste cards entre colunas ou use o botão Avançar.</p>
                        </div>
                        <div className="relative sm:w-80">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar issue" className="pl-9" />
                        </div>
                    </div>

                    <div className="grid gap-4 overflow-x-auto pb-2 xl:grid-cols-4">
                        {columns.map((column) => {
                            const Icon = column.icon;
                            const columnIssues = filteredIssues.filter((issue) => issue.status === column.id);

                            return (
                                <div
                                    key={column.id}
                                    onDragOver={(event) => event.preventDefault()}
                                    onDrop={(event) => handleDrop(event, column.id)}
                                    className={cn(
                                        "min-h-[520px] min-w-[280px] rounded-lg border border-border/60 bg-muted/30 p-3 transition-colors",
                                        draggingIssueId && "border-primary/30 bg-primary/5",
                                    )}
                                >
                                    <div className="mb-3 flex items-center justify-between rounded-lg bg-background p-3">
                                        <div className="flex items-center gap-3">
                                            <span className={cn("h-2.5 w-2.5 rounded-lg", column.accent)} />
                                            <Icon className="h-4 w-4 text-muted-foreground" />
                                            <h3 className="text-sm font-black">{column.title}</h3>
                                        </div>
                                        <span className="rounded-lg bg-muted px-2 py-0.5 text-xs font-black">{columnIssues.length}</span>
                                    </div>

                                    <div className="space-y-3">
                                        {columnIssues.map((issue) => (
                                            <article
                                                key={issue.id}
                                                draggable
                                                onDragEnd={() => setDraggingIssueId(null)}
                                                onDragStart={(event) => handleDragStart(event, issue.id)}
                                                className="rounded-lg border border-border/70 bg-background p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                                            >
                                                <div className="mb-3 flex items-start justify-between gap-3">
                                                    <div>
                                                        <span className="text-xs font-black text-primary">{issue.key}</span>
                                                        <h3 className="mt-1 text-sm font-black leading-snug">{issue.title}</h3>
                                                    </div>
                                                    <AlertTriangle className={cn("h-4 w-4 shrink-0", priorityStyles[issue.priority])} />
                                                </div>
                                                <p className="text-xs leading-relaxed text-muted-foreground">{issue.description}</p>
                                                <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-xs">
                                                    <span className="font-bold text-muted-foreground">{issue.assignee}</span>
                                                    <span className="flex items-center gap-1 font-black">
                                                        <CircleDot className="h-3.5 w-3.5 text-primary" />
                                                        {issue.points} pts
                                                    </span>
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="mt-3 h-8 w-full text-xs"
                                                    disabled={issue.status === "done"}
                                                    onClick={() => moveIssue(issue.id, nextStatus(issue.status))}
                                                >
                                                    Avançar
                                                    <ArrowRight className="h-3 w-3" />
                                                </Button>
                                            </article>
                                        ))}

                                        {columnIssues.length === 0 && (
                                            <div className="rounded-lg border border-dashed border-border/80 p-6 text-center text-xs text-muted-foreground">
                                                Solte uma issue aqui.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </DashboardLayout>
    );
}
