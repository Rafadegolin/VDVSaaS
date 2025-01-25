import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  ChartColumn,
  ClipboardCheck,
  ClipboardPlus,
  FileSpreadsheet,
  Home,
  LogOut,
  Package,
  PanelBottom,
  Settings2,
  ShoppingBag,
  User,
  Zap,
  SunMoon,
} from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import { useTheme } from "next-themes";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export function Sidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="flex w-full flex-col bg-muted/40">
      {/* SIDEBAR DESKTOP */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex flex-col">
        <nav className="flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Link
              href="#"
              className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#101010] text-primary-foreground rounded-full cursor-default"
            >
              <Zap className="h-4 w-4" color="#f4af0c" fill="#f4af0c" />
              <span className="sr-only">Dashboard avatar</span>
            </Link>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ChartColumn className="h-4 w-4" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/projetos"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ClipboardCheck className="h-4 w-4" />
                  <span className="sr-only">Projetos</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Projetos</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/new-project"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ClipboardPlus className="h-4 w-4" />
                  <span className="sr-only">Novo projeto</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Novo projeto</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/planilhas"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span className="sr-only">Planilhas</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Planilhas</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/profile"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <User className="h-4 w-4" />
                  <span className="sr-only">Perfil</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Perfil</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Settings2 className="h-4 w-4" />
                  <span className="sr-only">Configurações</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Configurações</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>

        <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  onClick={toggleTheme}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <SunMoon className="h-4 w-4" />
                  <span className="sr-only">Tema</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Tema</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  onClick={handleLogout}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                >
                  <LogOut className="h-4 w-4 text-red-500" />
                  <span className="sr-only">Sair</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Sair</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {user && (
            <>
              <span className="text-sm text-muted-foreground">
                {user.product}
              </span>
            </>
          )}
        </nav>
      </aside>

      {/* SIDEBAR MOBILE */}
      <div className="sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-background gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelBottom className="w-5 h-5" />
                <span className="sr-only">Abrir / fechar menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="sm:max-w-x">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="flex h-10 w-10 bg-primary rounded-full text-lg items-center justify-center text-primary-foreground md:text-base gap-2"
                  prefetch={false}
                >
                  <Zap
                    className="h-5 w-5 transition-all"
                    color="#f4af0c"
                    fill="#f4af0c"
                  />
                  <span className="sr-only">Logo do projeto</span>
                </Link>

                <Link
                  href="/dashboard"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <ChartColumn className="h-5 w-5 transition-all" />
                  Dashboard
                </Link>

                <Link
                  href="/projetos"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <ClipboardCheck className="h-5 w-5 transition-all" />
                  Projetos
                </Link>

                <Link
                  href="/new-project"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <ClipboardPlus className="h-5 w-5 transition-all" />
                  Novo projeto
                </Link>

                <Link
                  href="/planilhas"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <FileSpreadsheet className="h-5 w-5 transition-all" />
                  Planilhas
                </Link>

                <Link
                  href="/profile"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <User className="h-5 w-5 transition-all" />
                  Perfil
                </Link>

                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                >
                  <Settings2 className="h-5 w-5 transition-all" />
                  Configurações
                </Link>

                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  onClick={toggleTheme}
                >
                  <SunMoon className="h-5 w-5" />
                  Sair
                </Link>

                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  prefetch={false}
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 text-red-500" />
                  Sair
                </Link>

                {user && (
                  <>
                    <span className="text-sm text-muted-foreground">
                      {user.product}
                    </span>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
          <h2>Menu</h2>
        </header>
      </div>
    </div>
  );
}
