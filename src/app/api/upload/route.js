export async function POST(req) {
  try {
    const formData = await req.formData();

    const baseFile = formData.get("base_file");
    const transformFile = formData.get("transform_file");

    // Aqui você pode processar os arquivos enviados
    return new Response(
      JSON.stringify({ message: "Upload realizado com sucesso!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Erro ao fazer upload:", error.message);
    return new Response(
      JSON.stringify({ error: "Erro ao processar o upload" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
