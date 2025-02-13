
import { Edit, Undo, Undo2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import { EditarEmprestimo } from "./EditarEmprestimo";



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
    accessorKey: "responsavel",
    header: "Responsável"
  },
  {
    accessorKey: "acao",
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

interface EmprestimosTableProps {

  id: number;
  nomeEquipamento: string;
  usuario: string;
  departamento: string;
  responsavelEmprestimo: string;
  dataEmprestimo: Date;
  identificacaoEquipamento: string | undefined;
  devolvido: boolean;
  dataDevolucao: Date | null;
  responsavelDevolucao: string | null;
  equipamentoId: number;

}

export async function EmprestimosTable({ getEmprestimos, equipamentos }: any) {
  
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
          {getEmprestimos.map((emprestimo: EmprestimosTableProps) => (
            <TableRow key={emprestimo.id}>
              <TableCell>{emprestimo.nomeEquipamento}</TableCell>
              <TableCell>{emprestimo.identificacaoEquipamento}</TableCell>
              <TableCell>{emprestimo.usuario}</TableCell>
              <TableCell>{emprestimo.departamento}</TableCell>
              <TableCell>{formatarData(emprestimo.dataEmprestimo)}</TableCell>
              <TableCell>{emprestimo.responsavelEmprestimo}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant="outline" className="bg-gray-700 text-gray-50 hover:bg-gray-400"> <Undo2 /></Button>
                <EditarEmprestimo equipamento={equipamentos} {...emprestimo} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
