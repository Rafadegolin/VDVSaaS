"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabaseClient";

export function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        alert("Verifique seu e-mail para confirmar o registro.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        // Redirecionar para o dashboard após o login bem-sucedido
        window.location.href = "/dashboard";
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{isSignUp ? "Registrar" : "Login"}</CardTitle>
        <CardDescription>
          {isSignUp ? "Crie sua conta para começar" : "Entre na sua conta"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleAuth}>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? "Carregando..." : isSignUp ? "Registrar" : "Entrar"}
          </Button>
          <Button
            className="mt-2 w-full"
            variant="outline"
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Já tem uma conta? Entre"
              : "Não tem uma conta? Registre-se"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
