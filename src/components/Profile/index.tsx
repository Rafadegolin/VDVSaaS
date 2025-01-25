"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

interface User {
  email: string;
  product?: string;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  position: string;
  avatarUrl?: string;
  entrega?: string;
}

export function Profile() {
  const { user, login } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      const users: UserData[] = JSON.parse(
        localStorage.getItem("users") || "[]"
      );
      const userData = users.find((u) => u.email === user.email);

      if (userData) {
        setName(userData.name || "");
        setEmail(userData.email || "");
        setPassword(userData.password || "");
        setPosition(userData.position || "");
        setAvatarUrl(userData.avatarUrl || "");
      }
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users: UserData[] = JSON.parse(localStorage.getItem("users") || "[]");
    const updatedUsers = users.map((u) => {
      if (u.email === user?.email) {
        return {
          ...u,
          name,
          email,
          password: newPassword || u.password,
          position,
          entrega: user?.product || "",
          avatarUrl,
        };
      }
      return u;
    });

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    login({ email, product: user?.product || "" });
    toast({
      title: "Perfil atualizado",
      description: "Suas informações foram atualizadas com sucesso.",
      duration: 3000,
    });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Perfil do Usuário</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={avatarUrl} alt={name} />
              <AvatarFallback>
                {name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Label
              htmlFor="avatar"
              className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2"
            >
              Alterar Foto
            </Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha Atual</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                  placeholder="********"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova Senha</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Cargo</Label>
              <Input
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="entrega">Entrega</Label>
              <Input id="entrega" value={user?.product || ""} disabled />
            </div>
          </div>
          <Link href="/admin" className="w-full">
            <Button variant="outline" className="w-full mb-4  mt-6">
              Admin Dashboard
            </Button>
          </Link>
          <Button type="submit" className="w-full">
            Atualizar Perfil
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
