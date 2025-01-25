import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { differenceInDays } from "date-fns";

interface Task {
  id: number;
  task: string;
  completed: boolean;
}

interface Collaborator {
  name: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  budget: number;
  deadline: string;
  projectType: string;
  collaborator: Collaborator;
  teamSize: string;
  mainObjective: string;
  stakeholders: string;
  risks: string;
  successCriteria: string;
  tasks: Task[];
}

interface ProjectPreviewProps {
  project: Project;
}

export function ProjectPreview({ project }: ProjectPreviewProps) {
  const calculateProgress = (tasks: Task[]) => {
    if (!tasks || tasks.length === 0) return 0;
    const completedTasks = tasks.filter((task) => task.completed).length;
    return (completedTasks / tasks.length) * 100;
  };

  const calculateRemainingDays = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const remainingDays = differenceInDays(deadlineDate, today);
    return remainingDays > 0 ? remainingDays : 0;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.projectType}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p>
            <strong>Descrição:</strong> {project.description}
          </p>
          <p>
            <strong>Orçamento:</strong> R$ {project.budget}
          </p>
          <p>
            <strong>Prazo:</strong>{" "}
            {new Date(project.deadline).toLocaleDateString()}
          </p>
          <p>
            <strong>Dias Restantes:</strong>{" "}
            {calculateRemainingDays(project.deadline)}
          </p>
          <p>
            <strong>Atribuído a:</strong> {project.collaborator.name}
          </p>
          <p>
            <strong>Tamanho da Equipe:</strong> {project.teamSize}
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

          <div>
            <p>
              <strong>Progresso:</strong>
            </p>
            <Progress
              value={calculateProgress(project.tasks)}
              className="mt-2"
            />
            <p className="text-sm text-right">
              {Math.round(calculateProgress(project.tasks))}%
            </p>
          </div>

          <div>
            <p>
              <strong>Checklist:</strong>
            </p>
            <ul className="mt-2 space-y-2">
              {project.tasks.map((task) => (
                <li key={task.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="mr-2"
                  />
                  <span>{task.task}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
