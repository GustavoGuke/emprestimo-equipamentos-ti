"use client";
import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { equipamentoCreate } from "../data/getdata/equipamento";

export default function ModalNovoEquipamento() {
    const [open, setOpen] = React.useState(false);
    const [newEquipmentName, setNewEquipmentName] = React.useState("");
    const [newQuantity, setNewQuantity] = React.useState(0);
    

     const  addNewEquipment = async (newEquipmentName: string, newQuantity: number) => {
            const newEquipment = {
                nome: newEquipmentName.toUpperCase(),
                quantidade: newQuantity
            };
            const res = await equipamentoCreate(newEquipment)
            setOpen(false);
            setNewEquipmentName("");
            setNewQuantity(0);
        };
    return (
        <div>
            <Button type="button" variant="secondary" onClick={() => setOpen(true)} className="bg-blue-400">Cadastrar equipamento</Button>
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
    )
}