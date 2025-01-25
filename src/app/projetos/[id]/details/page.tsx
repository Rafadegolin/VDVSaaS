"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { ProjectDetailsForm } from "@/components/ProjectDetailsForm";
import { useToast } from "@/hooks/use-toast";

export default function ProjectDetailsPage() {
  const params = useParams();
  const projectId = Number.parseInt(params.id as string);
  const { toast } = useToast();

  const handleUpdate = (updatedData) => {
    toast({
      title: "Detalhes do projeto atualizados",
      description: "As informações do projeto foram salvas com sucesso.",
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        Detalhes Adicionais do Projeto
      </h1>
      <ProjectDetailsForm projectId={projectId} onUpdate={handleUpdate} />
    </div>
  );
}
