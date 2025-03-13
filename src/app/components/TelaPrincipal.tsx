"use client"; // Agora este é um componente Client

import { useState } from "react";
import { NovoEquipamento } from "./ButtonEmprestar";
import { EmprestimosTable } from "./EmprestimosTable";
import { EquipamentosTable } from "./EquipamentosTable";

export default function TelaPrincipal({ getEquipamentos, getEmprestimos }: any) {
    const [mostrarEquipamentos, setMostrarEquipamentos] = useState(false);

    return (
        <div>
            <NovoEquipamento getEquipamentos={getEquipamentos} />
            {/* Botões para alternar entre Equipamentos e Emprestados */}
            <div className="flex gap-4 mb-6">
                <button
                    className={`px-4 py-2 rounded ${!mostrarEquipamentos ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setMostrarEquipamentos(false)}
                >
                    Ver Emprestados
                </button>
                <button
                    className={`px-4 py-2 rounded ${mostrarEquipamentos ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setMostrarEquipamentos(true)}
                >
                    Ver Equipamentos
                </button>
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
