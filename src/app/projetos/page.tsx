"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ProjectCard } from "@/components/ProjectCard";
import { KanbanView } from "@/components/KanbanView";
import Link from "next/link";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCollaborator, setSelectedCollaborator] = useState("all");
  const [isKanbanView, setIsKanbanView] = useState(false);
  const [projectType, setProjectType] = useState("all");
  const [complexityFilter, setComplexityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const collaborators = [
    { id: 1, name: "Rafael Degolin" },
    { id: 2, name: "Daniel Souza" },
    { id: 3, name: "Eduardo Gonçalves" },
    { id: 4, name: "Kauan Araujo" },
  ];

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem("projects") || "[]");
    const updatedProjects = storedProjects.map((project) => ({
      ...project,
      status: project.status || "To Do",
      projectPhase: project.projectPhase || "implementação",
      weeklyProgress: project.weeklyProgress || "",
      completedClasses: project.completedClasses || [],
      tags: project.tags || [],
      mainFocus: project.mainFocus || "",
    }));
    setProjects(updatedProjects);
    updateFilteredProjects(
      updatedProjects,
      selectedCollaborator,
      projectType,
      complexityFilter,
      sortBy
    );
  }, []);

  const updateFilteredProjects = useCallback(
    (projectList, collaborator, type, complexity, sort) => {
      let filtered = projectList;

      if (collaborator !== "all") {
        filtered = filtered.filter(
          (project) => project.assignedTo === collaborator
        );
      }

      if (type !== "all") {
        filtered = filtered.filter((project) => project.projectPhase === type);
      }

      if (complexity !== "all") {
        filtered = filtered.filter(
          (project) => project.complexityLevel === complexity
        );
      }

      switch (sort) {
        case "name":
          filtered.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "date":
          filtered.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));
          break;
        case "complexity":
          filtered.sort((a, b) => {
            const order = { low: 1, medium: 2, high: 3 };
            return order[b.complexityLevel] - order[a.complexityLevel];
          });
          break;
      }

      setFilteredProjects(filtered);
    },
    []
  );

  const handleCollaboratorChange = useCallback(
    (value) => {
      setSelectedCollaborator(value);
      updateFilteredProjects(
        projects,
        value,
        projectType,
        complexityFilter,
        sortBy
      );
    },
    [projects, projectType, complexityFilter, sortBy, updateFilteredProjects]
  );

  const handleProjectUpdate = useCallback(
    (updatedProject) => {
      const updatedProjects = projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      );
      setProjects(updatedProjects);
      updateFilteredProjects(
        updatedProjects,
        selectedCollaborator,
        projectType,
        complexityFilter,
        sortBy
      );
      localStorage.setItem("projects", JSON.stringify(updatedProjects));
    },
    [
      projects,
      selectedCollaborator,
      projectType,
      complexityFilter,
      sortBy,
      updateFilteredProjects,
    ]
  );

  useEffect(() => {
    updateFilteredProjects(
      projects,
      selectedCollaborator,
      projectType,
      complexityFilter,
      sortBy
    );
  }, [
    projects,
    selectedCollaborator,
    projectType,
    complexityFilter,
    sortBy,
    updateFilteredProjects,
  ]);

  return (
    <div className="container mx-auto py-6 md:py-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Projetos</h1>

      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="collaborator-filter">Filtrar por Colaborador</Label>
            <Select
              onValueChange={handleCollaboratorChange}
              value={selectedCollaborator}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um colaborador" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {collaborators.map((collaborator) => (
                  <SelectItem
                    key={collaborator.id}
                    value={collaborator.id.toString()}
                  >
                    {collaborator.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="project-type-filter">Fase do Projeto</Label>
            <Select onValueChange={setProjectType} value={projectType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a fase" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="implementação">Implementação</SelectItem>
                <SelectItem value="direcionamento">Direcionamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="complexity-filter">Complexidade</Label>
            <Select
              onValueChange={setComplexityFilter}
              value={complexityFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a complexidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="sort-by">Ordenar por</Label>
            <Select onValueChange={setSortBy} value={sortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a ordenação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nome</SelectItem>
                <SelectItem value="date">Data</SelectItem>
                <SelectItem value="complexity">Complexidade</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="view-toggle">Visualização Kanban</Label>
          <Switch
            id="view-toggle"
            checked={isKanbanView}
            onCheckedChange={setIsKanbanView}
          />
        </div>
      </div>

      {isKanbanView ? (
        <KanbanView
          projects={filteredProjects}
          onProjectUpdate={handleProjectUpdate}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onUpdate={handleProjectUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
