import { Header } from "@/app/components/Header";
import { NovoEquipamento } from "./components/ButtonEmprestar";
import { getEquipamento } from "./data/getdata/equipamento";
import { emprestimo } from "./data/getdata/emprestimo";
import { EmprestimosTable } from "./components/EmprestimosTable";
import TelaPrincipal from "./components/TelaPrincipal";


export default async function Home() {
  const mostrarEquipamentos = false
  const getEquipamentos = await getEquipamento();
  const getEmprestimos = await emprestimo();
  
  return (
    <div className="max-w-7xl mx-auto p-16">
      <Header texto="Equipamentos TI" />
      
      <div className="mt-10">
        {/* <NovoEquipamento getEquipamentos={getEquipamentos} />
        <div className="mt-10">
          <h1 className="text-2xl font-bold">Emprestados</h1>
          <EmprestimosTable getEmprestimos={getEmprestimos} equipamentos={getEquipamentos} />
        </div> */}
        <TelaPrincipal getEquipamentos={getEquipamentos} getEmprestimos={getEmprestimos} />
      </div>
    </div>
  );
}
