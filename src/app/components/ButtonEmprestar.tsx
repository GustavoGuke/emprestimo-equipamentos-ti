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
import { emprestimoCreatee } from "../data/getdata/emprestimo";
import ModalNovoEquipamento from "./ModalNovoEquipamento";
import { departamentos, responsaveis } from "../utils/modelosOptions";
import { Equipamento, filtrarEquipamentoComQuantidade, formatarEquipamentos } from "../utils/formatarEquipamentos";


const formSchema = z.object({
    nomeEquipamento: z.string().min(2, { message: "Nome é obrigatório" }),
    usuario: z.string().min(2, { message: "Nome é obrigatório" }),
    departamento: z.string().min(2, { message: "Departamento é obrigatório" }),
    responsavelEmprestimo: z.string().min(2, { message: "Responsável é obrigatório" }),
    identificacao: z.string().min(2, { message: "Identificação é obrigatório" }),
})

export function NovoEquipamento({ getEquipamentos }: any) {

    const equipamentosFormatados = formatarEquipamentos(getEquipamentos)
    const equipamentosQtde = filtrarEquipamentoComQuantidade(equipamentosFormatados)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nomeEquipamento: "",
            usuario: "",
            departamento: "",
            responsavelEmprestimo: "",
            identificacao: "",

        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        
        const equipamentoId = equipamentosQtde.find((equipamento: Equipamento) => equipamento.value === values.nomeEquipamento)?.id
        const novoEmprestimo = {
            nomeEquipamento: values.nomeEquipamento.toLocaleUpperCase(),
            usuario: values.usuario.toLocaleUpperCase(),
            departamento: values.departamento.toLocaleUpperCase(),
            responsavelEmprestimo: values.responsavelEmprestimo.toLocaleUpperCase(),
            identificacao: values.identificacao.toLocaleUpperCase(),
            equipamentoId: Number(equipamentoId),
        }
        await emprestimoCreatee(novoEmprestimo)
        form.reset();

    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="bg-green-500 hover:bg-green-300">Emprestar equipamento +</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader >
                    <DialogTitle>Emprestar Equipamento</DialogTitle>
                    <DialogDescription className="flex items-end justify-between">
                        Insira as informações
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2 " >
                    <div className="text-end ">
                        <ModalNovoEquipamento />
                    </div>

                    <div>
                        <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 border p-2 rounded-md">

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
                                                        equipamentosQtde.map((option: Equipamento) => {
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
                                                        <SelectValue placeholder="Selecione o Departamento" />
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
                                                        <SelectValue placeholder="Selecione o Responsável" />
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
                                    <Button type="submit" className="bg-green-700">Emprestar</Button>
                                </DialogFooter>

                            </form>
                        </Form>
                    </div>


                </div>
            </DialogContent>
        </Dialog>
    )
}