import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

import { EditarEmprestimo } from "./EditarEmprestimo";
import ButtonDevolver from "./ButtonDevolver";
import { formatarData } from "../utils/formatarData";



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


export interface EmprestimosTableProps {

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
                <ButtonDevolver {...emprestimo} />
                <EditarEmprestimo equipamento={equipamentos} {...emprestimo} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
