import { SpreadsheetTransformer } from "@/components/PlanilhaProduto";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transforme sua planilha",
  description: "Transforme a planilha do Bling para o modelo do Tiny",
};

export default function TransformarPlanilhas() {
  return (
    <main className="sm:ml-14 p-4">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">
          Transformar planilha do Bling para Tiny
        </h1>
        <p className="text-lg mb-8">
          Faça o upload da planilha que deseja transformar.
        </p>
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <SpreadsheetTransformer
            title="Produtos Simples"
            description="Faça upload da planilha para transformá-la"
            apiEndpoint="https://REGION-PROJECT.cloudfunctions.net/transformar_planilha"
          />

          <SpreadsheetTransformer
            title="Produtos Variações"
            description="Faça upload da planilha para transformá-la"
            apiEndpoint="/api/transform-spreadsheet/variation-products"
          />
        </section>
      </div>
    </main>
  );
}
