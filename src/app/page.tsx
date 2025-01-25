"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import Logo from "../images/logo.png";

interface User {
  email: string;
  password: string;
  product: string;
}

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [product, setProduct] = useState<string>("");
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) {
      toast({
        title: "Erro",
        description: "Por favor, selecione um produto.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    isLogin ? handleLogin() : handleRegister();
  };

  const handleLogin = () => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) =>
        u.email === email && u.password === password && u.product === product
    );

    if (user) {
      login({ email: user.email, product: user.product });
      toast({
        title: "Login bem-sucedido",
        description: `Bem-vindo à solução ${product}!`,
        duration: 3000,
      });
      if (product === "THUB") {
        router.push("/dashboard");
      } else {
        router.push("/product-placeholder");
      }
    } else {
      toast({
        title: "Erro de login",
        description: "Email, senha ou produto incorretos.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const handleRegister = () => {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.some((u) => u.email === email)) {
      toast({
        title: "Erro de registro",
        description: "Este email já está registrado.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    const newUser: User = { email, password, product };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    toast({
      title: "Registro bem-sucedido",
      description: "Sua conta foi criada. Você pode fazer login agora.",
      duration: 3000,
    });
    setIsLogin(true);
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 md:p-8">
      <div className="container flex flex-col gap-8 md:flex-row md:items-center md:gap-16">
        {/* Left side - Logo and description */}
        <div className="flex flex-col items-center text-center md:w-1/2 md:items-start md:text-left">
          <div className="relative mb-8 h-72 w-72">
            <Image
              src={Logo}
              alt="Logo"
              fill
              className="object-contain bg-black"
              priority
            />
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Gerenciador de Projetos
          </h1>
          <p className="text-lg text-muted-foreground">
            Uma ferramenta completa para gerenciamento de projetos internos.
            Acompanhe o progresso, gerencie tarefas e transforme dados com
            facilidade.
          </p>
        </div>

        {/* Right side - Login/Register form */}
        <Card className="md:w-1/2">
          <CardHeader>
            <CardTitle>
              {isLogin ? "Acesse sua conta" : "Crie sua conta"}
            </CardTitle>
            <CardDescription>
              {isLogin
                ? "Entre com seu email e senha"
                : "Registre-se para começar"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="******"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product">Produto</Label>
                <Select value={product} onValueChange={setProduct} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o produto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="THUB">THUB</SelectItem>
                    <SelectItem value="VDV Performance">
                      VDV Performance
                    </SelectItem>
                    <SelectItem value="BPO financeiro">
                      BPO financeiro
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full" size="lg" type="submit">
                {isLogin ? "Entrar" : "Registrar"}
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {isLogin ? "Não possui conta?" : "Já possui conta?"}
                  </span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full"
                size="lg"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Criar nova conta" : "Fazer login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
