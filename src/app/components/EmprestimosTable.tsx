"use client"
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
import { useState } from "react";
import { Button } from "./ui/button";


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
    accessorKey: "dataDevolucao",
    header: "Data Devolução"
  },
  {
    accessorKey: "responsavelDevolucao",
    header: "Responsável Devolução"
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

export  function EmprestimosTable({ getEmprestimos, equipamentos }: any) {

  const [showDevolvidos, setShowDevolvidos] = useState(false);

  return (
    <div className="rounded-md border p-2">
      <Button className="bg-cyan-600 hover:bg-cyan-800" onClick={() => setShowDevolvidos(!showDevolvidos)}>
        {showDevolvidos ? "Ocultar Devolvidos" : "Mostrar Devolvidos"}
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessorKey}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {getEmprestimos
            .filter((emprestimo: EmprestimosTableProps) => showDevolvidos || !emprestimo.devolvido)
            .map((emprestimo: EmprestimosTableProps) => (
              <TableRow key={emprestimo.id}>
                <TableCell>{emprestimo.nomeEquipamento}</TableCell>
                <TableCell>{emprestimo.identificacaoEquipamento}</TableCell>
                <TableCell>{emprestimo.usuario}</TableCell>
                <TableCell>{emprestimo.departamento}</TableCell>
                <TableCell>{formatarData(emprestimo.dataEmprestimo)}</TableCell>
                <TableCell>{emprestimo.dataDevolucao ? formatarData(emprestimo.dataDevolucao) : "Pendente"}</TableCell>
                <TableCell>{emprestimo.responsavelDevolucao || "Pendente"}</TableCell>
                <TableCell>{emprestimo.responsavelEmprestimo}</TableCell>
                {!showDevolvidos && <TableCell className="flex gap-2">
                  <ButtonDevolver {...emprestimo} />
                  <EditarEmprestimo equipamento={equipamentos} {...emprestimo} />
                </TableCell>}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}