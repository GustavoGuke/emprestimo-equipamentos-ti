"use client"

import React from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { emprestimoUpdateIdIgual, emprestimoUpdateIdDiferente } from "../data/getdata/emprestimo";
import { departamentos, responsaveis } from "../utils/modelosOptions";
import { Equipamento, formatarEquipamentos } from "../utils/formatarEquipamentos";
import { Edit } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";


const formSchema = z.object({
    nomeEquipamento: z.string().min(2, { message: "Nome é obrigatório" }),
    usuario: z.string().min(2, { message: "Nome é obrigatório" }),
    departamento: z.string().min(2, { message: "Departamento é obrigatório" }),
    responsavelEmprestimo: z.string().min(2, { message: "Responsável é obrigatório" }),
    identificacao: z.string().min(2, { message: "Identificação é obrigatório" }),
})


interface EditarEmprestimoProps {
    id: number;
    nomeEquipamento: string;
    usuario: string;
    departamento: string;
    responsavelEmprestimo: string;
    dataEmprestimo: Date;
    identificacaoEquipamento: string | undefined;
    devolvido: boolean;
    dataDevolucao: Date | null;
    responsavelDevolucao: string | null;
    equipamentoId: number;
    equipamento: any;
}


export function EditarEmprestimo({ id, nomeEquipamento, usuario, departamento, responsavelEmprestimo, identificacaoEquipamento, equipamento }: EditarEmprestimoProps,) {
    const [isOpen, setIsOpen] = React.useState(false);
    const equipamentosFormatados = formatarEquipamentos(equipamento)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nomeEquipamento: nomeEquipamento,
            identificacao: identificacaoEquipamento,
            usuario: usuario,
            departamento: departamento,
            responsavelEmprestimo: responsavelEmprestimo.toString(),

        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const equipamentoId = equipamentosFormatados.find((equipamento: Equipamento) => equipamento.value === values.nomeEquipamento)?.id
        const formEmprestimo = {
            nomeEquipamento: values.nomeEquipamento.toLocaleUpperCase(),
            usuario: values.usuario.toLocaleUpperCase(),
            departamento: values.departamento.toLocaleUpperCase(),
            responsavelEmprestimo: values.responsavelEmprestimo.toLocaleUpperCase(),
            identificacaoEquipamento: values.identificacao.toLocaleUpperCase(),
        }

        if (id !== equipamentoId) {
            await emprestimoUpdateIdDiferente(id, { ...formEmprestimo, equipamentoId: Number(equipamentoId) })
            form.reset();
            setIsOpen(false)
        }
        await emprestimoUpdateIdIgual(id, formEmprestimo)
        form.reset();
        setIsOpen(false)

    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary" className="bg-gray-700 text-gray-50 hover:bg-gray-400 "><Edit /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Emprestar Equipamento</DialogTitle>
                    <DialogDescription>
                        Insira as informações
                    </DialogDescription>
                </DialogHeader>
                <div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                            <FormField
                                control={form.control}
                                name="nomeEquipamento"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Equipamento</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o Equipamento" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    equipamentosFormatados.map((option: Equipamento) => {
                                                        const isDisabled = option.quantidade === 0
                                                        return (
                                                            <SelectItem key={option.value} value={option.value} disabled={isDisabled}>{option.label}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="identificacao"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Identificação do Equipamento</FormLabel>
                                        <FormControl>
                                            <Input placeholder="equipamento 01" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="usuario"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Nome do solicitante" {...field} />
                                        </FormControl>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="departamento"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Departamento</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder={field.value} />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    departamentos.map((option) => {
                                                        return (
                                                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="responsavelEmprestimo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Responsável</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="novo responsável " />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    responsaveis.map((option) => {
                                                        return (
                                                            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                                        )
                                                    })
                                                }
                                            </SelectContent>
                                        </Select>

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <Button type="submit" className="bg-green-700">Alterar</Button>
                            </DialogFooter>

                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}