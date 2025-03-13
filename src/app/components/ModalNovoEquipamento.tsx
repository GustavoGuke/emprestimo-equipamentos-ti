"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { equipamentoCreate, equipamentoUpdate } from "../data/getdata/equipamento";
import { Equipamento } from "@prisma/client";



type ModalNovoEquipamentoProps = {
    initialEquipament?: Equipamento
    onClose: () => void;
    onEquipamentUpdated?: (updateEquipament: Equipamento) => void;
}

export default function ModalNovoEquipamento({ initialEquipament, onClose, onEquipamentUpdated }: ModalNovoEquipamentoProps) {
    const [open, setOpen] = React.useState(false);
    const [equipmentName, setEquipmentName] = React.useState(initialEquipament?.nome || "");
    const [quantity, setQuantity] = React.useState(initialEquipament?.quantidade || 0);

    useEffect(() => {
        
        setEquipmentName(initialEquipament?.nome || "");
        setQuantity(initialEquipament?.quantidade || 0);
    }, [initialEquipament]);

    const handleSave = async () => {
        const equipamentData = {
            nome: equipmentName.toUpperCase(),
            quantidade: Number(quantity)
        };

        try {
            let res
            if (initialEquipament) {
                res = await equipamentoUpdate(initialEquipament.id, equipamentData)
                if (onEquipamentUpdated && res) {
                    onEquipamentUpdated(res);
                }
            } else {
                res = await equipamentoCreate(equipamentData)
            }

            if (res) {
                onClose();
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
        <div>
            <Button type="button" variant="secondary" onClick={() => setOpen(true)} className="bg-blue-400 my-2 ">Cadastrar equipamento</Button>
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
        </div>
    )
}