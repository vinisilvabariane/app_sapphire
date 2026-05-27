import { useEffect, useMemo, useState } from "react";
import {
    ArrowLeft,
    Boxes,
    Check,
    Clipboard,
    Download,
    FileText,
    Folder,
    FolderOpen,
    FolderPlus,
    GripVertical,
    Home,
    ImagePlus,
    Pencil,
    Plus,
    Search,
    Trash2,
} from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type AppUser = {
    email?: string;
    last_login_at?: string | null;
    name?: string;
    onboarded_at?: string | null;
    show_tutorial?: boolean;
};

type DocsPageProps = {
    user?: AppUser | null;
};

type DocNodeType = "project" | "folder" | "doc";
type DocTemplate = "backend" | "frontend" | "api" | "architecture" | "runbook";
type CreateKind = "project" | "folder" | "doc";

type DocNode = {
    content?: string;
    id: string;
    images?: string[];
    parentId: string | null;
    template?: DocTemplate;
    title: string;
    type: DocNodeType;
};

const storageKey = "sapphire-docs-workspace";

const templateLabels: Record<DocTemplate, string> = {
    backend: "Backend",
    frontend: "Frontend",
    api: "API",
    architecture: "Arquitetura",
    runbook: "Runbook",
};

const typeLabels: Record<DocNodeType, string> = {
    project: "Projeto",
    folder: "Pasta",
    doc: "Documento",
};

const nodeVisuals: Record<DocNodeType, {
    accent: string;
    badge: string;
    border: string;
    card: string;
    icon: string;
    iconWrap: string;
}> = {
    project: {
        accent: "bg-sky-500",
        badge: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
        border: "hover:border-sky-500/60 hover:ring-sky-500/20",
        card: "bg-sky-500/[0.035]",
        icon: "text-sky-700 dark:text-sky-300",
        iconWrap: "bg-sky-500/12",
    },
    folder: {
        accent: "bg-emerald-500",
        badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
        border: "hover:border-emerald-500/60 hover:ring-emerald-500/20",
        card: "bg-emerald-500/[0.035]",
        icon: "text-emerald-700 dark:text-emerald-300",
        iconWrap: "bg-emerald-500/12",
    },
    doc: {
        accent: "bg-violet-500",
        badge: "border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300",
        border: "hover:border-violet-500/60 hover:ring-violet-500/20",
        card: "bg-violet-500/[0.035]",
        icon: "text-violet-700 dark:text-violet-300",
        iconWrap: "bg-violet-500/12",
    },
};

const templateContent: Record<DocTemplate, string> = {
    backend:
        "# Backend\n\n## Responsabilidade\nDescreva o papel do backend neste módulo.\n\n## Fluxos\n- Entrada de dados\n- Validações\n- Persistência\n- Retorno para o cliente\n\n## Regras de negócio\n- Regra 1\n- Regra 2\n",
    frontend:
        "# Frontend\n\n## Objetivo da tela\nDescreva o objetivo da interface.\n\n## Estados\n- Carregando\n- Vazio\n- Erro\n- Sucesso\n\n## Componentes\n- Componente principal\n- Formulários\n- Listagens\n",
    api:
        "# API\n\n## Endpoints\n| Método | Rota | Descrição |\n| --- | --- | --- |\n| GET | /exemplo | Lista registros |\n\n## Payload\n```json\n{\n  \"name\": \"Exemplo\"\n}\n```\n",
    architecture:
        "# Arquitetura\n\n## Contexto\nExplique o problema e o escopo técnico.\n\n## Componentes\n- Frontend\n- Backend\n- Banco de dados\n- Serviços externos\n\n## Decisões\n- Decisão técnica\n- Trade-off aceito\n",
    runbook:
        "# Runbook\n\n## Quando usar\nDescreva o cenário operacional.\n\n## Procedimento\n1. Verificar status da aplicação.\n2. Conferir logs.\n3. Executar ação corretiva.\n\n## Rollback\nDefina como voltar ao estado anterior.\n",
};

