"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Sample data - in a real app, this would come from your backend
const initialRequests = [
  {
    id: 1,
    name: "Colaborador Fera",
    dateJoined: "Jan 09, 2025",
    universityId: "3333",
    status: "PENDENTE",
    idCardUrl: "https://example.com/id/3333",
  },
  {
    id: 2,
    name: "Faizan",
    dateJoined: "Jan 09, 2025",
    universityId: "22222",
    status: "APROVADO",
    idCardUrl: "https://example.com/id/22222",
  },
  {
    id: 3,
    name: "JSM",
    dateJoined: "Jan 09, 2025",
    universityId: "111111",
    status: "PENDENTE",
    idCardUrl: "https://example.com/id/111111",
  },
  {
    id: 4,
    name: "Adrian | JS Mastery",
    dateJoined: "Jan 09, 2025",
    universityId: "167128",
    status: "PENDENTE",
    idCardUrl: "https://example.com/id/167128",
  },
  {
    id: 5,
    name: "Tidbits",
    dateJoined: "Jan 09, 2025",
    universityId: "987654321",
    status: "PENDENTE",
    idCardUrl: "https://example.com/id/987654321",
  },
];

export function AdminDashboard() {
  const [requests, setRequests] = useState(initialRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIdCard, setSelectedIdCard] = useState<string | null>(null);

  const filteredRequests = requests.filter(
    (request) =>
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.universityId.includes(searchQuery)
  );

  const handleApprove = (id: number) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: "APROVADO" } : request
      )
    );
  };

  const handleRevoke = (id: number) => {
    setRequests(
      requests.map((request) =>
        request.id === id ? { ...request, status: "REVOGADO" } : request
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Pedidos de criação de usuário</h2>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Data criação</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>ID foto</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow key={request.id}>
                <TableCell>{request.name}</TableCell>
                <TableCell>{request.dateJoined}</TableCell>
                <TableCell>{request.universityId}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center text-blue-500 hover:text-blue-700"
                        onClick={() => setSelectedIdCard(request.idCardUrl)}
                      >
                        Ver ID Foto <Eye className="ml-2 h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>ID Foto</DialogTitle>
                        <DialogDescription>
                          ID Foto de {request.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4">
                        <img
                          src={request.idCardUrl || "/placeholder.svg"}
                          alt={`${request.name}'s ID Card`}
                          className="w-full max-h-96 object-contain"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      request.status === "APROVADO"
                        ? "bg-green-100 text-green-800"
                        : request.status === "REVOGADO"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {request.status}
                  </span>
                </TableCell>
                <TableCell>
                  {request.status === "PENDENTE" && (
                    <Button
                      onClick={() => handleApprove(request.id)}
                      className="bg-green-500 hover:bg-green-600 text-white mr-2"
                    >
                      Aprovar conta
                    </Button>
                  )}
                  {request.status === "APROVADO" && (
                    <Button
                      onClick={() => handleRevoke(request.id)}
                      variant="destructive"
                    >
                      Revogar conta
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
