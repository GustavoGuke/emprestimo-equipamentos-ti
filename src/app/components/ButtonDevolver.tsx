"use client";
import React from "react";
import { Button } from "./ui/button";
import { DownloadIcon, Undo2 } from "lucide-react";
import { EmprestimosTableProps } from "./EmprestimosTable";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { responsaveis } from "../utils/modelosOptions";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "./ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { devolverEquipamento } from "../data/getdata/emprestimo";
import { formatarDataInclusaoBanco } from "../utils/formatarData";

const formSchema = z.object({
    responsavelEmprestimo: z.string().min(2, { message: "Responsável é obrigatório" }),
})

export default function ButtonDevolver({ id, responsavelEmprestimo, equipamentoId }: EmprestimosTableProps) {
    const [isOpen, setIsOpen] = React.useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            responsavelEmprestimo: responsavelEmprestimo.toString(),
        }
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const devolucao = {
            devolvido: true,
            dataDevolucao: formatarDataInclusaoBanco(new Date()),
            responsavelDevolucao: values.responsavelEmprestimo,
            equipamentoId: equipamentoId,
        }
        await devolverEquipamento(id, devolucao);
        form.reset();
        setIsOpen(false)
    }

    return (

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-gray-700 text-gray-50 hover:bg-gray-400"> <Undo2 /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>Devolução de equipamento</DialogTitle>
                </DialogHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
                            <FormField
                                control={form.control}
                                name="responsavelEmprestimo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Quem está recebendo</FormLabel>
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

                                <Button type="submit" className="bg-green-700"><DownloadIcon /> </Button>
                            </DialogFooter>

                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>



    )
}