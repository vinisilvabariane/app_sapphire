import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, BarChart3, Users, TrendingUp } from "lucide-react";

const stats = [
    { label: "Usuários", value: "—", icon: Users, delta: "+0%" },
    { label: "Atividade", value: "—", icon: Activity, delta: "+0%" },
    { label: "Relatórios", value: "—", icon: BarChart3, delta: "+0%" },
    { label: "Crescimento", value: "—", icon: TrendingUp, delta: "+0%" },
];

export default function HomePage() {
    return (
        <AppLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Bem-vindo ao seu painel de controle.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((s) => (
                        <Card key={s.label}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {s.label}
                                </CardTitle>
                                <s.icon className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{s.value}</div>
                                <Badge variant="secondary" className="mt-1 text-xs">
                                    {s.delta}
                                </Badge>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Atividade recente</CardTitle>
                            <CardDescription>Suas últimas ações no sistema.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                                Nenhuma atividade ainda.
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Acesso rápido</CardTitle>
                            <CardDescription>Atalhos para as principais áreas.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
                                Adicione atalhos aqui.
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
