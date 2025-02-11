"use server";
import { db } from "@/app/lib/prisma";
import { debitaQuantidade } from "./equipamento";

export async function emprestimo() {
    const data = await db.emprestimo.findMany({
        where: {
            devolvido: false,
        }
    });
    return data;
}

export async function emprestimoCreatee(dataEmprestimo: any) {
    const create = {
        nomeEquipamento: dataEmprestimo.nomeEquipamento,
        usuario: dataEmprestimo.usuario,
        departamento: dataEmprestimo.departamento,
        responsavelEmprestimo: dataEmprestimo.responsavelEmprestimo,
        identificacaoEquipamento: dataEmprestimo.identificacao,
    }
    const dataCreate = await db.emprestimo.create({
        data: {
            ...create,
            dataEmprestimo:new Date(),
            equipamento: {
                connect: {
                    id: dataEmprestimo.equipamentoId,
                }
            }
        },
    });
    console.log("inserção",dataCreate);
    await debitaQuantidade(dataEmprestimo.equipamentoId);
    return dataCreate;
}

export async function emprestimoUpdate(id: number, data: any) {
    const dataUpdate = await db.emprestimo.update({
        where: {
            id: id,
        },
        data: data,
    });
    return dataUpdate;
}

export async function emprestimoDelete(id: number) {
    const dataDelete = await db.emprestimo.delete({
        where: {
            id: id,
        },
    });
    return dataDelete;
}