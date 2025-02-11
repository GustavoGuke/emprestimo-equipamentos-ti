import { Edit, Undo } from "lucide-react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

const columns = [
  {
    accessorKey: "equipamento",
    header: "Equipamento"
  },
  {
    accessorKey: "identificacao",
    header: "Identificação"
  },
  {
    accessorKey: "funcionario",
    header: "Funcionário"
  },
  {
    accessorKey: "dpto",
    header: "Departamento"
  },
  {
    accessorKey: "data",
    header: "Data"
  },
  {
    accessorKey: "",
    header: "Ações"
  }
]

const formatarData = (data: string | Date) => {
  return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
  }).format(new Date(data));
};

export function EmprestimosTable({ data }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessorKey}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((emprestimo) => (
            <TableRow key={emprestimo.id}>
              <TableCell>{emprestimo.nomeEquipamento}</TableCell>
              <TableCell>{emprestimo.identificacaoEquipamento}</TableCell>
              <TableCell>{emprestimo.usuario}</TableCell>
              <TableCell>{emprestimo.departamento}</TableCell>
              <TableCell>{formatarData(emprestimo.dataEmprestimo)}</TableCell>
              <TableCell className="flex gap-2">
              <Button variant="outline" className="bg-green-700 text-gray-50"> <Undo/> Devolver</Button>
              <Button variant="outline" className="bg-orange-700 text-gray-50"> <Edit/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
