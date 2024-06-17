"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createCategory, getCategorys, updateCategory } from './actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import Link from 'next/link';
import { Category } from '@/types/category';
import CategoryForm from './_components/form';
import CategoryTable from './_components/table';

const initialFormData: Category = {
  name: "",
  priority: "",
  description: "",
  isActive: true,
};

export default function Page() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<Category>(initialFormData);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [editingIndex, setEditingIndex] = useState<string | null>(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
    const categoryParam = searchParams.get('Category');
    if (categoryParam) {
      const category = JSON.parse(decodeURIComponent(categoryParam));
      setFormData({ ...category });
      setEditingIndex(category.id);
    }
  }, []);

  const fetchCategories = async () => {
    try {
      const fetchedCategories = await getCategorys();
      const formattedCategorys = fetchedCategories.map((category: any) => ({
        ...category,
        name: category.name || "",
        priority: category.priority || "",
        description: category.description || ""
      }));
      setCategories(formattedCategorys);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Erro ao buscar categorias.");
    }
  };

  const handleAddCategoryToList = () => {
    const { name, priority, description } = formData;
    if (!name || !priority || !description) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const existsInList = categoryList.some((category: Category) =>
      category.name === name
    );

    const existsInDatabase = categories.some((category: Category) =>
      category.name === name 
    );

    if (existsInList || existsInDatabase) {
      toast.error("Categoria com mesmo nome já existe.");
      return;
    }

    setCategoryList([...categoryList, formData]);
    resetFormData();
    toast.success("Categoria adicionada à lista.");
  };

  const handleSaveCategories = async () => {
    if (categoryList.length === 0) {
      toast.error("Nenhuma categoria na lista para salvar.");
      return;
    }

    try {
      for (const category of categoryList) {
        await createCategory(category);
      }
      fetchCategories();
      setCategoryList([]);
      toast.success("Categorias salvas com sucesso.");
    } catch (error) {
      console.error("Error adding categories:", error);
      toast.error("Erro ao salvar categorias.");
    }
  };

  const handleRemoveCategoryFromList = (index: number) => {
    const updatedList = categoryList.filter((_, i) => i !== index);
    setCategoryList(updatedList);
    toast.success("Categoria removida da lista.");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'number' ? Number(value) : value
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
        await updateCategory(editingIndex, formData);
        setShowAlertDialog(false);
        toast.success("Categoria editada com sucesso.");
        router.push('/app/listing/categories');
      } catch (error) {
        console.error("Error updating category:", error);
        toast.error("Erro ao editar categoria.");
      }
    }
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="max-w-7xl mx-auto my-8 p-6 bg-white rounded-md shadow">
      <ToastContainer />
      <CategoryForm formData={formData} onChange={handleChange} onSwitchChange={handleSwitchChange} />
      <div className="flex justify-end mb-6">
        <Button variant="secondary" onClick={editingIndex !== null ? handleSubmitEdit : handleAddCategoryToList}>
          {editingIndex !== null ? "Editar Categoria" : "Adicionar à Lista"}
        </Button>
      </div>
      <CategoryTable categoryList={categoryList} onRemoveCategory={handleRemoveCategoryFromList} />
      <div className="flex justify-between items-center mt-6">
        <Link href={'/app/listing/categories'} className='hover:bg-gray-100'>Ir para menu de Listagem de Categorias</Link>
        <Button onClick={handleSaveCategories}>Salvar Categorias</Button>
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
                Você está prestes a editar os dados dessa categoria.
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
  );
}
