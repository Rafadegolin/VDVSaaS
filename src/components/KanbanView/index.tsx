import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Draggable } from "../Draggable";
import { Droppable } from "../Droppable";
import { Plus, X } from "lucide-react";
import { Project } from "@/lib/types";

const KANBAN_COLUMNS = ["To Do", "In Progress", "Done"] as const;

interface KanbanViewProps {
  projects: Project[];
  onProjectUpdate: (project: Project) => void;
  handleChecklistChange: (projectId: string, taskId: string) => void;
  handleAddTask: (projectId: string, task: string) => void;
  handleDeleteTask: (projectId: string, taskId: string) => void;
}

export function KanbanView({
  projects: initialProjects,
  onProjectUpdate,
  handleChecklistChange,
  handleAddTask,
  handleDeleteTask,
}: KanbanViewProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeProject = projects.find((p) => p.id === active.id);
      if (activeProject && activeProject.status !== over.id) {
        const updatedProjects = projects.map((p) =>
          p.id === active.id
            ? { ...p, status: over.id as (typeof KANBAN_COLUMNS)[number] }
            : p
        );
        setProjects(updatedProjects);
        onProjectUpdate({
          ...activeProject,
          status: over.id as (typeof KANBAN_COLUMNS)[number],
        });
      }
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 overflow-x-auto pb-4">
        {KANBAN_COLUMNS.map((columnId) => (
          <div key={columnId} className="flex-1 min-w-[300px] md:w-1/3">
            <h2 className="text-xl font-bold mb-4">{columnId}</h2>
            <Droppable id={columnId}>
              <div className="space-y-4">
                {projects
                  .filter((project) => project.status === columnId)
                  .map((project) => (
                    <Draggable key={project.id} id={project.id}>
                      <ProjectCard
                        project={project}
                        onUpdate={onProjectUpdate}
                        handleChecklistChange={handleChecklistChange}
                        handleAddTask={handleAddTask}
                        handleDeleteTask={handleDeleteTask}
                      />
                    </Draggable>
                  ))}
              </div>
            </Droppable>
          </div>
        ))}
      </div>
      <DragOverlay>
        {activeId ? (
          <ProjectCard
            project={projects.find((p) => p.id === activeId)!}
            onUpdate={onProjectUpdate}
            handleChecklistChange={handleChecklistChange}
            handleAddTask={handleAddTask}
            handleDeleteTask={handleDeleteTask}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

interface ProjectCardProps {
  project: Project;
  onUpdate: (project: Project) => void;
  handleChecklistChange: (projectId: string, taskId: string) => void;
  handleAddTask: (projectId: string, task: string) => void;
  handleDeleteTask: (projectId: string, taskId: string) => void;
}

function ProjectCard({
  project,
  onUpdate,
  handleChecklistChange,
  handleAddTask,
  handleDeleteTask,
}: ProjectCardProps) {
  if (!project) return null;

  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          {project.description}
        </p>
        <ul className="space-y-1">
          {project.checklist.map((task) => (
            <li key={task.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id={`task-${project.id}-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() =>
                    handleChecklistChange(project.id, task.id)
                  }
                />
                <label
                  htmlFor={`task-${project.id}-${task.id}`}
                  className="ml-2 text-sm cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                >
                  {task.task}
                </label>
              </div>
              <button
                onClick={() => handleDeleteTask(project.id, task.id)}
                className="text-red-500 hover:text-red-700"
                aria-label="Excluir tarefa"
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const newTask = form.newTask.value.trim();
              if (newTask) {
                handleAddTask(project.id, newTask);
                form.newTask.value = "";
              }
            }}
          >
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name="newTask"
                placeholder="Nova tarefa"
                className="flex-grow px-3 py-2 text-sm border rounded-md"
                aria-label="Nova tarefa"
              />
              <button
                type="submit"
                className="p-2 text-sm font-medium text-primary bg-white rounded-md border border-primary hover:bg-primary/10"
                aria-label="Adicionar nova tarefa"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
