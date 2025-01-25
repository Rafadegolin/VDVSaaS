"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProductPlaceholder() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Bem-vindo à {user?.product}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            Esta solução ainda está em desenvolvimento. Obrigado pela sua
            paciência!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
