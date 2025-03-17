import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter
} from "./ui/table"
import ModalNovoEquipamento from "./ModalNovoEquipamento";
import { Button } from "./ui/button";
import { Delete, DeleteIcon } from "lucide-react";
import { equipamentoDelete } from "../data/getdata/equipamento";


const columns = [
  {
    accessorKey: "label",
    header: "Equipamento"
  },
  {
    accessorKey: "qtde",
    header: "Quantidade"
  },
  {
    accessorKey: "disponivel",
    header: "Disponível"
  },
  {
    accessorKey: "alterar",
    header: "Alterar"
  }
  ,
  {
    accessorKey: "deletar",
    header: "Deletar"
  }

]

type Equipamento = {
  id: number;
  nome: string;
  quantidade: number;
  disponivel: number;
}

const deleteEquipamento = async (data: Equipamento) => {
  try {
    const res = await equipamentoDelete(data);
    console.log(res);
    if (res) {
      alert('Equipamento excluído com sucesso!');
      return
    }
    alert('Existe equipamento emprestado, não é possível excluir.');
  } catch (error) {
    console.error('Erro ao excluir o equipamento:', error);
  }
};

export function EquipamentosTable({ data }: any) {
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead><ModalNovoEquipamento /></TableHead>

          </TableRow>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessorKey}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: Equipamento) => (
            <TableRow key={item.id}>
              <TableCell>{item.nome}</TableCell>
              <TableCell>{item.quantidade}</TableCell>
              <TableCell>{item.disponivel}</TableCell>
              <TableCell><ModalNovoEquipamento {...item} /></TableCell>
              <TableCell><Button type="button" className="bg-red-500" onClick={ () => deleteEquipamento(item)}><DeleteIcon /></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
