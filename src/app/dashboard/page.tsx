"use client";

import ChartOverview from "@/components/chart";
import { Sales } from "@/components/sales";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BadgeDollarSign, DollarSign, Percent, Users } from "lucide-react";
import { useState, useMemo, useEffect } from "react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Tipos definidos para projetos e colaboradores
type Project = {
  id: string;
  name: string;
  status: "Active" | "Done";
  deadline: string;
  assignedTo: string;
  checklist: { id: string; task: string; completed: boolean }[];
};

type Collaborator = {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
};

export default function Home() {
  const [selectedCollaborator, setSelectedCollaborator] = useState<
    string | null
  >(null);
  const [projects, setProjects] = useState<Project[]>([]);

  const collaborators: Collaborator[] = [
    {
      id: "1",
      name: "Rafael Degolin",
      email: "rafael@example.com",
      role: "Gerente de Projetos",
      department: "TI",
    },
    {
      id: "2",
      name: "Daniel Souza",
      email: "daniel@example.com",
      role: "Desenvolvedor",
      department: "TI",
    },
    {
      id: "3",
      name: "Eduardo Gonçalves",
      email: "eduardo@example.com",
      role: "Analista de Projetos",
      department: "TI",
    },
    {
      id: "4",
      name: "Cauã Araujo",
      email: "kauan@example.com",
      role: "Designer",
      department: "Design",
    },
  ];

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    setProjects(storedProjects);
  }, []);

  const currentCollaborator = useMemo(
    () =>
      selectedCollaborator
        ? collaborators.find((c) => c.id === selectedCollaborator)
        : null,
    [selectedCollaborator, collaborators]
  );

  const projectData = useMemo(() => {
    const monthNames = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const data = monthNames.map((month) => ({
      month,
      completed: 0,
      active: 0,
      total: 0,
    }));

    projects.forEach((project) => {
      const monthIndex = new Date(project.deadline).getMonth();
      data[monthIndex].total++;
      if (project.status === "Done") {
        data[monthIndex].completed++;
      } else {
        data[monthIndex].active++;
      }
    });

    return data;
  }, [projects]);

  const taskCompletionData = useMemo(() => {
    const data = [
      { day: "Seg", tasks: 0 },
      { day: "Ter", tasks: 0 },
      { day: "Qua", tasks: 0 },
      { day: "Qui", tasks: 0 },
      { day: "Sex", tasks: 0 },
    ];

    projects.forEach((project) => {
      project.checklist.forEach((task) => {
        if (task.completed) {
          const dayIndex = Math.floor(Math.random() * 5);
          data[dayIndex].tasks++;
        }
      });
    });

    return data;
  }, [projects]);

  const metrics = useMemo(() => {
    const filteredProjects = selectedCollaborator
      ? projects.filter((p) => p.assignedTo === selectedCollaborator)
      : projects;

    const activeProjects = filteredProjects.filter(
      (p) => p.status !== "Done"
    ).length;
    const completedProjects = filteredProjects.filter(
      (p) => p.status === "Done"
    ).length;
    const completionRate =
      filteredProjects.length > 0
        ? (completedProjects / filteredProjects.length) * 100
        : 0;
    const pendingTasks = filteredProjects.reduce((acc, project) => {
      return acc + project.checklist.filter((task) => !task.completed).length;
    }, 0);

    return {
      activeProjects,
      completionRate: Math.round(completionRate),
      pendingTasks,
    };
  }, [projects, selectedCollaborator]);

  const collaboratorProjectData = useMemo(() => {
    const data = collaborators.map((collaborator) => ({
      name: collaborator.name,
      projects: projects.filter((p) => p.assignedTo === collaborator.id).length,
    }));
    return data.sort((a, b) => b.projects - a.projects);
  }, [projects, collaborators]);

  return (
    <main className="sm:ml-14 p-4">
      {/* DASHBOARD 1 SEM FILTRO */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Total venda
              </CardTitle>
              <DollarSign className="ml-auto w-4 h-4" />
            </div>

            <CardDescription>Total vendas em 90 dias</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">R$40.000,00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Novos clientes
              </CardTitle>
              <Users className="ml-auto w-4 h-4" />
            </div>

            <CardDescription>Novos clientes em 30 dias</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">234</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Pedidos hoje
              </CardTitle>
              <Percent className="ml-auto w-4 h-4" />
            </div>

            <CardDescription>Total de pedidos hoje</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">65</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-center">
              <CardTitle className="text-lg sm:text-xl text-gray-800 select-none">
                Total pedidos
              </CardTitle>
              <BadgeDollarSign className="ml-auto w-4 h-4" />
            </div>

            <CardDescription>Total de pedidos em 30 dias</CardDescription>
          </CardHeader>

          <CardContent>
            <p className="text-base sm:text-lg font-bold">1431</p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-4 flex flex-col md:flex-row gap-4">
        <ChartOverview />
        <Sales />
      </section>

      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-0">
            Dashboard
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            {selectedCollaborator
              ? `Visualizando: ${currentCollaborator?.name}`
              : "Visualizando: Todos"}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Selecionar Colaborador</CardTitle>
            <CardDescription>
              Clique em um colaborador para ver suas informações específicas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button
                variant={selectedCollaborator === null ? "default" : "outline"}
                onClick={() => setSelectedCollaborator(null)}
                className="w-full sm:w-auto"
              >
                Todos
              </Button>
              {collaborators.map((collaborator) => (
                <Avatar
                  key={collaborator.id}
                  className={`cursor-pointer hover:opacity-80 ${
                    selectedCollaborator === collaborator.id
                      ? "ring-2 ring-primary"
                      : ""
                  }`}
                  onClick={() => setSelectedCollaborator(collaborator.id)}
                >
                  <AvatarImage
                    src={`https://api.dicebear.com/6.x/initials/svg?seed=${collaborator.name}`}
                  />
                  <AvatarFallback>
                    {collaborator.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* DASHBOARD 2 COM FILTRO  */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Visão Geral dos Projetos</CardTitle>
              <CardDescription>Distribuição mensal de projetos</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer
                config={{
                  total: {
                    label: "Total",
                    color: "hsl(var(--chart-1))",
                  },
                  active: {
                    label: "Ativos",
                    color: "hsl(var(--chart-2))",
                  },
                  completed: {
                    label: "Concluídos",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={projectData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="var(--color-total)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="active"
                      stroke="var(--color-active)"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="completed"
                      stroke="var(--color-completed)"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Tarefas Concluídas</CardTitle>
              <CardDescription>
                Número de tarefas concluídas por dia
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer
                config={{
                  tasks: {
                    label: "Tarefas",
                    color: "hsl(var(--chart-4))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={taskCompletionData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="tasks"
                      fill="var(--color-tasks)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="h-[400px]">
            <CardHeader>
              <CardTitle>Projetos por Colaborador</CardTitle>
              <CardDescription>
                Distribuição de projetos entre colaboradores
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ChartContainer
                config={{
                  projects: {
                    label: "Projetos",
                    color: "hsl(var(--chart-5))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={collaboratorProjectData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="projects" fill="var(--color-projects)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Perfil do Colaborador</CardTitle>
              <CardDescription>Informações pessoais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Nome: {currentCollaborator?.name || "Todos os colaboradores"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Email: {currentCollaborator?.email || "N/A"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Cargo: {currentCollaborator?.role || "Diversos"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Departamento: {currentCollaborator?.department || "Todos"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status dos Projetos</CardTitle>
              <CardDescription>
                Visão geral do status dos projetos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Projetos Ativos</p>
                  <p className="text-2xl font-bold">{metrics.activeProjects}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Projetos Concluídos</p>
                  <p className="text-2xl font-bold">
                    {projects.length - metrics.activeProjects}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Taxa de Conclusão</p>
                  <p className="text-2xl font-bold">
                    {metrics.completionRate}%
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Tarefas Pendentes</p>
                  <p className="text-2xl font-bold">{metrics.pendingTasks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
