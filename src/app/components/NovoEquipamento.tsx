"use client"

import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form"

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import React from "react";
import { db } from "../lib/prisma";
import { equipamentoCreate, getEquipamento } from "../data/getdata/equipamento";
import { get } from "http";


const formSchema = z.object({
    equipamento: z.string().min(2, { message: "Nome é obrigatório" }),
    name: z.string().min(2, { message: "Nome é obrigatório" }),
    dpto: z.string().min(2, { message: "Departamento é obrigatório" }),
    responsavel: z.string().min(2, { message: "Responsável é obrigatório" }),
    identificacao: z.string().min(2, { message: "Identificação é obrigatório" }),
})

const departamentos = [
    { value: "COMPRAS", label: "COMPRAS" },
    { value: "COMERCIAL", label: "COMERCIAL" },
    { value: "DIRETORIA", label: "DIRETORIA" },
    { value: "ENGENHARIA", label: "ENGENHARIA" },
    { value: "EXPEDICAO", label: "EXPEDICAO" },
    { value: "FINANCEIRO", label: "FINANCEIRO" },
    { value: "MANUTENÇÃO", label: "MANUTENÇÃO" },
    { value: "PCP", label: "PCP" },
    { value: "PRODUCAO", label: "PRODUCAO" },
    { value: "QUALIDADE", label: "QUALIDADE" },
]

const responsaveis = [
    { value: "Gustavo", label: "Gustavo" },
    { value: "Jairo", label: "Jairo" },
    { value: "Thiago", label: "Thiago" },
    { value: "Fillipe", label: "Fillipe" },
]



export function NovoEquipamento({getEquipamentos}:any) {
    const [open, setOpen] = React.useState(false);
    

    const equipamentos = getEquipamentos.map((equipamento) => {
        return {
            value: equipamento.nome,
            label: equipamento.nome,
            quantidade: equipamento.quantidade

        }})
    
    const [newEquipmentName, setNewEquipmentName] = React.useState("");
    const [newQuantity, setNewQuantity] = React.useState(0);
    

    const equipamentosQtde = equipamentos.filter(e => e.quantidade > 0)

    const  addNewEquipment = async (newEquipmentName: string, newQuantity: number) => {
        const newEquipment = {
            nome: newEquipmentName.toUpperCase(),
            quantidade: newQuantity
        };

        const res = await equipamentoCreate(newEquipment)
        console.log("retornou",res)
        setOpen(false);
        setNewEquipmentName("");
        setNewQuantity(0);
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            equipamento: "",
            name: "",
            dpto: ""
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log({ ...values, data: new Date() })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary">Emprestar equipamento +</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Emprestar Equipamento</DialogTitle>
                    <DialogDescription>
                        Insira as informações
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-around">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">

                            <FormField
                                control={form.control}
                                name="equipamento"
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
                                                    equipamentosQtde.map((option) => {
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
                                name="name"
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
                                name="dpto"
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
                                name="responsavel"
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
                    <div>
                        <Button type="button" variant="secondary" onClick={() => setOpen(true)} className="bg-blue-400">Novo equipamento</Button>
                        {
                            open &&
                            <>
                                <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center">
                                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                                        <Label htmlFor="">Equipamento</Label>
                                        <Input
                                            placeholder="notebook"
                                            type="text"
                                            value={newEquipmentName}
                                            onChange={(e) => setNewEquipmentName(e.target.value)}
                                        />

                                        <Label htmlFor="">Quantidade disponível</Label>
                                        <Input
                                            type="text"
                                            value={newQuantity}
                                            onChange={(e) => setNewQuantity(Number(e.target.value))}
                                        />
                                     
                                        <div className="flex justify-between mt-2">
                                            <Button type="button" onClick={() => addNewEquipment(newEquipmentName, newQuantity)} className="bg-green-700">Salvar</Button>
                                            <Button type="button" className="bg-red-500" onClick={() => setOpen(false)}>Cancelar</Button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    )
}