const seedNodes: DocNode[] = [
    { id: "project-access", parentId: null, title: "Teste", type: "project" },
    { id: "folder-access", parentId: "project-access", title: "Módulo Access Control", type: "folder" },
    {
        content: templateContent.backend,
        id: "doc-backend",
        images: [],
        parentId: "folder-access",
        template: "backend",
        title: "Backend",
        type: "doc",
    },
    {
        content: templateContent.frontend,
        id: "doc-frontend",
        images: [],
        parentId: "folder-access",
        template: "frontend",
        title: "Frontend",
        type: "doc",
    },
];

function createId(prefix: string) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function isContainer(node?: DocNode) {
    return node?.type === "project" || node?.type === "folder";
}

function sortNodes(nodes: DocNode[]) {
    const order: Record<DocNodeType, number> = { project: 0, folder: 1, doc: 2 };
    return [...nodes].sort((a, b) => order[a.type] - order[b.type] || a.title.localeCompare(b.title));
}

function buildBreadcrumb(nodes: DocNode[], selectedId: string | null) {
    const path: DocNode[] = [];
    let current = nodes.find((node) => node.id === selectedId);

    while (current) {
        path.unshift(current);
        current = nodes.find((node) => node.id === current?.parentId);
    }

    return path;
}

function getDescendantIds(nodes: DocNode[], parentId: string): string[] {
    const children = nodes.filter((node) => node.parentId === parentId);
    return children.flatMap((child) => [child.id, ...getDescendantIds(nodes, child.id)]);
}

function createMarkdown(document: DocNode) {
    const imageBlock = (document.images ?? []).map((image) => `![Imagem](${image})`).join("\n\n");
    return [imageBlock, document.content ?? ""].filter(Boolean).join("\n\n");
}

function NodeIcon({ node, open }: { node: DocNode; open?: boolean }) {
    const visual = nodeVisuals[node.type];

    if (node.type === "doc") {
        return (
            <span className={cn("flex h-12 w-12 items-center justify-center rounded-lg", visual.iconWrap)}>
                <FileText className={cn("h-6 w-6", visual.icon)} />
            </span>
        );
    }

    if (node.type === "project") {
        return (
            <span className={cn("flex h-12 w-12 items-center justify-center rounded-lg", visual.iconWrap)}>
                <Boxes className={cn("h-7 w-7", visual.icon)} />
            </span>
        );
    }

    return open ? (
        <span className={cn("flex h-12 w-12 items-center justify-center rounded-lg", visual.iconWrap)}>
            <FolderOpen className={cn("h-7 w-7", visual.icon)} />
        </span>
    ) : (
        <span className={cn("flex h-12 w-12 items-center justify-center rounded-lg", visual.iconWrap)}>
            <Folder className={cn("h-7 w-7", visual.icon)} />
        </span>
    );
}

