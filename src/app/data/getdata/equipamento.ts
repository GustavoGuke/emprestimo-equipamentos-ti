import { db } from "@/app/lib/prisma";

export async function getEquipamento() {
    const equipamento = await db.equipamento.findMany();
    return equipamento;
}

export async function equipamentoCreate(data: any){
    const equipamento = await db.equipamento.create({
        data: data
    })
    return equipamento;
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