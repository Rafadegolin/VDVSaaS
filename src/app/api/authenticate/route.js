import { GoogleAuth } from "google-auth-library";

export async function POST(req) {
  try {
    const auth = new GoogleAuth({
      keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Caminho para o arquivo JSON
      scopes: ["https://www.googleapis.com/auth/cloud-platform"],
    });

    const client = await auth.getClient();
    const token = await client.getAccessToken();

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao autenticar:", error.message);
    return new Response(
      JSON.stringify({ error: "Erro ao gerar o token de autenticação" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
