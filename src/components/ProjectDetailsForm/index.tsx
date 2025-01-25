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
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";

interface Task {
  id: number;
  task: string;
  completed: boolean;
}

interface FormData {
  id: number; // Added the `id` property
  employeeCount: string;
  tinyKnowledge: string;
  taxRegime: string;
  integratedCnpjs: string;
  salesChannels: string;
  logisticsGateway: string;
  marketplaceListings: string;
  sameProductBase: string;
  mostCompleteMarketplace: string;
  skuCodes: string;
  duplicateListings: string;
  kitListings: string;
  kitComponents: string;
  kitParticularities: string;
  measurementUnits: string;
  productBasePreference: string;
  importantFunctions: string;
  internalInventoryControl: string;
  marketplaceInventoryControl: string;
  entryNoteAvailability: string;
  orderFlow: string;
  expectedDispatchProcess: string;
  invoicesForAllSales: string;
  currentInvoiceIssuance: string;
  currentInvoicePrinting: string;
  currentLabelPrinting: string;
  thermalPrinter: string;
  tinyParallelUse: string[];
  implementationType: string;
  importantObservations: string;
  collaboratorChecklist: Task[];
}

interface ProjectDetailsFormProps {
  projectId: number;
  onUpdate: (updatedData: FormData) => void;
}

export function ProjectDetailsForm({
  projectId,
  onUpdate,
}: ProjectDetailsFormProps) {
  const [formData, setFormData] = useState<FormData>({
    id: projectId,
    employeeCount: "",
    tinyKnowledge: "",
    taxRegime: "",
    integratedCnpjs: "",
    salesChannels: "",
    logisticsGateway: "",
    marketplaceListings: "",
    sameProductBase: "",
    mostCompleteMarketplace: "",
    skuCodes: "",
    duplicateListings: "",
    kitListings: "",
    kitComponents: "",
    kitParticularities: "",
    measurementUnits: "",
    productBasePreference: "",
    importantFunctions: "",
    internalInventoryControl: "",
    marketplaceInventoryControl: "",
    entryNoteAvailability: "",
    orderFlow: "",
    expectedDispatchProcess: "",
    invoicesForAllSales: "",
    currentInvoiceIssuance: "",
    currentInvoicePrinting: "",
    currentLabelPrinting: "",
    thermalPrinter: "",
    tinyParallelUse: [],
    implementationType: "",
    importantObservations: "",
    collaboratorChecklist: [
      { id: 1, task: "Conferência na base de produtos", completed: false },
      { id: 2, task: "Conferência nos anúncios da conta", completed: false },
      { id: 3, task: "Mapeamentos das integrações", completed: false },
      { id: 4, task: "Gatilhos de estoque", completed: false },
      { id: 5, task: "Notas fiscais", completed: false },
      { id: 6, task: "Envio para separação", completed: false },
      { id: 7, task: "Natureza de operação", completed: false },
      { id: 8, task: "Impressão automática", completed: false },
      { id: 9, task: "Depósitos de estoque", completed: false },
      { id: 10, task: "Débitos de estoque", completed: false },
      { id: 11, task: "Configurações para BPO", completed: false },
    ],
  });

  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    const projects: FormData[] = JSON.parse(
      localStorage.getItem("projects") || "[]"
    );
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setFormData((prevData) => ({
        ...prevData,
        ...project,
        collaboratorChecklist:
          project.collaboratorChecklist || prevData.collaboratorChecklist,
      }));
    }
  }, [projectId]);

  const handleChange = (field: keyof FormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projects: FormData[] = JSON.parse(
      localStorage.getItem("projects") || "[]"
    );
    const updatedProjects = projects.map((p) =>
      p.id === projectId ? { ...p, ...formData } : p
    );
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
    onUpdate(formData);
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      setFormData((prev) => ({
        ...prev,
        collaboratorChecklist: [
          ...prev.collaboratorChecklist,
          { id: Date.now(), task: newTask.trim(), completed: false },
        ],
      }));
      setNewTask("");
    }
  };

  const handleDeleteTask = (taskId: number) => {
    setFormData((prev) => ({
      ...prev,
      collaboratorChecklist: prev.collaboratorChecklist.filter(
        (task) => task.id !== taskId
      ),
    }));
  };

  const handleChecklistChange = (taskId: number) => {
    setFormData((prev) => ({
      ...prev,
      collaboratorChecklist: prev.collaboratorChecklist.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Detalhes Adicionais do Projeto</CardTitle>
        <CardDescription>
          Preencha as informações adicionais do projeto
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Checklist do Colaborador</Label>
            <ul className="space-y-2">
              {formData.collaboratorChecklist.map((task) => (
                <li key={task.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleChecklistChange(task.id)}
                  />
                  <span>{task.task}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
            <div className="flex space-x-2">
              <Input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Nova tarefa"
              />
              <Button type="button" onClick={handleAddTask}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Salvar Detalhes</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
