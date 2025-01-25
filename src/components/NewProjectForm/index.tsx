"use client";

import { useState } from "react";
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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";

interface ChecklistItem {
  id: number;
  task: string;
  completed: boolean;
}

interface FormData {
  clientName: string;
  companyName: string;
  cnpjCount: string;
  mainCnpj: string;
  stateRegistrations: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  taxFramework: string;
  monthlyRevenue: string;
  acquisitionChannel: string;
  decisionReason: string;
  successCriteria: string;
  productTypes: string;
  multiCnpjProducts: string;
  productRegistrationProcess: string;
  inventoryControl: string;
  physicalSpace: string;
  entryNoteType: string;
  inventoryLocation: string;
  inventoryProcess: string;
  dailyOrderAverage: string;
  eanCode: string;
  dispatchOperators: string;
  marketplaces: string;
  productSize: string;
  physicalStore: string;
  dispatchProcess: string;
  financialProcesses: string;
  currentSystemUse: string;
  systemAccess: string;
  additionalInfo: string;
  assignedTo: string;
  deadline: Date;
}

export function NewProjectForm() {
  const router = useRouter();

  const initialLeaderChecklist: ChecklistItem[] = [
    {
      id: 1,
      task: "Call de Alinhamento com a Thais - Boas Vindas a T.HUB",
      completed: false,
    },
    {
      id: 2,
      task: "Criar grupo com os responsáveis pela implementação da empresa",
      completed: false,
    },
    {
      id: 3,
      task: "Enviar link do formulário de onboarding",
      completed: false,
    },
    {
      id: 4,
      task: "Perguntar se o cliente já tem as contas do Tiny",
      completed: false,
    },
    {
      id: 5,
      task: "Se não tiver contas do Tiny, solicitar criação e enviar cupom de desconto",
      completed: false,
    },
    {
      id: 6,
      task: "Solicitar ao cliente criação de cadastro na Kiwify",
      completed: false,
    },
    {
      id: 7,
      task: "Liberar acesso da área de membros na Kiwify",
      completed: false,
    },
    {
      id: 8,
      task: "Colocar responsável da empresa no grupo de Avisos THUB",
      completed: false,
    },
    {
      id: 9,
      task: "Agendar reunião de alinhamento para início de setup",
      completed: false,
    },
  ];

  const [formData, setFormData] = useState<FormData>({
    clientName: "",
    companyName: "",
    cnpjCount: "",
    mainCnpj: "",
    stateRegistrations: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    taxFramework: "",
    monthlyRevenue: "",
    acquisitionChannel: "",
    decisionReason: "",
    successCriteria: "",
    productTypes: "",
    multiCnpjProducts: "",
    productRegistrationProcess: "",
    inventoryControl: "",
    physicalSpace: "",
    entryNoteType: "",
    inventoryLocation: "",
    inventoryProcess: "",
    dailyOrderAverage: "",
    eanCode: "",
    dispatchOperators: "",
    marketplaces: "",
    productSize: "",
    physicalStore: "",
    dispatchProcess: "",
    financialProcesses: "",
    currentSystemUse: "",
    systemAccess: "",
    additionalInfo: "",
    assignedTo: "",
    deadline: new Date(),
  });

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projects: any[] = JSON.parse(
      localStorage.getItem("projects") || "[]"
    );
    const newProject = {
      ...formData,
      id: Date.now(),
      status: "To Do",
      projectPhase: "implementação",
      leaderChecklist: initialLeaderChecklist,
      collaboratorChecklist: [],
      checklist: [],
    };
    projects.push(newProject);
    localStorage.setItem("projects", JSON.stringify(projects));
    router.push("/projetos");
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Formulário de Projeto</CardTitle>
        <CardDescription>
          Preencha as informações iniciais do projeto coletadas na reunião de
          onboarding.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          {/* Campos do formulário */}
          <div className="space-y-2">
            <Label htmlFor="clientName">Nome do cliente</Label>
            <Input
              id="clientName"
              value={formData.clientName}
              onChange={(e) => handleChange("clientName", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyName">Nome fantasia da empresa</Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assignedTo">Atribuir a</Label>
            <Select
              onValueChange={(value) => handleChange("assignedTo", value)}
              value={formData.assignedTo}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um colaborador" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Rafael Degolin</SelectItem>
                <SelectItem value="2">Daniel Souza</SelectItem>
                <SelectItem value="3">Eduardo Gonçalves</SelectItem>
                <SelectItem value="4">Cauã Araujo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="deadline">Prazo do Projeto</Label>
            <DatePicker
              selected={formData.deadline}
              onChange={(date) => handleChange("deadline", date)}
              dateFormat="dd/MM/yyyy"
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cnpjCount">
              Quantidade de CNPJs a serem integrados
            </Label>
            <Input
              id="cnpjCount"
              type="number"
              value={formData.cnpjCount}
              onChange={(e) => handleChange("cnpjCount", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mainCnpj">Qual o CNPJ principal</Label>
            <Input
              id="mainCnpj"
              type="number"
              value={formData.mainCnpj}
              onChange={(e) => handleChange("mainCnpj", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stateRegistrations">
              Quais inscrições estaduais de cada CNPJ
            </Label>
            <Input
              id="stateRegistrations"
              type="number"
              value={formData.stateRegistrations}
              onChange={(e) =>
                handleChange("stateRegistrations", e.target.value)
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Endereço</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="city">Cidade</Label>
            <Input
              id="city"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">Estado</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode">CEP</Label>
            <Input
              id="zipCode"
              type="number"
              value={formData.zipCode}
              onChange={(e) => handleChange("zipCode", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country">País</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="taxFramework">
              Qual o quadro tributário da empresa
            </Label>
            <Input
              id="taxFramework"
              value={formData.taxFramework}
              onChange={(e) => handleChange("taxFramework", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthlyRevenue">
              Qual a média de faturamento mensal hoje
            </Label>
            <Input
              id="monthlyRevenue"
              type="number"
              value={formData.monthlyRevenue}
              onChange={(e) => handleChange("monthlyRevenue", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="acquisitionChannel">Como chegou até a THUB</Label>
            <Input
              id="acquisitionChannel"
              value={formData.acquisitionChannel}
              onChange={(e) =>
                handleChange("acquisitionChannel", e.target.value)
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="decisionReason">
              O que fez com que você tenha tomado a decisão de participar desse
              programa ao invés de optar por outra solução no mercado
            </Label>
            <Textarea
              id="decisionReason"
              value={formData.decisionReason}
              onChange={(e) => handleChange("decisionReason", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="successCriteria">
              O que precisa acontecer durante esse programa para que você sinta
              que valeu muito a pena?
            </Label>
            <Textarea
              id="successCriteria"
              value={formData.successCriteria}
              onChange={(e) => handleChange("successCriteria", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productTypes">
              Como são os cadastros de produtos hoje? Existem produtos simples,
              kits, variações ou fabricados?
            </Label>
            <Textarea
              id="productTypes"
              value={formData.productTypes}
              onChange={(e) => handleChange("productTypes", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="multiCnpjProducts">
              Caso tenha mais de 1 CNPJ, pretende utilizar a mesma base de
              produtos ou serão diferentes?
            </Label>
            <Input
              id="multiCnpjProducts"
              value={formData.multiCnpjProducts}
              onChange={(e) =>
                handleChange("multiCnpjProducts", e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productRegistrationProcess">
              Já possui um processo definido para os cadastros dos seus
              produtos?
            </Label>
            <Input
              id="productRegistrationProcess"
              value={formData.productRegistrationProcess}
              onChange={(e) =>
                handleChange("productRegistrationProcess", e.target.value)
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="inventoryControl">
              Já controla o estoque dos seus produtos, se sim, como?
            </Label>
            <Textarea
              id="inventoryControl"
              value={formData.inventoryControl}
              onChange={(e) => handleChange("inventoryControl", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="physicalSpace">
              Como é seu espaço físico? Como organiza seu estoque?
            </Label>
            <Textarea
              id="physicalSpace"
              value={formData.physicalSpace}
              onChange={(e) => handleChange("physicalSpace", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="entryNoteType">
              Trabalha com nota de entrada 100% ou meia nota?
            </Label>
            <Select
              onValueChange={(value) => handleChange("entryNoteType", value)}
              value={formData.entryNoteType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de nota de entrada" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="100%">100%</SelectItem>
                <SelectItem value="meia">Meia nota</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="inventoryLocation">
              Tem localização de estoque?
            </Label>
            <Select
              onValueChange={(value) =>
                handleChange("inventoryLocation", value)
              }
              value={formData.inventoryLocation}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione se tem localização de estoque" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sim">Sim</SelectItem>
                <SelectItem value="nao">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="inventoryProcess">
              Já possui um processo definido para controle de estoque?
            </Label>
            <Input
              id="inventoryProcess"
              value={formData.inventoryProcess}
              onChange={(e) => handleChange("inventoryProcess", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dailyOrderAverage">
              Qual a média diária de pedidos?
            </Label>
            <Input
              id="dailyOrderAverage"
              type="number"
              value={formData.dailyOrderAverage}
              onChange={(e) =>
                handleChange("dailyOrderAverage", e.target.value)
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="eanCode">Seus produtos possuem código EAN?</Label>
            <Select
              onValueChange={(value) => handleChange("eanCode", value)}
              value={formData.eanCode}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione se os produtos possuem código EAN" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sim">Sim</SelectItem>
                <SelectItem value="nao">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="dispatchOperators">
              Possui quantos operadores em sua expedição?
            </Label>
            <Input
              id="dispatchOperators"
              type="number"
              value={formData.dispatchOperators}
              onChange={(e) =>
                handleChange("dispatchOperators", e.target.value)
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="marketplaces">
              Quais marketplace's você trabalha hoje?
            </Label>
            <Input
              id="marketplaces"
              value={formData.marketplaces}
              onChange={(e) => handleChange("marketplaces", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productSize">Qual o porte dos seus produtos?</Label>
            <Select
              onValueChange={(value) => handleChange("productSize", value)}
              value={formData.productSize}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o porte dos produtos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pequeno">Pequeno</SelectItem>
                <SelectItem value="medio">Médio</SelectItem>
                <SelectItem value="grande">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="physicalStore">
              Possui loja física? Pretende utilizar o Olist ERP como PDV?
            </Label>
            <Textarea
              id="physicalStore"
              value={formData.physicalStore}
              onChange={(e) => handleChange("physicalStore", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dispatchProcess">
              Já possui um processo de expedição definido?
            </Label>
            <Input
              id="dispatchProcess"
              value={formData.dispatchProcess}
              onChange={(e) => handleChange("dispatchProcess", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="financialProcesses">
              Já possui processos financeiros definidos?
            </Label>
            <Input
              id="financialProcesses"
              value={formData.financialProcesses}
              onChange={(e) =>
                handleChange("financialProcesses", e.target.value)
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentSystemUse">
              Atualmente utiliza o sistema para alguma demanda financeira?
            </Label>
            <Input
              id="currentSystemUse"
              value={formData.currentSystemUse}
              onChange={(e) => handleChange("currentSystemUse", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="systemAccess">
              Atualmente utiliza o sistema para alguma demanda da empresa ou
              teremos acesso livre para implementar?
            </Label>
            <Textarea
              id="systemAccess"
              value={formData.systemAccess}
              onChange={(e) => handleChange("systemAccess", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">
              Informações adicionais relevantes
            </Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => handleChange("additionalInfo", e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Criar Projeto</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
