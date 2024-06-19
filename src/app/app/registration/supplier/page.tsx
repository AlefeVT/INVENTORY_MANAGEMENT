"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createSupplier, getSuppliers, updateSupplier } from './actions'; 
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import Link from 'next/link';
import { Supplier } from '@/types/supplier'; 
import SupplierForm from './_components/form'; 
import SupplierTable from './_components/table'; 

const initialFormData: Supplier = {
  id: '',
  name: "",
  corporateName: "",
  cnpjCpf: "",
  supplierType: "pessoa_fisica", 
  telephone: "",
  cellphone: "",
  email: "",
  website: "",
  notes: "",
  isActive: true,
  createdAt: new Date(), 
  updatedAt: new Date(), 
};

export default function Page() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [formData, setFormData] = useState<Supplier>(initialFormData);
  const [supplierList, setSupplierList] = useState<Supplier[]>([]); 
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    fetchSuppliers();
    const supplierParam = searchParams.get('supplier');
    if (supplierParam) {
      const supplier = JSON.parse(decodeURIComponent(supplierParam));
      setFormData({ ...supplier });
      setEditingIndex(supplier.id);
    }
  }, []);

  const fetchSuppliers = async () => {
    try {
      const fetchedSuppliers = await getSuppliers(); 
      setSuppliers(fetchedSuppliers);
    } catch (error) {
      console.error("Erro ao buscar fornecedores:", error);
      toast.error("Erro ao buscar fornecedores.");
    }
  };

  const handleAddSupplierToList = () => {
    const { name, cnpjCpf, supplierType } = formData;
    if (!name || !cnpjCpf || !supplierType) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const existsInList = supplierList.some((supplier: Supplier) =>
      supplier.cnpjCpf === cnpjCpf 
    );

    const existsInDatabase = suppliers.some((supplier: Supplier) =>
      supplier.cnpjCpf === cnpjCpf 
    );

    if (existsInList || existsInDatabase) {
      toast.error("Fornecedor com mesmo CNPJ/CPF já existe.");
      return;
    }

    setSupplierList([...supplierList, formData]); 
    resetFormData();
    toast.success("Fornecedor adicionado à lista.");
  };

  const handleSaveSuppliers = async () => {
    if (supplierList.length === 0) {
      toast.error("Nenhum fornecedor na lista para salvar.");
      return;
    }

    try {
      for (const supplier of supplierList) {
        await createSupplier(supplier); 
      }
      fetchSuppliers(); 
      setSupplierList([]); 
      toast.success("Fornecedores salvos com sucesso.");
    } catch (error) {
      console.error("Erro ao salvar fornecedores:", error);
      toast.error("Erro ao salvar fornecedores.");
    }
  };

  const handleRemoveSupplierFromList = (index: number) => {
    const updatedList = supplierList.filter((_, i) => i !== index);
    setSupplierList(updatedList);
    toast.success("Fornecedor removido da lista.");
  };

 const handleEditSupplier = (index: number) => {
    setEditingIndex(index);
    setFormData(supplierList[index]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, isActive: checked });
  };

  const handleSubmitEdit = () => {
    setShowAlertDialog(true);
  };

  const handleConfirmEdit = async () => {
    if (editingIndex !== null) {
      try {
        await updateSupplier(formData.id, formData); 
        setShowAlertDialog(false);
        toast.success("Fornecedor editado com sucesso.");
        router.push('/app/listing/supplier'); 
        setEditingIndex(null); 
        resetFormData(); 
      } catch (error) {
        console.error("Erro ao editar fornecedor:", error);
        toast.error("Erro ao editar fornecedor.");
      }
    }
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="bg-white rounded-md p-6 shadow overflow-y-auto h-screen">
      <div className='mb-40'>
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-6">
        {editingIndex !== null ? 'Editar Fornecedor' : 'Cadastrar Fornecedor'}
      </h2>
      <SupplierForm formData={formData} onChange={handleChange} onSwitchChange={handleSwitchChange} />
      <div className="flex justify-end mb-6">
        <Button variant="secondary" onClick={editingIndex !== null ? handleSubmitEdit : handleAddSupplierToList}>
          {editingIndex !== null ? "Editar Fornecedor" : "Adicionar à Lista"}
        </Button>
      </div>
      {!editingIndex && (
        <SupplierTable
          supplierList={supplierList}
          onRemoveSupplier={handleRemoveSupplierFromList}
          onEditSupplier={handleEditSupplier}
        />
      )}
      <div className="flex justify-between items-center mt-6">
        <Link href={'/app/listing/supplier'} className='hover:bg-gray-100'>Ir para menu de Cadastro de Fornecedores</Link> 
        <Button onClick={handleSaveSuppliers}>Salvar Fornecedores</Button>
      </div>
      {showAlertDialog && (
        <AlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
          <AlertDialogTrigger asChild>
            <Button className="hidden">Open</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Atenção</AlertDialogTitle>
              <AlertDialogDescription>
                Você está prestes a editar os dados desse fornecedor.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="flex justify-end space-x-4">
              <AlertDialogCancel asChild>
                <Button onClick={() => setShowAlertDialog(false)} className='text-black'>Cancelar</Button>
              </AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button onClick={handleConfirmEdit}>Confirmar</Button>
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
      </div>

    </div>
  );
}