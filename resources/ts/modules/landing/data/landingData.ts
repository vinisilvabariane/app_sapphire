import {
    BarChart3,
    Bolt,
    BriefcaseBusiness,
    CalendarClock,
    ChartNoAxesCombined,
    CircleDollarSign,
    ClipboardList,
    Gauge,
    LayoutDashboard,
    LockKeyhole,
    MousePointerClick,
    Rocket,
    Shield,
    SlidersHorizontal,
    Users,
} from "lucide-react";

export const navItems = [
    { label: "Planos", href: "/planos" },
    { label: "Recursos", href: "/recursos" },
    { label: "FAQ", href: "/perguntas-frequentes" },
];

export const useCases = [
    "Sistema de chamados",
    "Dashboards em tempo real",
    "Gest\u00E3o de projetos",
];

export const stats = [
    { value: "99.9%", label: "Uptime SLA" },
    { value: "<50ms", label: "Lat\u00EAncia m\u00E9dia" },
    { value: "+200", label: "Empresas ativas" },
    { value: "4.9/5", label: "Avalia\u00E7\u00E3o m\u00E9dia" },
];

export const features = [
    {
        title: "Dashboard em tempo real",
        description:
            "KPIs personaliz\u00E1veis, gr\u00E1ficos interativos e filtros para acompanhar o que importa sem perder contexto.",
        icon: LayoutDashboard,
        wide: true,
    },
    {
        title: "Seguran\u00E7a nativa",
        description:
            "JWT em cookie HttpOnly, rotas protegidas por middleware e uma base preparada para permiss\u00F5es granulares.",
        icon: Shield,
    },
    {
        title: "Performance extrema",
        description:
            "React, Vite e Inertia entregam navega\u00E7\u00E3o r\u00E1pida sem recarregar a p\u00E1gina em cada a\u00E7\u00E3o.",
        icon: Bolt,
    },
    {
        title: "Gest\u00E3o multiusu\u00E1rio",
        description:
            "Pap\u00E9is, n\u00EDveis de acesso e auditoria para manter cada pessoa no fluxo certo de trabalho.",
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
        description: "Defina usu\u00E1rios, permiss\u00F5es e m\u00F3dulos conforme a opera\u00E7\u00E3o evoluir.",
    },
    {
        number: "03",
        title: "Opere com clareza",
        description: "Use a home como ponto de partida para construir dashboards, requests e APIs.",
    },
];

export const plans = [
    {
        name: "Free",
        price: "Gr\u00E1tis",
        description: "Para experimentar sem compromisso.",
        features: ["1 usu\u00E1rio", "Dashboard b\u00E1sico", "100 registros", "Suporte por email"],
        action: "Come\u00E7ar gr\u00E1tis",
    },
    {
        name: "Plus",
        price: "R$29,90",
        period: "/m\u00EAs",
        description: "Para equipes que precisam de mais.",
        features: [
            "At\u00E9 10 usu\u00E1rios",
            "Dashboard completo",
            "Registros ilimitados",
            "Relat\u00F3rios export\u00E1veis",
            "Suporte priorit\u00E1rio",
        ],
        action: "Assinar Plus",
        highlighted: true,
    },
    {
        name: "Premium",
        price: "R$99,90",
        period: "/m\u00EAs",
        description: "Para opera\u00E7\u00F5es que n\u00E3o param.",
        features: [
            "Usu\u00E1rios ilimitados",
            "Tudo do plano Plus",
            "Acesso completo \u00E0 API",
            "Auditoria avan\u00E7ada",
            "SLA 99.9% garantido",
            "Suporte 24/7",
        ],
        action: "Assinar Premium",
    },
];

export const footerGroups = [
    { title: "Produto", links: ["Recursos", "Seguran\u00E7a", "Performance", "Integra\u00E7\u00F5es"] },
    { title: "Empresa", links: ["Sobre n\u00F3s", "Blog", "Carreiras", "Contato"] },
    { title: "Legal", links: ["Privacidade", "Termos de uso", "Cookies"] },
];

export const assurances = [
    { label: "JWT pronto", icon: LockKeyhole },
    { label: "API separada", icon: BarChart3 },
    { label: "Frontend modular", icon: LayoutDashboard },
];

export const faqs = [
    {
        question: "O Sapphire substitui planilhas e ferramentas separadas?",
        answer:
            "Ele centraliza chamados, indicadores e fluxos de trabalho para reduzir controle paralelo. A ideia \u00E9 deixar a opera\u00E7\u00E3o vis\u00EDvel em um lugar s\u00F3, sem depender de atualiza\u00E7\u00F5es manuais constantes.",
    },
    {
        question: "Consigo come\u00E7ar pequeno e evoluir depois?",
        answer:
            "Sim. A estrutura foi pensada para validar o fluxo inicial e crescer com novos m\u00F3dulos, permiss\u00F5es, dashboards e integra\u00E7\u00F5es conforme o time amadurece.",
    },
    {
        question: "Como funciona a seguran\u00E7a de acesso?",
        answer:
            "A base usa autentica\u00E7\u00E3o com JWT em cookie HttpOnly e rotas protegidas. Isso cria um ponto de partida mais previs\u00EDvel para evoluir pap\u00E9is, auditoria e permiss\u00F5es.",
    },
    {
        question: "O sistema serve para opera\u00E7\u00F5es com mais de uma equipe?",
        answer:
            "Serve. Os fluxos consideram usu\u00E1rios, respons\u00E1veis, status e vis\u00F5es de acompanhamento, ajudando gest\u00E3o e execu\u00E7\u00E3o a trabalharem com o mesmo contexto.",
    },
    {
        question: "Preciso configurar tudo antes de usar?",
        answer:
            "N\u00E3o. O caminho ideal \u00E9 come\u00E7ar pelo essencial, validar a rotina e ampliar configura\u00E7\u00F5es quando houver clareza sobre prioridades, acessos e indicadores.",
    },
    {
        question: "O Sapphire pode se conectar com APIs e outros sistemas?",
        answer:
            "A arquitetura separa frontend, rotas e base de API, deixando espa\u00E7o para integra\u00E7\u00F5es conforme o produto evolui.",
    },
];

