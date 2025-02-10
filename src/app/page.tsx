import { Header } from "@/app/components/Header";
import { NovoEquipamento } from "./components/NovoEquipamento";
import { getEquipamento } from "./data/getdata/equipamento";


export default async function Home() {
  const getEquipamentos = await getEquipamento();
  return (
    <div className="max-w-7xl mx-auto p-16">
      <Header texto="Equipamentos TI" user="Gustavo" />
      
      <div className="mt-10">
        <NovoEquipamento getEquipamentos={getEquipamentos} />
      </div>
    </div>
  );
}
