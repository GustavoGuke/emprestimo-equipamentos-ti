import { db } from "@/app/lib/prisma";

export async function emprestimo() {
    const data = await db.emprestimo.findMany();
    return data;
}

export async function emprestimoCreatee(data: any) {
    const dataCreate = await db.emprestimo.create({
        data: data,
    });
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