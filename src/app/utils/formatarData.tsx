export const formatarData = (data: string | Date) => {
    return new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    }).format(new Date(data));
};


export const formatarDataInclusaoBanco = (data: string | Date) =>{
    const date = new Date(data);
    // Ajusta para o horário de Brasília (subtrai 3 horas)
    date.setHours(date.getHours() - 3);

    // Extrai os componentes individuais
    const ano = date.getFullYear();
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const dia = String(date.getDate()).padStart(2, "0");
    const horas = String(date.getHours()).padStart(2, "0");
    const minutos = String(date.getMinutes()).padStart(2, "0");
    const segundos = String(date.getSeconds()).padStart(2, "0");

    // Retorna a data no formato "YYYY-MM-DD HH:mm:ss"
    return new Date(`${ano}-${mes}-${dia} ${horas}:${minutos}:${segundos}`);
};
// export const formatarDataInclusaoBanco = (data: string | Date) => {
//     return new Intl.DateTimeFormat("pt-BR", {
//         year: "numeric",
//         month: "2-digit",
//         day: "2-digit",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit"
//     }).format(new Date(data));
// };