export default function DocsPage({ user }: DocsPageProps) {
    const [nodes, setNodes] = useState<DocNode[]>(() => {
        if (typeof window === "undefined") {
            return seedNodes;
        }

        const saved = window.localStorage.getItem(storageKey);

        try {
            return saved ? (JSON.parse(saved) as DocNode[]) : seedNodes;
        } catch {
            return seedNodes;
        }
    });
    const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
    const [openDocumentId, setOpenDocumentId] = useState<string | null>(null);
    const [createKind, setCreateKind] = useState<CreateKind>("doc");
    const [newTitle, setNewTitle] = useState("");
    const [docTemplate, setDocTemplate] = useState<DocTemplate>("backend");
    const [query, setQuery] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [copied, setCopied] = useState(false);
    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOverId, setDragOverId] = useState<string | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingTitle, setEditingTitle] = useState("");

    useEffect(() => {
        window.localStorage.setItem(storageKey, JSON.stringify(nodes));
    }, [nodes]);

    const currentFolder = nodes.find((node) => node.id === currentFolderId);
    const openDocument = nodes.find((node) => node.id === openDocumentId && node.type === "doc");
    const breadcrumb = buildBreadcrumb(nodes, currentFolderId);
    const visibleItems = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (normalizedQuery) {
            return sortNodes(nodes.filter((node) => node.title.toLowerCase().includes(normalizedQuery)));
        }

        return sortNodes(nodes.filter((node) => node.parentId === currentFolderId));
    }, [currentFolderId, nodes, query]);

    const updateNode = (id: string, updates: Partial<DocNode>) => {
        setNodes((current) => current.map((node) => (node.id === id ? { ...node, ...updates } : node)));
    };

    const startEditing = (node: DocNode) => {
        setEditingId(node.id);
        setEditingTitle(node.title);
    };

    const saveEditing = () => {
        const title = editingTitle.trim();

        if (editingId && title) {
            updateNode(editingId, { title });
        }

        setEditingId(null);
        setEditingTitle("");
    };

    const deleteNode = (node: DocNode) => {
        const relatedIds = [node.id, ...getDescendantIds(nodes, node.id)];

        setNodes((current) => current.filter((item) => !relatedIds.includes(item.id)));

        if (currentFolderId && relatedIds.includes(currentFolderId)) {
            setCurrentFolderId(node.parentId);
        }

        if (openDocumentId && relatedIds.includes(openDocumentId)) {
            setOpenDocumentId(null);
        }
    };

    const createNode = () => {
        const title = newTitle.trim();
        if (!title) {
            return;
        }

        const node: DocNode = {
            id: createId(createKind),
            images: createKind === "doc" ? [] : undefined,
            parentId: createKind === "project" ? null : currentFolderId,
            title,
            type: createKind,
            ...(createKind === "doc" ? { content: templateContent[docTemplate], template: docTemplate } : {}),
        };

        setNodes((current) => [...current, node]);
        setNewTitle("");

        if (node.type === "doc") {
            setOpenDocumentId(node.id);
            return;
        }

        setCurrentFolderId(node.id);
    };

    const moveNode = (draggedId: string, targetId: string) => {
        if (!draggedId || draggedId === targetId) {
            return;
        }

        const dragged = nodes.find((node) => node.id === draggedId);
        const target = nodes.find((node) => node.id === targetId);

        if (!dragged || !isContainer(target) || getDescendantIds(nodes, draggedId).includes(targetId)) {
            return;
        }

        setNodes((current) => current.map((node) => (node.id === draggedId ? { ...node, parentId: targetId } : node)));
    };

    const canReceiveDrop = (target: DocNode) => {
        if (!draggingId || draggingId === target.id || !isContainer(target)) {
            return false;
        }

        return !getDescendantIds(nodes, draggingId).includes(target.id);
    };

    const openNode = (node: DocNode) => {
        if (node.type === "doc") {
            setOpenDocumentId(node.id);
            return;
        }

        setCurrentFolderId(node.id);
        setQuery("");
    };

    const goBack = () => {
        if (!currentFolder) {
            return;
        }

        setCurrentFolderId(currentFolder.parentId);
        setQuery("");
    };

    const addImage = () => {
        const url = imageUrl.trim();
        if (!openDocument || !url) {
            return;
        }

        updateNode(openDocument.id, { images: [...(openDocument.images ?? []), url] });
        setImageUrl("");
    };

    const removeImage = (url: string) => {
        if (!openDocument) {
            return;
        }

        updateNode(openDocument.id, { images: (openDocument.images ?? []).filter((image) => image !== url) });
    };

    const copyMarkdown = async () => {
        if (!openDocument) {
            return;
        }

        await navigator.clipboard.writeText(createMarkdown(openDocument));
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1400);
    };

    const downloadMarkdown = () => {
        if (!openDocument) {
            return;
        }

        const blob = new Blob([createMarkdown(openDocument)], { type: "text/markdown;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${openDocument.title || "documentacao"}.md`;
        link.click();
        URL.revokeObjectURL(url);
    };

    if (openDocument) {
        return (
            <DashboardLayout user={user ?? undefined} title="Documentos">
                <div className="mx-auto flex max-w-6xl flex-col gap-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Button type="button" variant="outline" size="sm" onClick={() => setOpenDocumentId(null)}>
                            <ArrowLeft className="h-4 w-4" />
                            Voltar
                        </Button>

                        <div className="flex flex-wrap gap-2">
                            <Button type="button" variant="outline" size="sm" onClick={copyMarkdown}>
                                {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                                {copied ? "Copiado" : "Copiar"}
                            </Button>
                            <Button type="button" size="sm" onClick={downloadMarkdown}>
                                <Download className="h-4 w-4" />
                                Baixar
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                            <button type="button" onClick={() => setCurrentFolderId(null)} className="hover:text-foreground">
                                Documentos
                            </button>
                            {buildBreadcrumb(nodes, openDocument.parentId).map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => {
                                        setOpenDocumentId(null);
                                        setCurrentFolderId(item.id);
                                    }}
                                    className="hover:text-foreground"
                                >
                                    <span className="mx-1">/</span>
                                    {item.title}
                                </button>
                            ))}
                        </div>

                        <Input
                            value={openDocument.title}
                            onChange={(event) => updateNode(openDocument.id, { title: event.target.value })}
                            className="h-auto border-0 px-0 text-3xl font-semibold shadow-none focus-visible:ring-0"
                        />
                    </div>

                    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                        <div className="space-y-3">
                            <Label htmlFor="doc-content">Conteúdo</Label>
                            <textarea
                                id="doc-content"
                                value={openDocument.content ?? ""}
                                onChange={(event) => updateNode(openDocument.id, { content: event.target.value })}
                                className="min-h-[520px] w-full rounded-lg border border-input bg-background p-4 text-sm leading-relaxed outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                placeholder="Escreva a documentação aqui..."
                            />
                        </div>

                        <aside className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="image-url">Imagens</Label>
                                <div className="flex gap-2">
                                    <Input
                                        id="image-url"
                                        value={imageUrl}
                                        onChange={(event) => setImageUrl(event.target.value)}
                                        placeholder="URL da imagem"
                                    />
                                    <Button type="button" size="icon" onClick={addImage} aria-label="Adicionar imagem">
                                        <ImagePlus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="grid gap-3">
                                {(openDocument.images ?? []).map((image) => (
                                    <figure key={image} className="overflow-hidden rounded-lg border bg-background">
                                        <img src={image} alt="" className="h-40 w-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(image)}
                                            className="w-full px-3 py-2 text-left text-xs text-muted-foreground hover:text-destructive"
                                        >
                                            Remover imagem
                                        </button>
                                    </figure>
                                ))}

                                {(openDocument.images ?? []).length === 0 && (
                                    <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
                                        Adicione imagens por URL para complementar o documento.
                                    </div>
                                )}
                            </div>
                        </aside>
                    </section>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout user={user ?? undefined} title="Documentos">
            <div className="mx-auto flex max-w-7xl flex-col gap-6">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold">Documentos</h1>
                        <p className="text-sm text-muted-foreground">
                            Organize projetos, pastas e documentos em uma grade simples.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <Button
                            type="button"
                            variant={createKind === "project" ? "default" : "outline"}
                            onClick={() => setCreateKind("project")}
                        >
                            <Plus className="h-4 w-4" />
                            Projeto
                        </Button>
                        <Button
                            type="button"
                            variant={createKind === "folder" ? "default" : "outline"}
                            onClick={() => setCreateKind("folder")}
                        >
                            <FolderPlus className="h-4 w-4" />
                            Pasta
                        </Button>
                        <Button
                            type="button"
                            variant={createKind === "doc" ? "default" : "outline"}
                            onClick={() => setCreateKind("doc")}
                        >
                            <FileText className="h-4 w-4" />
                            Documento
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-3 rounded-lg border bg-background p-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                        <Button type="button" variant="outline" size="sm" onClick={() => setCurrentFolderId(null)}>
                            <Home className="h-4 w-4" />
                            Início
                        </Button>
                        {currentFolder && (
                            <Button type="button" variant="outline" size="sm" onClick={goBack}>
                                <ArrowLeft className="h-4 w-4" />
                                Voltar
                            </Button>
                        )}
                        <div className="flex flex-wrap items-center gap-1 text-muted-foreground">
                            {breadcrumb.length === 0 ? (
                                <span>Raiz dos projetos</span>
                            ) : (
                                breadcrumb.map((item, index) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setCurrentFolderId(item.id)}
                                        className="rounded-lg px-2 py-1 hover:bg-muted hover:text-foreground"
                                    >
                                        {index > 0 && <span className="mr-2 text-muted-foreground">/</span>}
                                        {item.title}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>
                    {currentFolder && (
                        <Badge variant="secondary" className="w-fit rounded-lg">
                            {typeLabels[currentFolder.type]} aberto
                        </Badge>
                    )}
                </div>

                <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)]">
                    <div className="relative">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            className="pl-9"
                            placeholder="Buscar projeto, pasta ou documento"
                        />
                    </div>

                    <div className="grid gap-2 sm:grid-cols-[1fr_150px_auto]">
                        <Input
                            value={newTitle}
                            onChange={(event) => setNewTitle(event.target.value)}
                            placeholder={`Nome do ${createKind === "project" ? "projeto" : createKind === "folder" ? "pasta" : "documento"}`}
                        />
                        {createKind === "doc" ? (
                            <select
                                value={docTemplate}
                                onChange={(event) => setDocTemplate(event.target.value as DocTemplate)}
                                className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
                            >
                                {Object.entries(templateLabels).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <div className="hidden sm:block" />
                        )}
                        <Button type="button" onClick={createNode}>
                            Criar
                        </Button>
                    </div>
                </div>

                <section className="flex flex-wrap gap-4">
                    {visibleItems.map((node) => {
                        const childCount = nodes.filter((item) => item.parentId === node.id).length;
                        const visual = nodeVisuals[node.type];
                        const receivingDrop = dragOverId === node.id && canReceiveDrop(node);
                        const beingDragged = draggingId === node.id;
                        const editing = editingId === node.id;

                        return (
                            <div
                                key={node.id}
                                draggable
                                onDragStart={(event) => {
                                    event.dataTransfer.effectAllowed = "move";
                                    event.dataTransfer.setData("text/plain", node.id);
                                    setDraggingId(node.id);
                                }}
                                onDragEnd={() => {
                                    setDraggingId(null);
                                    setDragOverId(null);
                                }}
                                onDragEnter={(event) => {
                                    if (canReceiveDrop(node)) {
                                        event.preventDefault();
                                        setDragOverId(node.id);
                                    }
                                }}
                                onDragOver={(event) => {
                                    if (canReceiveDrop(node)) {
                                        event.preventDefault();
                                        event.dataTransfer.dropEffect = "move";
                                        setDragOverId(node.id);
                                    }
                                }}
                                onDragLeave={(event) => {
                                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                                        setDragOverId((current) => (current === node.id ? null : current));
                                    }
                                }}
                                onDrop={(event) => {
                                    if (!canReceiveDrop(node)) {
                                        return;
                                    }

                                    event.preventDefault();
                                    moveNode(event.dataTransfer.getData("text/plain"), node.id);
                                    setDraggingId(null);
                                    setDragOverId(null);
                                }}
                                className={cn(
                                    "group relative flex flex-col justify-between overflow-hidden rounded-lg border p-4 text-left",
                                    "transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-lg hover:ring-4",
                                    visual.card,
                                    visual.border,
                                    node.type !== "doc" && "cursor-pointer",
                                    node.type === "doc" ? "min-h-34 w-full sm:w-[210px]" : "min-h-44 w-full sm:w-[270px]",
                                    receivingDrop && "scale-[1.025] border-primary bg-primary/10 shadow-xl ring-4 ring-primary/20",
                                    beingDragged && "scale-[0.98] opacity-45",
                                )}
                            >
                                <span className={cn("absolute inset-x-0 top-0 h-1", visual.accent)} />
                                {node.type === "doc" && (
                                    <span className="absolute right-0 top-1 h-8 w-8 rounded-bl-lg border-b border-l bg-background/80" />
                                )}
                                {receivingDrop && (
                                    <span className="absolute inset-2 z-10 flex items-center justify-center rounded-lg border border-dashed border-primary bg-background/85 text-xs font-black text-primary backdrop-blur-sm">
                                        Soltar aqui
                                    </span>
                                )}

                                <span className="flex items-start justify-between gap-3">
                                    <button
                                        type="button"
                                        onClick={() => openNode(node)}
                                        className="flex min-w-0 flex-1 items-center gap-3 text-left"
                                    >
                                        <NodeIcon node={node} open={receivingDrop} />
                                        {isContainer(node) && (
                                            <GripVertical className="h-4 w-4 text-muted-foreground/45 opacity-0 transition-opacity group-hover:opacity-100" />
                                        )}
                                    </button>
                                    <Badge variant="outline" className={cn("rounded-lg", visual.badge)}>
                                        {typeLabels[node.type]}
                                    </Badge>
                                </span>

                                <div className="space-y-2">
                                    {editing ? (
                                        <div className="space-y-2">
                                            <Input
                                                value={editingTitle}
                                                onChange={(event) => setEditingTitle(event.target.value)}
                                                onKeyDown={(event) => {
                                                    if (event.key === "Enter") {
                                                        saveEditing();
                                                    }

                                                    if (event.key === "Escape") {
                                                        setEditingId(null);
                                                        setEditingTitle("");
                                                    }
                                                }}
                                                autoFocus
                                            />
                                            <div className="flex gap-2">
                                                <Button type="button" size="sm" onClick={saveEditing}>
                                                    Salvar
                                                </Button>
                                                <Button type="button" size="sm" variant="outline" onClick={() => setEditingId(null)}>
                                                    Cancelar
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <button type="button" onClick={() => openNode(node)} className="block w-full text-left">
                                            <span className="block truncate text-base font-semibold">{node.title}</span>
                                            <span className="block text-sm text-muted-foreground">
                                                {node.type === "doc"
                                                    ? templateLabels[node.template ?? "backend"]
                                                    : `${childCount} item${childCount === 1 ? "" : "s"}`}
                                            </span>
                                        </button>
                                    )}

                                    {isContainer(node) && draggingId && !receivingDrop && draggingId !== node.id && (
                                        <span className="block text-xs font-medium text-muted-foreground">
                                            Arraste para dentro
                                        </span>
                                    )}
                                </div>

                                {!editing && (
                                    <div className="mt-3 flex items-center justify-between gap-2 border-t pt-3">
                                        <Button type="button" size="sm" variant="outline" onClick={() => openNode(node)}>
                                            {node.type === "doc" ? "Abrir" : "Entrar"}
                                        </Button>
                                        <div className="flex gap-1">
                                            <Button type="button" size="icon" variant="ghost" onClick={() => startEditing(node)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button type="button" size="icon" variant="ghost" onClick={() => deleteNode(node)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </section>

                {visibleItems.length === 0 && (
                    <div className="rounded-lg border border-dashed p-10 text-center text-sm text-muted-foreground">
                        {query
                            ? "Nenhum item encontrado."
                            : "Nada por aqui ainda. Crie um projeto, uma pasta ou um documento para começar."}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
