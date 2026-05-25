import {
    BarChart3,
    Bolt,
    LayoutDashboard,
    LockKeyhole,
    Shield,
    Users,
} from "lucide-react";

export const navItems = [
    { label: "Recursos", href: "#features" },
    { label: "Planos", href: "#pricing" },
    { label: "Como funciona", href: "#how" },
    { label: "Depoimentos", href: "#testimonials" },
];

export const useCases = [
    "Sistema de chamados",
    "Dashboards em tempo real",
    "Gest\u00E3o de projetos",
];

export const stats = [
    { value: "99.9%", label: "Uptime SLA" },
    { value: "<50ms", label: "Latência média" },
    { value: "+200", label: "Empresas ativas" },
    { value: "4.9/5", label: "Avaliação média" },
];

export const features = [
    {
        title: "Dashboard em tempo real",
        description:
            "KPIs personalizáveis, gráficos interativos e filtros para acompanhar o que importa sem perder contexto.",
        icon: LayoutDashboard,
        wide: true,
    },
    {
        title: "Segurança nativa",
        description:
            "JWT em cookie HttpOnly, rotas protegidas por middleware e uma base preparada para permissões granulares.",
        icon: Shield,
    },
    {
        title: "Performance extrema",
        description:
            "React, Vite e Inertia entregam navegação rápida sem recarregar a página em cada ação.",
        icon: Bolt,
    },
    {
        title: "Gestão multiusuário",
        description:
            "Papéis, níveis de acesso e auditoria para manter cada pessoa no fluxo certo de trabalho.",
        icon: Users,
        wide: true,
        tags: ["Administrador", "Gestor", "Analista", "Operador"],
    },
];

export const steps = [
    {
        number: "01",
        title: "Crie sua conta",
        description: "Cadastro simples para entrar no sistema e validar o fluxo principal.",
    },
    {
        number: "02",
        title: "Configure o ambiente",
        description: "Defina usuários, permissões e módulos conforme a operação evoluir.",
    },
    {
        number: "03",
        title: "Opere com clareza",
        description: "Use a home como ponto de partida para construir dashboards, requests e APIs.",
    },
];

export const testimonials = [
    {
        name: "Fernanda Castro",
        role: "CTO",
        company: "TechCorp",
        quote:
            "O Sapphire reduziu o tempo da nossa equipe de operações. A interface ficou limpa e rápida.",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&auto=format&q=80",
    },
    {
        name: "Rafael Mendes",
        role: "CEO",
        company: "StartupXP",
        quote:
            "O onboarding foi direto ao ponto. Conseguimos validar o fluxo de login e começar a evoluir o produto.",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&auto=format&q=80",
    },
    {
        name: "Camila Nunes",
        role: "Head of Ops",
        company: "LogisTech",
        quote:
            "A base com JWT, rotas separadas e Inertia deixou o projeto pronto para crescer com organização.",
        photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=96&h=96&fit=crop&auto=format&q=80",
    },
];

export const plans = [
    {
        name: "Free",
        price: "Grátis",
        description: "Para experimentar sem compromisso.",
        features: ["1 usuário", "Dashboard básico", "100 registros", "Suporte por email"],
        action: "Começar grátis",
    },
    {
        name: "Plus",
        price: "R$29,90",
        period: "/mês",
        description: "Para equipes que precisam de mais.",
        features: [
            "Até 10 usuários",
            "Dashboard completo",
            "Registros ilimitados",
            "Relatórios exportáveis",
            "Suporte prioritário",
        ],
        action: "Assinar Plus",
        highlighted: true,
    },
    {
        name: "Premium",
        price: "R$99,90",
        period: "/mês",
        description: "Para operações que não param.",
        features: [
            "Usuários ilimitados",
            "Tudo do plano Plus",
            "Acesso completo à API",
            "Auditoria avançada",
            "SLA 99.9% garantido",
            "Suporte 24/7",
        ],
        action: "Assinar Premium",
    },
];

export const footerGroups = [
    { title: "Produto", links: ["Recursos", "Segurança", "Performance", "Integrações"] },
    { title: "Empresa", links: ["Sobre nós", "Blog", "Carreiras", "Contato"] },
    { title: "Legal", links: ["Privacidade", "Termos de uso", "Cookies"] },
];

export const mockupStats = [
    { label: "Receita", value: "R$48.2k", delta: "+12%" },
    { label: "Usuários", value: "2.4k", delta: "+8%" },
    { label: "Conversão", value: "3.6%", delta: "+2%" },
];

export const mockupActivity = [
    { name: "Ana Lima", action: "fez login", time: "agora" },
    { name: "Carlos B.", action: "exportou relatório", time: "2min" },
    { name: "Mariana S.", action: "criou pedido #482", time: "5min" },
];

export const assurances = [
    { label: "JWT pronto", icon: LockKeyhole },
    { label: "API separada", icon: BarChart3 },
    { label: "Frontend modular", icon: LayoutDashboard },
];
