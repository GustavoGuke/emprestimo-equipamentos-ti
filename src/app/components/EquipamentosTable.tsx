import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"
import ModalNovoEquipamento from "./ModalNovoEquipamento";


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
    accessorKey: "status",
    header: "Status"
  }
]

type Equipamento = {
  id: number;
  nome: string;
  quantidade: number;
  disponivel: number;
}

export function EquipamentosTable({ data }: any) {
console.log(data)
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
          {data.map((item: Equipamento) => (
            <TableRow key={item.id}>
              <TableCell>{item.nome}</TableCell>
              <TableCell>{item.quantidade}</TableCell>
              <TableCell>{item.disponivel}</TableCell>
              <TableCell><ModalNovoEquipamento {...item}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
