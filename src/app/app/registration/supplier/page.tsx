"use client";

import React, { useState, useEffect, useCallback } from 'react';
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
import { applyCnpjCpfMask, applyPhoneMask } from '@/services/maskService';

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

const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default function Page() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [formData, setFormData] = useState<Supplier>(initialFormData);
  const [supplierList, setSupplierList] = useState<Supplier[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();


  const fetchSuppliers = useCallback(async () => {
    try {
      const fetchedSuppliers = await getSuppliers();
      setSuppliers(fetchedSuppliers);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Erro ao buscar categorias.");
    }
  }, []);

  useEffect(() => {
    fetchSuppliers();

    const supplierParam = searchParams.get('supplier');
    if (supplierParam) {
      const supplier = JSON.parse(decodeURIComponent(supplierParam));
      setFormData({ ...supplier });
      setEditingIndex(supplier.id);
    } else {
      setEditingIndex(null);
    }
  }, [fetchSuppliers, searchParams]);

  const handleAddSupplierToList = () => {
    const { name, cnpjCpf, supplierType, email } = formData;
    if (!name || !cnpjCpf || !supplierType || !email) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Por favor, insira um email válido.");
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
    if (id === 'cnpjCpf') {
      const maskedValue = applyCnpjCpfMask(value, formData.supplierType);
      setFormData({
        ...formData,
        [id]: maskedValue,
      });
    } else if (id === 'telephone') {
      const maskedValue = applyPhoneMask(value, 'telephone');
      setFormData({
        ...formData,
        [id]: maskedValue,
      });
    } else if (id === 'cellphone') {
      const maskedValue = applyPhoneMask(value, 'cellphone');
      setFormData({
        ...formData,
        [id]: maskedValue,
      });
    } else {
      setFormData({
        ...formData,
        [id]: type === 'number' ? Number(value) : value,
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, isActive: checked });
  };

  const handleSubmitEdit = () => {
    setShowAlertDialog(true);
  };

  const handleConfirmEdit = async () => {
    if (editingIndex !== null) {
      const supplierParam = searchParams.get('supplier');
      if (supplierParam) {
        await updateSupplier(formData.id, formData);
        setShowAlertDialog(false);
        router.push('/app/listing/supplier');
        setEditingIndex(null);
        resetFormData();
      } else {
        const updatedSupplierList = [...supplierList];
        updatedSupplierList[editingIndex] = formData;
        setSupplierList(updatedSupplierList);
        toast.success("Fornecedor da lista editada com sucesso.");
      }
      setShowAlertDialog(false);
      setEditingIndex(null);
      resetFormData();
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
