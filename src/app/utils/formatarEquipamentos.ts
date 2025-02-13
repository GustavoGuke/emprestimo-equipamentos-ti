export interface Equipamento {
    id: number;
    nome?: string;
    label?: string;
    value: string
    quantidade: number;
}


// opção no select
export function formatarEquipamentos(equipamento: Equipamento[]){
    return equipamento?.map((equipamento: Equipamento) => {
        return {
            value: equipamento.nome ?? "",
            label: equipamento.nome ?? "",
            quantidade: equipamento.quantidade,
            id: equipamento.id
        }})
}

// filtrar equipamentos com quantidade maior que 0
export function filtrarEquipamentoComQuantidade(equipamento: Equipamento[] = []){
    return equipamento?.filter((equipamento: Equipamento )=> equipamento.quantidade > 0)
}