import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ClientLayout from "./clientLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sistema Integrado VDV Group",
  description:
    "Um sistema centralizado de gerenciamento de projetos da VDV Group",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        {/* Passa o conteúdo para o ClientLayout */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
