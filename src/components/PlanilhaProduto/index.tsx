"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { X } from "lucide-react";

interface SpreadsheetTransformerProps {
  title: string;
  description: string;
}

export function SpreadsheetTransformer({
  title,
  description,
}: SpreadsheetTransformerProps) {
  const apiEndpoint =
    "https://southamerica-east1-vdvgroup-442412.cloudfunctions.net/spreedsheet-transform";
  const [files, setFiles] = useState<{
    base: File | null;
    transform: File | null;
  }>({
    base: null,
    transform: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleFileChange =
    (type: "base" | "transform") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        setFiles((prev) => ({ ...prev, [type]: selectedFile }));
      }
    };

  const removeFile = (type: "base" | "transform") => {
    setFiles((prev) => ({ ...prev, [type]: null }));
  };

  const transformSpreadsheet = async () => {
    if (!files.base || !files.transform) {
      setMessage({
        type: "error",
        text: "Por favor, selecione ambas as planilhas.",
      });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("base_file", files.base);
    formData.append("transform_file", files.transform);

    try {
      // Obter o token de autenticação da API Route
      const authResponse = await fetch("/api/authenticate", {
        method: "POST",
      });
      const authData = await authResponse.json();

      if (!authResponse.ok) {
        throw new Error(authData.error || "Erro ao autenticar");
      }

      const token = authData.token;

      // Fazer a requisição para o Cloud Run
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = "planilha_transformada.xlsx";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        setMessage({
          type: "success",
          text: "Planilha transformada com sucesso!",
        });
      } else {
        const errorText = await response.text();
        setMessage({
          type: "error",
          text: `Erro ao processar as planilhas: ${errorText}`,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Erro ao conectar com o servidor.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm font-bold">Base de produtos</p>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange("base")}
            hidden
            id="base-file"
          />
          <Button onClick={() => document.getElementById("base-file")?.click()}>
            Selecionar Base
          </Button>
          {files.base && (
            <div className="flex items-center space-x-2">
              <span>{files.base.name}</span>
              <button
                onClick={() => removeFile("base")}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div>
          <p className="text-sm font-bold">Planilha a transformar</p>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange("transform")}
            hidden
            id="transform-file"
          />
          <Button
            onClick={() => document.getElementById("transform-file")?.click()}
          >
            Selecionar Planilha
          </Button>
          {files.transform && (
            <div className="flex items-center space-x-2">
              <span>{files.transform.name}</span>
              <button
                onClick={() => removeFile("transform")}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <Button onClick={transformSpreadsheet} disabled={isLoading}>
          {isLoading ? "Processando..." : "Transformar Planilha"}
        </Button>

        {message && (
          <p
            className={`text-sm font-bold ${
              message.type === "success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {message.text}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
