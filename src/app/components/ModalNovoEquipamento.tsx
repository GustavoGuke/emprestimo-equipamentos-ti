"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { equipamentoCreate, equipamentoUpdate } from "../data/getdata/equipamento";
import { Equipamento } from "@prisma/client";



type ModalNovoEquipamentoProps = {
    id?: number;
    nome?: string
    quantidade?: number;
    onClose?: () => void;
    onEquipamentUpdated?: (updateEquipament: Equipamento) => void;
}

export default function ModalNovoEquipamento({ id, nome, quantidade, onClose, onEquipamentUpdated }: ModalNovoEquipamentoProps) {
    const [open, setOpen] = React.useState(false);
    const [equipmentName, setEquipmentName] = React.useState(nome || "");
    const [quantity, setQuantity] = React.useState(quantidade || 0);
    const quantityAnterior = quantidade || 0;
    

    useEffect(() => {
        setEquipmentName(nome || "");
        setQuantity(quantidade || 0);
    }, [nome, quantidade]);

    const handleSave = async () => {
        const equipamentData = {
            nome: equipmentName.toUpperCase(),
            quantidade: Number(quantity)
        };
        let  ajuste = quantity - quantityAnterior

        try {
            let res
            if (nome || quantidade) {
                res = await equipamentoUpdate(id!, equipamentData, ajuste)
                if (onEquipamentUpdated && res) {
                    onEquipamentUpdated(res);
                }
            } else {
                res = await equipamentoCreate(equipamentData)
            }

            if (res) {
                setOpen(false);
                setEquipmentName("");
                setQuantity(0);
            }
        } catch (error) {
            console.error("Error saving equipment:", error);
            // Optionally display an error message to the user
        }

    }
    // const addNewEquipment = async (newEquipmentName: string, newQuantity: number) => {
    //     const equipamentData = {
    //         nome: newEquipmentName.toUpperCase(),
    //         quantidade: newQuantity
    //     };
    //     const res = await equipamentoCreate(equipamentData)
    //     setOpen(false);
    //     setEquipmentName("");
    //     setQuantity(0);
    // };
    return (
        <>
            <Button type="button" variant="secondary" onClick={() => setOpen(true)} className="bg-blue-400 my-2 ">{id ? "alterar" : "Cadastrar equipamento"}</Button>
            {
                open &&
                <>
                    <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center">
                        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-left my-2">
                            <Label htmlFor="">Equipamento</Label>
                            <Input
                                placeholder="notebook"
                                type="text"
                                value={equipmentName}
                                onChange={(e) => setEquipmentName(e.target.value)}
                            />

                            <div className="mt-3">
                                <Label htmlFor="" className="">Quantidade disponível</Label>
                                <Input
                                    type="text"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                />
                            </div>

                            <div className="flex justify-between mt-4">
                                <Button type="button" onClick={handleSave} className="bg-green-700">Salvar</Button>
                                <Button type="button" className="bg-red-500" onClick={() => setOpen(false)}>Cancelar</Button>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}