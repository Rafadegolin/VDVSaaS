"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabaseClient";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip as ChartTooltip,
  TooltipProps,
} from "recharts";

interface TooltipItem {
  name: string;
  value: number;
}

interface ChartTooltipContentProps {
  active?: boolean;
  payload?: TooltipItem[];
  label?: string;
}

const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || payload.length === 0) {
    return null;
  }
  return (
    <div className="bg-white p-2 rounded shadow">
      <p className="text-gray-700 text-sm">{label}</p>
      {payload.map((item, index) => (
        <p key={index} className="text-gray-700 text-sm">
          {item.name}: {item.value}
        </p>
      ))}
    </div>
  );
};

interface ChartContainerProps {
  config?: Record<
    string,
    {
      label: string;
      color: string;
    }
  >;
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  config,
  children,
}) => {
  return (
    <div className="relative">
      {children}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        {config &&
          Object.entries(config).map(([key, value]) => (
            <div key={key} className="flex items-center mb-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: value.color }}
              />
              <span className="ml-2 text-sm">{value.label}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

interface User {
  id: string;
  email: string;
}

interface Project {
  id: string;
  deadline: string;
  status: "Done" | "Active";
}

export function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchUserAndProjects = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user as User);

      if (user) {
        const { data: projects, error } = await supabase
          .from("projects")
          .select("*")
          .eq("user_id", user.id);

        if (error) {
          console.error("Erro ao buscar projetos:", error);
        } else {
          setProjects(projects || []);
        }
      }
    };

    fetchUserAndProjects();
  }, []);

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

  return (
    <div className="space-y-6">
      <h1 className="mb-8 text-3xl font-bold">Dashboard</h1>
      {user && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Perfil</CardTitle>
            <CardDescription>Informações do usuário</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Email: {user.email}</p>
          </CardContent>
        </Card>
      )}
      <Card>
        <CardHeader>
          <CardTitle>Métricas de Projetos</CardTitle>
          <CardDescription>Visão geral dos seus projetos</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Total de projetos: {projects.length}</p>
        </CardContent>
      </Card>
      <Card className="h-[400px]">
        <CardHeader>
          <CardTitle>Visão Geral dos Projetos</CardTitle>
          <CardDescription>Distribuição mensal de projetos</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          {projects.length > 0 ? (
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
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-muted-foreground">Nenhum projeto encontrado</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
