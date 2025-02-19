"use server";
import { db } from "@/app/lib/prisma";
import { debitaQuantidade, incrementaQuantidade } from "./equipamento";
import { revalidatePath } from "next/cache";
import { formatarDataInclusaoBanco } from "@/app/utils/formatarData";

export async function emprestimo() {

    try {
        const data = await db.emprestimo.findMany({
            orderBy: {
                dataEmprestimo: "desc"
            }
        });
        return data;
    } catch (error) {
        return [];
    }
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
            dataEmprestimo: formatarDataInclusaoBanco(new Date()),
            equipamento: {
                connect: {
                    id: dataEmprestimo.equipamentoId,
                }
            }
        },
    });

    await debitaQuantidade(dataEmprestimo.equipamentoId);
    revalidatePath("Home")
}

export async function emprestimoUpdateIdDiferente(id: number, data: any) {
    

    await db.emprestimo.update({
        where: {
            id: id,
        },
        data: {...data },
    });
    
    await debitaQuantidade(data.equipamentoId);
    await incrementaQuantidade(id);
    revalidatePath("Home")


}

export async function emprestimoUpdateIdIgual(id: number, data: any) {
    try {
        await db.emprestimo.update({
            where: {
                id: id,
            },
            data: {...data},
        });

        revalidatePath("Home")
    } catch (error) {
        return error;
    }

}

export async function devolverEquipamento(id:number, data: any){
    await db.emprestimo.update({
        where: {
            id: id,
        },
        data: {...data},
    });
    await incrementaQuantidade(data.equipamentoId);
    revalidatePath("Home")
}

export async function emprestimoDelete(id: number) {
    const dataDelete = await db.emprestimo.delete({
        where: {
            id: id,
        },
    });
    return dataDelete;
}