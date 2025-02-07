import { Header } from "@/app/components/Header";
import { NovoEquipamento } from "./components/NovoEquipamento";


export default function Home() {
  return (
    <div className="max-w-7xl mx-auto p-16">
      <Header texto="Equipamentos TI" user="Gustavo" />
      
      <div className="mt-10">
        <NovoEquipamento />
      </div>
    </div>
  );
}
