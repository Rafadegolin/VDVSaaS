"use client";

import { useState, useEffect } from "react";
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
  apiEndpoint: string;
}

export function SpreadsheetTransformer({
  title,
  description,
  apiEndpoint,
}: SpreadsheetTransformerProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setMessage(null);
  };

  const transformSpreadsheet = async () => {
    if (!file) {
      setMessage({ type: "error", text: "Por favor, selecione um arquivo." });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("uploadedFile", file);

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: data.message });
      } else {
        setMessage({ type: "error", text: `Erro: ${data.error}` });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erro ao processar a planilha." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMessage(null);
  }, [file]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className="text-sm font-medium">Arquivo de planilha</p>
          <div className="space-y-4">
            <input
              id={`file-upload-${title}`}
              type="file"
              onChange={handleFileChange}
              accept=".xlsx,.xls"
              className="hidden"
            />
            <div className="space-y-2">
              <Button
                onClick={() =>
                  document.getElementById(`file-upload-${title}`)?.click()
                }
                variant="outline"
                className="w-40"
              >
                Selecionar arquivo
              </Button>
              {file && (
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-muted-foreground">
                    Arquivo selecionado: {file.name}
                  </p>
                  <button
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700"
                    aria-label="Remover arquivo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <Button
              onClick={transformSpreadsheet}
              disabled={isLoading || !file}
              variant="secondary"
              className="w-40"
            >
              {isLoading ? "Processando..." : "Transformar Planilha"}
            </Button>
          </div>
        </div>
        {message && (
          <p
            className={`text-sm ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
