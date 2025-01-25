export type ChecklistItem = {
  id: string;
  task: string;
  completed: boolean;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  status: "To Do" | "In Progress" | "Done";
  projectPhase: "implementação" | "direcionamento";
  deadline: string;
  assignedTo: number;
  complexityLevel: "low" | "medium" | "high";
  checklist: ChecklistItem[];
  weeklyProgress?: string;
  completedClasses?: string[];
  tags?: string[];
  mainFocus?: string;
  clientName?: string; // Propriedade faltante
  companyName?: string; // Propriedade faltante
  cnpjCount?: number; // Propriedade faltante
  mainCnpj?: string; // Propriedade faltante
};

export type Collaborator = {
  id: number;
  name: string;
};
