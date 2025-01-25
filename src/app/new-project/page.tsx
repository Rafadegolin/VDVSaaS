import { NewProjectForm } from "@/components/NewProjectForm";

export default function NovoProjeto() {
  return (
    <main className="sm:ml-14 p-4">
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-bold mb-6">Novo projeto - Onboarding</h1>
        <NewProjectForm />
      </div>
    </main>
  );
}
