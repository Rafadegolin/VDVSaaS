"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.id as string;
  const [project, setProject] = useState(null);

  useEffect(() => {
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const currentProject = projects.find((p) => p.id.toString() === projectId);
    if (currentProject) {
      setProject(currentProject);
    }
  }, [projectId]);

  if (!project) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Detalhes do Projeto</h1>
      <Card>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              <strong>Descrição:</strong> {project.description}
            </p>
            <p>
              <strong>Fase do Projeto:</strong> {project.projectPhase}
            </p>
            <p>
              <strong>Atribuído a:</strong> {project.assignedTo}
            </p>
            <p>
              <strong>Prazo:</strong>{" "}
              {new Date(project.deadline).toLocaleDateString()}
            </p>
            <p>
              <strong>Tamanho da Equipe:</strong> {project.teamSize}
            </p>
            <p>
              <strong>Orçamento:</strong> R$ {project.budget}
            </p>
            <p>
              <strong>Objetivo Principal:</strong> {project.mainObjective}
            </p>
            <p>
              <strong>Stakeholders:</strong> {project.stakeholders}
            </p>
            <p>
              <strong>Riscos Potenciais:</strong> {project.risks}
            </p>
            <p>
              <strong>Critérios de Sucesso:</strong> {project.successCriteria}
            </p>
            <p>
              <strong>Nível de Complexidade:</strong> {project.complexityLevel}
            </p>
            <p>
              <strong>Foco Principal:</strong> {project.mainFocus}
            </p>
          </div>
          <div className="mt-6">
            <Link href={`/projects/${projectId}/details`} passHref>
              <Button>Editar Detalhes</Button>
            </Link>
            <Link href="/projects" passHref>
              <Button variant="outline" className="ml-4">
                Voltar para Projetos
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
