"use client"; // Agora este é um componente Client

import { useState } from "react";
import { NovoEquipamento } from "./ButtonEmprestar";
import { EmprestimosTable } from "./EmprestimosTable";
import { EquipamentosTable } from "./EquipamentosTable";
import { Button } from "./ui/button";

export default function TelaPrincipal({ getEquipamentos, getEmprestimos }: any) {
    const [mostrarEquipamentos, setMostrarEquipamentos] = useState(false);

    return (
        <div>
            {/* Botões para alternar entre Equipamentos e Emprestados */}
            <div className="flex justify-between mb-6">

                <NovoEquipamento getEquipamentos={getEquipamentos} />

                <Button
                    className={`px-4 py-2 rounded hover:bg-blue-700 ${!mostrarEquipamentos ? "bg-blue-500 text-white" : "bg-gray-400"}`}
                    onClick={() => setMostrarEquipamentos(false)}
                >
                    Ver Emprestados
                </Button>
                <Button
                    className={`px-4 py-2 rounded hover:bg-blue-700 ${mostrarEquipamentos ? "bg-blue-500 text-white" : "bg-gray-400"}`}
                    onClick={() => setMostrarEquipamentos(true)}
                >
                    Ver Equipamentos
                </Button>
            </div>


            <div className="mt-10">
                <h1 className="text-2xl font-bold">
                    {mostrarEquipamentos ? "Todos os Equipamentos" : "Equipamentos Emprestados"}
                </h1>

                {/* Alternando entre os Equipamentos e os Emprestados */}
                {mostrarEquipamentos ? (
                    <EquipamentosTable data={getEquipamentos} />
                ) : (
                    <EmprestimosTable getEmprestimos={getEmprestimos} equipamentos={getEquipamentos} />
                )}
            </div>
        </div>
    );
}
