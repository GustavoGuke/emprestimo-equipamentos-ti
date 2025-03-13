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
    accessorKey: "label",
    header: "Equipamento"
  },
  {
    accessorKey: "qtde",
    header: "Quantidade"
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
}

export function EquipamentosTable({ data }: { data: Equipamento[] }) {
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
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.nome}</TableCell>
              <TableCell>{item.quantidade}</TableCell>
              <TableCell>{item.quantidade > 0 ? "Disponível" : "Indisponível"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
