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

export function EquipamentosTable({ data }) {
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
            <TableRow key={item.value}>
              <TableCell>{item.label}</TableCell>
              <TableCell>{item.qtde}</TableCell>
              <TableCell>{item.qtde > 0 ? "Disponível" : "Indisponível"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