export const pinnedStories = {
    home: [
        {
            eyebrow: "Centralize",
            title: "Chamados, tarefas e opera\u00E7\u00E3o no mesmo fluxo",
            description:
                "A entrada de demandas vira fila organizada, com contexto, dono, prioridade e hist\u00F3rico vis\u00EDvel para o time inteiro.",
            icon: ClipboardList,
        },
        {
            eyebrow: "Visualize",
            title: "M\u00E9tricas de gest\u00E3o sem planilha paralela",
            description:
                "Indicadores de atendimento, projeto e produtividade aparecem no ritmo da opera\u00E7\u00E3o, sem depender de fechamento manual.",
            icon: ChartNoAxesCombined,
        },
        {
            eyebrow: "Evolua",
            title: "Uma base pronta para crescer com produto",
            description:
                "Arquitetura modular, autentica\u00E7\u00E3o e rotas separadas deixam espa\u00E7o para novos m\u00F3dulos sem bagun\u00E7ar a experi\u00EAncia.",
            icon: Rocket,
        },
        {
            eyebrow: "Priorize",
            title: "Demandas importantes aparecem primeiro",
            description:
                "Filtros, status e respons\u00E1veis ajudam o time a entender o que precisa de a\u00E7\u00E3o agora e o que pode esperar.",
            icon: Gauge,
        },
        {
            eyebrow: "Colabore",
            title: "Cada pessoa trabalha com o mesmo contexto",
            description:
                "Hist\u00F3rico, coment\u00E1rios e movimenta\u00E7\u00F5es reduzem retrabalho entre gest\u00E3o, atendimento e execu\u00E7\u00E3o.",
            icon: Users,
        },
        {
            eyebrow: "Proteja",
            title: "Controle de acesso acompanha a opera\u00E7\u00E3o",
            description:
                "A base de seguran\u00E7a permite evoluir permiss\u00F5es, auditoria e pap\u00E9is sem perder previsibilidade.",
            icon: Shield,
        },
    ],
    features: [
        {
            eyebrow: "Controle",
            title: "Cada recurso resolve uma etapa da opera\u00E7\u00E3o",
            description:
                "Dashboards, permiss\u00F5es e fluxos multiusu\u00E1rio trabalham juntos para reduzir ru\u00EDdo entre gest\u00E3o e execu\u00E7\u00E3o.",
            icon: SlidersHorizontal,
        },
        {
            eyebrow: "Velocidade",
            title: "Interface r\u00E1pida para uso recorrente",
            description:
                "React, Vite e Inertia deixam a navega\u00E7\u00E3o leve para quem precisa abrir, filtrar e agir v\u00E1rias vezes por dia.",
            icon: Gauge,
        },
        {
            eyebrow: "Seguran\u00E7a",
            title: "Acesso preparado para times em crescimento",
            description:
                "A base de autentica\u00E7\u00E3o e middleware permite evoluir pap\u00E9is, auditoria e permiss\u00F5es com previsibilidade.",
            icon: Shield,
        },
    ],
    pricing: [
        {
            eyebrow: "Entrada",
            title: "Comece pequeno sem travar o pr\u00F3ximo passo",
            description:
                "O plano inicial valida o fluxo com baixo compromisso e deixa claro quando faz sentido ampliar a opera\u00E7\u00E3o.",
            icon: CircleDollarSign,
        },
        {
            eyebrow: "Escala",
            title: "Planos pensados por maturidade de time",
            description:
                "De usu\u00E1rios iniciais a opera\u00E7\u00F5es maiores, a oferta acompanha volume, suporte e profundidade de relat\u00F3rios.",
            icon: Users,
        },
        {
            eyebrow: "Decis\u00E3o",
            title: "Benef\u00EDcio f\u00E1cil de comparar",
            description:
                "Pre\u00E7o, limites e recursos aparecem de forma direta para o comprador entender valor sem reuni\u00E3o longa.",
            icon: MousePointerClick,
        },
    ],
    how: [
        {
            eyebrow: "Dia 1",
            title: "Conta criada e ambiente pronto",
            description:
                "A primeira experi\u00EAncia tira fric\u00E7\u00E3o do acesso e coloca o usu\u00E1rio direto no ponto de partida da opera\u00E7\u00E3o.",
            icon: CalendarClock,
        },
        {
            eyebrow: "Dia 2",
            title: "Fluxos configurados para o time",
            description:
                "Usu\u00E1rios, permiss\u00F5es e m\u00F3dulos entram em cena conforme a equipe ganha clareza do processo.",
            icon: BriefcaseBusiness,
        },
        {
            eyebrow: "Rotina",
            title: "Gest\u00E3o acompanha a execu\u00E7\u00E3o",
            description:
                "A opera\u00E7\u00E3o deixa rastros claros para tomada de decis\u00E3o, prioriza\u00E7\u00E3o e melhoria cont\u00EDnua.",
            icon: ChartNoAxesCombined,
        },
    ],
};
