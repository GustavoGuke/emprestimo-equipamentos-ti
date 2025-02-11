import { Header } from "@/app/components/Header";
import { NovoEquipamento } from "./components/NovoEquipamento";
import { getEquipamento } from "./data/getdata/equipamento";
import { emprestimo } from "./data/getdata/emprestimo";
import { EmprestimosTable } from "./components/EmprestimosTable";


export default async function Home() {
  const getEquipamentos = await getEquipamento();
  const getEmprestimos = await emprestimo();
  console.log(getEmprestimos);
  return (
    <div className="max-w-7xl mx-auto p-16">
      <Header texto="Equipamentos TI" user="Gustavo" />
      
      <div className="mt-10">
        <NovoEquipamento getEquipamentos={getEquipamentos} />
        <div className="mt-10">
          <h1 className="text-2xl font-bold">Emprestados</h1>
          <EmprestimosTable data={getEmprestimos} />
        </div>
      </div>
    </div>
  );
}
