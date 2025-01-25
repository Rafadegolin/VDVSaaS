"use client";

import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/";

  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="flex flex-col min-h-screen">
          {!isLoginPage && <Sidebar />}
          <main className="flex-grow container mx-auto p-4 md:p-6">
            {children}
          </main>
          <Toaster />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}
