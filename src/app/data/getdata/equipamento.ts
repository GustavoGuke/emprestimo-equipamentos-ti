"use server"
import { db } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getEquipamento() {
    try {
        const equipamento = await db.equipamento.findMany({
            where: {
                ativo: true,
            }
        });
    if (!equipamento) {
        return [];
    }
    return equipamento;
    } catch (error) {
        return [];
    }
}

export async function equipamentoCreate(data: any){    
    const equipamento = await db.equipamento.create({
        data: {...data, disponivel: data.quantidade},
    })
    
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
                disponivel: {
                    decrement: 1
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function incrementaQuantidade(id: number){
    try {
        await db.equipamento.update({
            where: {
                id: id
            },
            data: {
                disponivel: {
                    increment: 1
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
}

export async function equipamentoUpdate(id: number, data: any, ajuste: number){
    const equipamento = await db.equipamento.update({
        where: {
            id: id
        },
        data: {
            ...data, 
            disponivel:{
                increment: ajuste
            }
        },
        //data: data
    })
    revalidatePath("Home")
    return equipamento;
}

export async function equipamentoDelete(data: any){
    const { id, quantidade, disponivel } = data
    //if (quantidade === disponivel) {
        await db.equipamento.update({
            where: {
                id: id
            },
            data: {
                ativo: false
            }
        })
        revalidatePath("Home")
        return true
    //}
    
    return false

   
}