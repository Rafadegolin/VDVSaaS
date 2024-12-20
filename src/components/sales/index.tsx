import { CircleDollarSign } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function Sales() {
  return (
    <Card className="flex-1 md:w-1/2 md:max-w-[400px]">
      <CardHeader>
        <div className="flex items-center justify-center">
          <CardTitle className="text-lg sm:text-xl text-gray-800">
            Últimos clientes
          </CardTitle>
          <CircleDollarSign className="ml-auto w-4 h-4" />
        </div>
        <CardDescription>Novos clientes nas últimas 24 horas</CardDescription>
      </CardHeader>

      <CardContent>
        <article className="flex items-center gap-2 border-b py-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/rafadegolin.png" />
            <AvatarFallback>RD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm sm:text-base font-semibold">Rafael Degolin</p>
            <span className="text-[12px] sm:text-sm text-gray-400">
              rafaeldegolin26@hotmail.com
            </span>
          </div>
        </article>

        <article className="flex items-center gap-2 border-b py-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/rafadegolin.png" />
            <AvatarFallback>RD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm sm:text-base font-semibold">Rafael Degolin</p>
            <span className="text-[12px] sm:text-sm text-gray-400">
              rafaeldegolin26@hotmail.com
            </span>
          </div>
        </article>

        <article className="flex items-center gap-2 border-b py-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/rafadegolin.png" />
            <AvatarFallback>RD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm sm:text-base font-semibold">Rafael Degolin</p>
            <span className="text-[12px] sm:text-sm text-gray-400">
              rafaeldegolin26@hotmail.com
            </span>
          </div>
        </article>

        <article className="flex items-center gap-2 border-b py-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://github.com/rafadegolin.png" />
            <AvatarFallback>RD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm sm:text-base font-semibold">Rafael Degolin</p>
            <span className="text-[12px] sm:text-sm text-gray-400">
              rafaeldegolin26@hotmail.com
            </span>
          </div>
        </article>
      </CardContent>
    </Card>
  );
}
