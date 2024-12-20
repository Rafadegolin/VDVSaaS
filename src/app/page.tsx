import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "../images/logo.png";

export default function Home() {
  return (
    <main className="sm:ml-14 p-4">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 md:p-8">
        <div className="container flex flex-col gap-8 md:flex-row md:items-center md:gap-16">
          {/* LADO ESQUERDO */}
          <div className="flex flex-col items-center text-center md:w-1/2 md:items-start md:text-left">
            <div className="relative mb-8 h-[200px] w-[200px] bg-black rounded-full">
              <Image
                src={Logo}
                alt="Logo VDV Group"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="mb-4 text-4xl font-bold tracking-tight">
              Sistema Integrado VDV
            </h1>
            <p className="text-lg text-muted-foreground">
              Uma ferramenta completa para gerenciamento de projetos internos.
              Acompanhe o progresso, gerencie tarefas e transforme dados com
              facilidade.
            </p>
          </div>

          {/* LADO DIRETO */}
          <Card className="md:w-1/2">
            <CardHeader>
              <CardTitle className="font-bold">Acesse sua conta</CardTitle>
              <CardDescription>
                Entre com seu email e senha ou crie uma nova conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input id="password" type="password" />
                </div>
                <Button className="w-full" size="lg">
                  Entrar
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Não possui acesso?
                    </span>
                  </div>
                </div>
                <Button variant="outline" className="w-full" size="lg">
                  Criar nova conta
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
