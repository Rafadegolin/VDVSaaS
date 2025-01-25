import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { differenceInDays } from "date-fns";
import { Plus, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Link from "next/link";

export function ProjectCard({ project, onUpdate }) {
  const [weeklyProgress, setWeeklyProgress] = useState("");
  const [newTask, setNewTask] = useState("");
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [projectDetails, setProjectDetails] = useState({
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
  });

  const calculateProgress = (checklist) => {
    if (!checklist || checklist.length === 0) return 0;
    const completedTasks = checklist.filter((task) => task.completed).length;
    return (completedTasks / checklist.length) * 100;
  };

  const calculateRemainingDays = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const remainingDays = differenceInDays(deadlineDate, today);
    return remainingDays > 0 ? remainingDays : 0;
  };

  const handleWeeklyProgressSubmit = () => {
    if (weeklyProgress.trim() === "") return; // Impede o envio de progressos vazios
    const updatedProject = {
      ...project,
      weeklyProgressEntries: [
        ...(project.weeklyProgressEntries || []),
        { date: new Date().toISOString(), content: weeklyProgress },
      ],
    };
    onUpdate(updatedProject);
    setWeeklyProgress("");
  };

  const handleClassCompletion = (className, isCompleted, collaborator) => {
    const updatedClasses = isCompleted
      ? [
          ...project.completedClasses,
          { name: className, date: new Date().toISOString(), collaborator },
        ]
      : project.completedClasses.filter((c) => c.name !== className);

    onUpdate({ ...project, completedClasses: updatedClasses });
  };

  const handleAddTask = () => {
    if (newTask.trim()) {
      const updatedProject = {
        ...project,
        checklist: [
          ...project.checklist,
          { id: Date.now(), task: newTask.trim(), completed: false },
        ],
      };
      onUpdate(updatedProject);
      setNewTask("");
    }
  };

  const handleDeleteTask = (taskId) => {
    const updatedProject = {
      ...project,
      checklist: project.checklist.filter((task) => task.id !== taskId),
    };
    onUpdate(updatedProject);
  };

  const handleChecklistChange = (taskId) => {
    const updatedProject = {
      ...project,
      checklist: project.checklist.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    };
    onUpdate(updatedProject);
  };

  const handleLeaderChecklistChange = (taskId) => {
    const updatedProject = {
      ...project,
      leaderChecklist: project.leaderChecklist.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    };
    onUpdate(updatedProject);
  };

  const handleDetailsChange = (field, value) => {
    setProjectDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleDetailsSubmit = () => {
    const updatedProject = { ...project, ...projectDetails };
    onUpdate(updatedProject);
    setIsDetailsModalOpen(false);
  };

  const handlePhaseChange = (newPhase) => {
    if (
      newPhase === "direcionamento" &&
      calculateProgress(project.checklist) < 100
    ) {
      setShowWarningModal(true);
    } else {
      onUpdate({ ...project, projectPhase: newPhase });
    }
  };

  // Checklist geral pré-definido
  const defaultChecklist = [
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
    { id: 11, task: "Configuções para BPO", completed: false },
  ];

  useEffect(() => {
    if (!project.checklist || project.checklist.length === 0) {
      onUpdate({ ...project, checklist: defaultChecklist });
    }
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl">{project.name}</CardTitle>
        <CardDescription>{project.projectPhase}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <p className="text-sm md:text-base">
            <strong>Cliente:</strong> {project.clientName}
          </p>
          <p className="text-sm md:text-base">
            <strong>Empresa:</strong> {project.companyName}
          </p>
          <p className="text-sm md:text-base">
            <strong>Prazo:</strong>{" "}
            {new Date(project.deadline).toLocaleDateString()}
          </p>
          <p className="text-sm md:text-base">
            <strong>Dias Restantes:</strong>{" "}
            {calculateRemainingDays(project.deadline)}
          </p>
          <p className="text-sm md:text-base">
            <strong>Atribuído a:</strong> {project.assignedTo}
          </p>
          <p className="text-sm md:text-base">
            <strong>Quantidade de CNPJs:</strong> {project.cnpjCount}
          </p>
          <p className="text-sm md:text-base">
            <strong>Descrição:</strong> {project.description}
          </p>
          <div>
            <p className="text-sm md:text-base">
              <strong>Progresso:</strong>
            </p>
            <Progress
              value={calculateProgress(project.checklist)}
              className="mt-2"
            />
            <p className="text-sm text-right">
              {Math.round(calculateProgress(project.checklist))}%
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectPhase">Fase do Projeto</Label>
            <Select
              onValueChange={handlePhaseChange}
              value={project.projectPhase}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a fase do projeto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="implementação">Implementação</SelectItem>
                <SelectItem value="direcionamento">Direcionamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">Ver Mais</Button>
              </DialogTrigger>
              <DialogContent className="max-w-[80vw] w-full max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{project.name}</DialogTitle>
                  <DialogDescription>{project.projectPhase}</DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-6">
                  <p>
                    <strong>Cliente:</strong> {project.clientName}
                  </p>
                  <p>
                    <strong>Empresa:</strong> {project.companyName}
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
                    <strong>Atribuído a:</strong> {project.assignedTo}
                  </p>
                  <p>
                    <strong>Quantidade de CNPJs:</strong> {project.cnpjCount}
                  </p>
                  <p>
                    <strong>CNPJ Principal:</strong> {project.mainCnpj}
                  </p>
                  <p>
                    <strong>Inscrições Estaduais:</strong>{" "}
                    {project.stateRegistrations}
                  </p>
                  <p>
                    <strong>Endereço:</strong> {project.address}
                  </p>
                  <p>
                    <strong>Cidade:</strong> {project.city}
                  </p>
                  <p>
                    <strong>Estado:</strong> {project.state}
                  </p>
                  <p>
                    <strong>CEP:</strong> {project.zipCode}
                  </p>
                  <p>
                    <strong>País:</strong> {project.country}
                  </p>
                  <p>
                    <strong>Quadro Tributário:</strong> {project.taxFramework}
                  </p>
                  <p>
                    <strong>Faturamento Mensal Médio:</strong> R${" "}
                    {project.monthlyRevenue}
                  </p>
                  <p>
                    <strong>Canal de Aquisição:</strong>{" "}
                    {project.acquisitionChannel}
                  </p>
                  <p>
                    <strong>Motivo da Decisão:</strong> {project.decisionReason}
                  </p>
                  <p>
                    <strong>Orçamento:</strong> R$ {project.budget}
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
                    <strong>Critérios de Sucesso:</strong>{" "}
                    {project.successCriteria}
                  </p>
                  <p>
                    <strong>Complexidade:</strong> {project.complexityLevel}
                  </p>
                  <p>
                    <strong>Foco Principal:</strong> {project.mainFocus}
                  </p>
                  <p>
                    <strong>Tipos de Produtos:</strong> {project.productTypes}
                  </p>
                  <p>
                    <strong>Produtos Multi-CNPJ:</strong>{" "}
                    {project.multiCnpjProducts}
                  </p>
                  <p>
                    <strong>Processo de Cadastro de Produtos:</strong>{" "}
                    {project.productRegistrationProcess}
                  </p>
                  <p>
                    <strong>Controle de Estoque:</strong>{" "}
                    {project.inventoryControl}
                  </p>
                  <p>
                    <strong>Espaço Físico:</strong> {project.physicalSpace}
                  </p>
                  <p>
                    <strong>Tipo de Nota de Entrada:</strong>{" "}
                    {project.entryNoteType}
                  </p>
                  <p>
                    <strong>Localização de Estoque:</strong>{" "}
                    {project.inventoryLocation}
                  </p>
                  <p>
                    <strong>Processo de Controle de Estoque:</strong>{" "}
                    {project.inventoryProcess}
                  </p>
                  <p>
                    <strong>Média Diária de Pedidos:</strong>{" "}
                    {project.dailyOrderAverage}
                  </p>
                  <p>
                    <strong>Código EAN:</strong> {project.eanCode}
                  </p>
                  <p>
                    <strong>Operadores de Expedição:</strong>{" "}
                    {project.dispatchOperators}
                  </p>
                  <p>
                    <strong>Marketplaces:</strong> {project.marketplaces}
                  </p>
                  <p>
                    <strong>Porte dos Produtos:</strong> {project.productSize}
                  </p>
                  <p>
                    <strong>Loja Física:</strong> {project.physicalStore}
                  </p>
                  <p>
                    <strong>Processo de Expedição:</strong>{" "}
                    {project.dispatchProcess}
                  </p>
                  <p>
                    <strong>Processos Financeiros:</strong>{" "}
                    {project.financialProcesses}
                  </p>
                  <p>
                    <strong>Uso Atual do Sistema:</strong>{" "}
                    {project.currentSystemUse}
                  </p>
                  <p>
                    <strong>Acesso ao Sistema:</strong> {project.systemAccess}
                  </p>
                  <p>
                    <strong>Informações Adicionais:</strong>{" "}
                    {project.additionalInfo}
                  </p>

                  <div>
                    <p>
                      <strong>Aulas Realizadas:</strong>
                    </p>
                    {["produtos", "fluxo diário", "estoque", "financeiro"].map(
                      (aula) => (
                        <div key={aula} className="flex items-center mt-2">
                          <Checkbox
                            id={`aula-${project.id}-${aula}`}
                            checked={project.completedClasses.some(
                              (c) => c.name === aula
                            )}
                            onCheckedChange={(checked) =>
                              handleClassCompletion(aula, checked, null)
                            }
                          />
                          <label
                            htmlFor={`aula-${project.id}-${aula}`}
                            className="ml-2"
                          >
                            {aula}
                          </label>
                          <Select
                            onValueChange={(value) =>
                              handleClassCompletion(aula, true, value)
                            }
                            value={
                              project.completedClasses.find(
                                (c) => c.name === aula
                              )?.collaborator || ""
                            }
                          >
                            <SelectTrigger className="ml-2 w-[180px]">
                              <SelectValue placeholder="Selecione o colaborador" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                "Rafael Degolin",
                                "Daniel Souza",
                                "Eduardo Gonçalves",
                                "Kauan Araujo",
                              ].map((collaborator) => (
                                <SelectItem
                                  key={collaborator}
                                  value={collaborator}
                                >
                                  {collaborator}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )
                    )}
                  </div>

                  <div>
                    <p>
                      <strong>Checklist do Líder:</strong>
                    </p>
                    <ul className="mt-2 space-y-2">
                      {project.leaderChecklist &&
                        project.leaderChecklist.map((task) => (
                          <li key={task.id} className="flex items-center">
                            <Checkbox
                              id={`leader-task-${project.id}-${task.id}`}
                              checked={task.completed}
                              onCheckedChange={() =>
                                handleLeaderChecklistChange(task.id)
                              }
                            />
                            <label
                              htmlFor={`leader-task-${project.id}-${task.id}`}
                              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {task.task}
                            </label>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div>
                    <p>
                      <strong>Checklist Geral:</strong>
                    </p>
                    <ul className="mt-2 space-y-2">
                      {project.checklist &&
                        project.checklist.map((task) => (
                          <li
                            key={task.id}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              <Checkbox
                                id={`task-${project.id}-${task.id}`}
                                checked={task.completed}
                                onCheckedChange={() =>
                                  handleChecklistChange(task.id)
                                }
                              />
                              <label
                                htmlFor={`task-${project.id}-${task.id}`}
                                className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {task.task}
                              </label>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteTask(task.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </li>
                        ))}
                    </ul>
                    <div className="flex items-center mt-2">
                      <Input
                        type="text"
                        placeholder="Nova tarefa"
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        className="mr-2"
                      />
                      <Button onClick={handleAddTask}>
                        <Plus className="h-4 w-4 mr-2" /> Adicionar
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog
              open={isDetailsModalOpen}
              onOpenChange={setIsDetailsModalOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto">
                  Adicionar Detalhes
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[80vw] w-full max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Adicionar Detalhes ao Projeto</DialogTitle>
                  <DialogDescription>
                    Preencha as informações adicionais do projeto
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeCount">Tamanho da Equipe</Label>
                    <Input
                      id="employeeCount"
                      type="text"
                      value={projectDetails.employeeCount}
                      onChange={(e) =>
                        handleDetailsChange("employeeCount", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tinyKnowledge">Conhecimento Tiny</Label>
                    <Input
                      id="tinyKnowledge"
                      type="text"
                      value={projectDetails.tinyKnowledge}
                      onChange={(e) =>
                        handleDetailsChange("tinyKnowledge", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxRegime">Regime Tributário</Label>
                    <Input
                      id="taxRegime"
                      type="text"
                      value={projectDetails.taxRegime}
                      onChange={(e) =>
                        handleDetailsChange("taxRegime", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="integratedCnpjs">CNPJs Integrados</Label>
                    <Input
                      id="integratedCnpjs"
                      type="text"
                      value={projectDetails.integratedCnpjs}
                      onChange={(e) =>
                        handleDetailsChange("integratedCnpjs", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salesChannels">Canais de Venda</Label>
                    <Input
                      id="salesChannels"
                      type="text"
                      value={projectDetails.salesChannels}
                      onChange={(e) =>
                        handleDetailsChange("salesChannels", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logisticsGateway">
                      Portal de Logística
                    </Label>
                    <Input
                      id="logisticsGateway"
                      type="text"
                      value={projectDetails.logisticsGateway}
                      onChange={(e) =>
                        handleDetailsChange("logisticsGateway", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marketplaceListings">
                      Listagens nos Marketplaces
                    </Label>
                    <Input
                      id="marketplaceListings"
                      type="text"
                      value={projectDetails.marketplaceListings}
                      onChange={(e) =>
                        handleDetailsChange(
                          "marketplaceListings",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sameProductBase">
                      Mesma Base de Produtos
                    </Label>
                    <Input
                      id="sameProductBase"
                      type="text"
                      value={projectDetails.sameProductBase}
                      onChange={(e) =>
                        handleDetailsChange("sameProductBase", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mostCompleteMarketplace">
                      Marketplace Mais Completo
                    </Label>
                    <Input
                      id="mostCompleteMarketplace"
                      type="text"
                      value={projectDetails.mostCompleteMarketplace}
                      onChange={(e) =>
                        handleDetailsChange(
                          "mostCompleteMarketplace",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="skuCodes">Códigos SKU</Label>
                    <Input
                      id="skuCodes"
                      type="text"
                      value={projectDetails.skuCodes}
                      onChange={(e) =>
                        handleDetailsChange("skuCodes", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="duplicateListings">
                      Listagens Duplicadas
                    </Label>
                    <Input
                      id="duplicateListings"
                      type="text"
                      value={projectDetails.duplicateListings}
                      onChange={(e) =>
                        handleDetailsChange("duplicateListings", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kitListings">Listagens em Kits</Label>
                    <Input
                      id="kitListings"
                      type="text"
                      value={projectDetails.kitListings}
                      onChange={(e) =>
                        handleDetailsChange("kitListings", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kitComponents">Componentes dos Kits</Label>
                    <Input
                      id="kitComponents"
                      type="text"
                      value={projectDetails.kitComponents}
                      onChange={(e) =>
                        handleDetailsChange("kitComponents", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="kitParticularities">
                      Particularidades dos Kits
                    </Label>
                    <Input
                      id="kitParticularities"
                      type="text"
                      value={projectDetails.kitParticularities}
                      onChange={(e) =>
                        handleDetailsChange(
                          "kitParticularities",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="measurementUnits">Unidades de Medida</Label>
                    <Input
                      id="measurementUnits"
                      type="text"
                      value={projectDetails.measurementUnits}
                      onChange={(e) =>
                        handleDetailsChange("measurementUnits", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="productBasePreference">
                      Preferência da Base de Produtos
                    </Label>
                    <Input
                      id="productBasePreference"
                      type="text"
                      value={projectDetails.productBasePreference}
                      onChange={(e) =>
                        handleDetailsChange(
                          "productBasePreference",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="importantFunctions">
                      Funções Importantes
                    </Label>
                    <Input
                      id="importantFunctions"
                      type="text"
                      value={projectDetails.importantFunctions}
                      onChange={(e) =>
                        handleDetailsChange(
                          "importantFunctions",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="internalInventoryControl">
                      Controle de Estoque Interno
                    </Label>
                    <Input
                      id="internalInventoryControl"
                      type="text"
                      value={projectDetails.internalInventoryControl}
                      onChange={(e) =>
                        handleDetailsChange(
                          "internalInventoryControl",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="marketplaceInventoryControl">
                      Controle de Estoque nos Marketplaces
                    </Label>
                    <Input
                      id="marketplaceInventoryControl"
                      type="text"
                      value={projectDetails.marketplaceInventoryControl}
                      onChange={(e) =>
                        handleDetailsChange(
                          "marketplaceInventoryControl",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="entryNoteAvailability">
                      Disponibilidade de Nota de Entrada
                    </Label>
                    <Input
                      id="entryNoteAvailability"
                      type="text"
                      value={projectDetails.entryNoteAvailability}
                      onChange={(e) =>
                        handleDetailsChange(
                          "entryNoteAvailability",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="orderFlow">Fluxo de Pedidos</Label>
                    <Input
                      id="orderFlow"
                      type="text"
                      value={projectDetails.orderFlow}
                      onChange={(e) =>
                        handleDetailsChange("orderFlow", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expectedDispatchProcess">
                      Processo de Expedição Esperado
                    </Label>
                    <Input
                      id="expectedDispatchProcess"
                      type="text"
                      value={projectDetails.expectedDispatchProcess}
                      onChange={(e) =>
                        handleDetailsChange(
                          "expectedDispatchProcess",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invoicesForAllSales">
                      Notas Fiscais para Todas as Vendas
                    </Label>
                    <Input
                      id="invoicesForAllSales"
                      type="text"
                      value={projectDetails.invoicesForAllSales}
                      onChange={(e) =>
                        handleDetailsChange(
                          "invoicesForAllSales",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentInvoiceIssuance">
                      Emissão de Notas Fiscais Atual
                    </Label>
                    <Input
                      id="currentInvoiceIssuance"
                      type="text"
                      value={projectDetails.currentInvoiceIssuance}
                      onChange={(e) =>
                        handleDetailsChange(
                          "currentInvoiceIssuance",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentInvoicePrinting">
                      Impressão de Notas Fiscais Atual
                    </Label>
                    <Input
                      id="currentInvoicePrinting"
                      type="text"
                      value={projectDetails.currentInvoicePrinting}
                      onChange={(e) =>
                        handleDetailsChange(
                          "currentInvoicePrinting",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currentLabelPrinting">
                      Impressão de Etiquetas Atual
                    </Label>
                    <Input
                      id="currentLabelPrinting"
                      type="text"
                      value={projectDetails.currentLabelPrinting}
                      onChange={(e) =>
                        handleDetailsChange(
                          "currentLabelPrinting",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="thermalPrinter">Impressora Térmica</Label>
                    <Input
                      id="thermalPrinter"
                      type="text"
                      value={projectDetails.thermalPrinter}
                      onChange={(e) =>
                        handleDetailsChange("thermalPrinter", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tinyParallelUse">Uso Paralelo Tiny</Label>
                    <Input
                      id="tinyParallelUse"
                      type="text"
                      value={projectDetails.tinyParallelUse}
                      onChange={(e) =>
                        handleDetailsChange("tinyParallelUse", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="implementationType">
                      Tipo de Implementação
                    </Label>
                    <Input
                      id="implementationType"
                      type="text"
                      value={projectDetails.implementationType}
                      onChange={(e) =>
                        handleDetailsChange(
                          "implementationType",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="importantObservations">
                      Observações Importantes
                    </Label>
                    <Textarea
                      id="importantObservations"
                      value={projectDetails.importantObservations}
                      onChange={(e) =>
                        handleDetailsChange(
                          "importantObservations",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
                <Button onClick={handleDetailsSubmit} className="mt-4">
                  Salvar Detalhes
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-4">
            <Label htmlFor={`weekly-progress-${project.id}`}>
              Progresso Semanal
            </Label>
            <Textarea
              id={`weekly-progress-${project.id}`}
              value={weeklyProgress}
              onChange={(e) => setWeeklyProgress(e.target.value)}
              placeholder="Resumo do progresso desta semana..."
              className="mt-2"
            />
            <Button
              onClick={handleWeeklyProgressSubmit}
              className="mt-2 w-full sm:w-auto"
            >
              Enviar Progresso
            </Button>
          </div>

          {project.weeklyProgressEntries &&
            project.weeklyProgressEntries.length > 0 && (
              <div className="mt-4">
                <p className="text-sm md:text-base">
                  <strong>Histórico de Progresso Semanal:</strong>
                </p>
                <div className="mt-2 max-h-[200px] overflow-y-auto">
                  {project.weeklyProgressEntries.map((entry, index) => (
                    <div
                      key={index}
                      className="mb-2 p-2 bg-secondary rounded-md"
                    >
                      <p className="text-xs md:text-sm font-medium">
                        {new Date(entry.date).toLocaleDateString()}
                      </p>
                      <p className="text-xs md:text-sm">{entry.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      </CardContent>
      <AlertDialog open={showWarningModal} onOpenChange={setShowWarningModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Aviso</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja avançar o projeto para direcionamento?
              Ainda não atingiu 100% do progresso.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600"
              onClick={() => {
                onUpdate({ ...project, projectPhase: "direcionamento" });
                setShowWarningModal(false);
              }}
            >
              Confirmar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
