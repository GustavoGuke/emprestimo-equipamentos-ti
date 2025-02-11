"use server"
import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getEquipamento() {
    const equipamento = await db.equipamento.findMany();
    return equipamento;
}

export async function equipamentoCreate(data: any){
    console.log("enviado=> ",data)
    const equipamento = await db.equipamento.create({
        data: {...data}
    })
    console.log("enviado=> ",equipamento)
    revalidatePath("Home")
    return equipamento;
}

export async function debitaQuantidade(id: number){
    try {
        await db.equipamento.update({
            where: {
                id: id
            },
            data: {
                quantidade: {
                    decrement: 1
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function equipamentoUpdate(id: number, data: any){
    const equipamento = await db.equipamento.update({
        where: {
            id: id
        },
        data: data
    })
    return equipamento;
}

export async function equipamentoDelete(id: number){
    const equipamento = await db.equipamento.delete({
        where: {
            id: id
        }
    })
    return equipamento;
}