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
    accessorKey: "name",
    header: "Nome"
  },
  {
    accessorKey: "dpto",
    header: "Departamento"
  },
  {
    accessorKey: "data",
    header: "Data"
  }
]

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
              <TableCell>{emprestimo.equipamento}</TableCell>
              <TableCell>{emprestimo.name}</TableCell>
              <TableCell>{emprestimo.dpto}</TableCell>
              <TableCell>{emprestimo.data}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
