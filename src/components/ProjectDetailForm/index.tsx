"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface Project {
  id: string | number;
  teamSize?: string;
  budget?: string;
  mainObjective?: string;
  stakeholders?: string;
  risks?: string;
  successCriteria?: string;
  complexityLevel?: string;
  mainFocus?: string;
}

interface ProjectDetailFormProps {
  projectId: string;
}

export function ProjectDetailForm({ projectId }: ProjectDetailFormProps) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Omit<Project, "id">>({
    teamSize: "",
    budget: "",
    mainObjective: "",
    stakeholders: "",
    risks: "",
    successCriteria: "",
    complexityLevel: "",
    mainFocus: "",
  });

  useEffect(() => {
    const projects: Project[] = JSON.parse(
      localStorage.getItem("projects") || "[]"
    );
    const currentProject = projects.find((p) => p.id.toString() === projectId);
    if (currentProject) {
      setProject(currentProject);
      setFormData({
        teamSize: currentProject.teamSize || "",
        budget: currentProject.budget || "",
        mainObjective: currentProject.mainObjective || "",
        stakeholders: currentProject.stakeholders || "",
        risks: currentProject.risks || "",
        successCriteria: currentProject.successCriteria || "",
        complexityLevel: currentProject.complexityLevel || "",
        mainFocus: currentProject.mainFocus || "",
      });
    }
  }, [projectId]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projects: Project[] = JSON.parse(
      localStorage.getItem("projects") || "[]"
    );
    const updatedProjects = projects.map((p) =>
      p.id.toString() === projectId ? { ...p, ...formData } : p
    );
    localStorage.setItem("projects", JSON.stringify(updatedProjects));

    // Redirecionar para a página de projetos
    router.push("/projects");
  };

  if (!project) {
    return <div>Carregando...</div>;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Detalhes Adicionais do Projeto</CardTitle>
        <CardDescription>
          Preencha as informações detalhadas coletadas na reunião de alinhamento
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="teamSize">Tamanho da Equipe</Label>
            <Select
              onValueChange={(value) => handleChange("teamSize", value)}
              value={formData.teamSize}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tamanho da equipe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Pequena (1-5 pessoas)</SelectItem>
                <SelectItem value="medium">Média (6-15 pessoas)</SelectItem>
                <SelectItem value="large">Grande (16-30 pessoas)</SelectItem>
                <SelectItem value="enterprise">
                  Enterprise (31+ pessoas)
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget">Orçamento Estimado</Label>
            <Input
              id="budget"
              type="number"
              value={formData.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mainObjective">Objetivo Principal</Label>
            <Textarea
              id="mainObjective"
              value={formData.mainObjective}
              onChange={(e) => handleChange("mainObjective", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="stakeholders">Principais Stakeholders</Label>
            <Input
              id="stakeholders"
              value={formData.stakeholders}
              onChange={(e) => handleChange("stakeholders", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="risks">Riscos Potenciais</Label>
            <Textarea
              id="risks"
              value={formData.risks}
              onChange={(e) => handleChange("risks", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="successCriteria">Critérios de Sucesso</Label>
            <Textarea
              id="successCriteria"
              value={formData.successCriteria}
              onChange={(e) => handleChange("successCriteria", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="complexityLevel">Nível de Complexidade</Label>
            <Select
              onValueChange={(value) => handleChange("complexityLevel", value)}
              value={formData.complexityLevel}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o nível de complexidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Baixa</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mainFocus">Foco Principal</Label>
            <Textarea
              id="mainFocus"
              value={formData.mainFocus}
              onChange={(e) => handleChange("mainFocus", e.target.value)}
              placeholder="Descreva o foco principal do projeto"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Atualizar Detalhes do Projeto</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
