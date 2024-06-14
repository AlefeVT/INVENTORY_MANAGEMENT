"use client"

import React, { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createProduct, getProducts, updateProduct } from './actions';
import { useRouter, useSearchParams } from 'next/navigation';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel } from "@/components/ui/alert-dialog";
import Link from 'next/link';

interface Product {
  id?: string;
  supplier: string;
  name: string;
  quantity: number;
  category: string;
  price: number;
  barCode: string;
  sku: string;
  description: string;
  isActive: boolean;
}

const initialFormData: Product = {
  supplier: "",
  name: "",
  quantity: 0,
  category: "",
  price: 0,
  barCode: "",
  sku: "",
  description: "",
  isActive: true,
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<Product>(initialFormData);
  const [productList, setProductList] = useState<Product[]>([]);
  const [editingIndex, setEditingIndex] = useState<string | null>(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
    const productParam = searchParams.get('product');
    if (productParam) {
      const product = JSON.parse(decodeURIComponent(productParam));
      setFormData({ ...product, quantity: Number(product.quantity), price: Number(product.price) });
      setEditingIndex(product.id);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      const formattedProducts = fetchedProducts.map((product: any) => ({
        ...product,
        supplier: product.supplier || "",
        barCode: product.barCode || "",
        sku: product.sku || "",
        description: product.description || ""
      }));
      setProducts(formattedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Erro ao buscar produtos.");
    }
  };

  const handleAddProductToList = () => {
    const { supplier, name, quantity, category, price } = formData;
    if (!supplier || !name || !quantity || !category || !price) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const existsInList = productList.some((product: Product) =>
      product.name === name && product.category === category && product.supplier === supplier
    );

    const existsInDatabase = products.some((product: Product) =>
      product.name === name && product.category === category && product.supplier === supplier
    );

    if (existsInList || existsInDatabase) {
      toast.error("Produto com mesmo nome, fornecedor e categoria já existe.");
      return;
    }

    setProductList([...productList, formData]);
    resetFormData();
    toast.success("Produto adicionado à lista.");
  };

  const handleSaveProducts = async () => {
    if (productList.length === 0) {
      toast.error("Nenhum produto na lista para salvar.");
      return;
    }

    try {
      for (const product of productList) {
        await createProduct(product);
      }
      fetchProducts();
      setProductList([]);
      toast.success("Produtos salvos com sucesso.");
    } catch (error) {
      console.error("Error adding products:", error);
      toast.error("Erro ao salvar produtos.");
    }
  };

  const handleRemoveProductFromList = (index: number) => {
    const updatedList = productList.filter((_, i) => i !== index);
    setProductList(updatedList);
    toast.success("Produto removido da lista.");
  };

  const handleChange = (e: any) => {
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
        await updateProduct(editingIndex, formData);
        setShowAlertDialog(false);
        toast.success("Produto editado com sucesso.");
        router.push('/app/listing/products');
      } catch (error) {
        console.error("Error updating product:", error);
        toast.error("Erro ao editar produto.");
      }
    }
  };

  const resetFormData = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="max-w-7xl mx-auto my-8 p-6 bg-white rounded-md shadow">
      <ToastContainer />
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="flex flex-col">
          <Label htmlFor="supplier">Fornecedor*</Label>
          <Input id="supplier" value={formData.supplier} onChange={handleChange} placeholder="Nome do fornecedor" />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="name">Nome do Produto*</Label>
          <Input id="name" value={formData.name} onChange={handleChange} placeholder="Nome do produto" />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="quantity">Quantidade disponivel*</Label>
          <Input id="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="0" />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="category">Categoria*</Label>
          <Input id="category" value={formData.category} onChange={handleChange} placeholder="Categoria do produto" />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="price">Preço*</Label>
          <Input id="price" type="number" step="0.01" value={formData.price} onChange={handleChange} placeholder="0.00" />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="barCode">Código de Barras</Label>
          <Input id="barCode" value={formData.barCode} onChange={handleChange} placeholder="Código de barras" />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="sku">SKU</Label>
          <Input id="sku" value={formData.sku} onChange={handleChange} placeholder="Código SKU" />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" value={formData.description} onChange={handleChange} placeholder="Descrição do produto" />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="isActive">Ativo</Label>
          <Switch id="isActive" checked={formData.isActive} onCheckedChange={handleSwitchChange} />
        </div>
      </div>
      <div className="flex justify-end mb-6">
        <Button variant="secondary" onClick={editingIndex !== null ? handleSubmitEdit : handleAddProductToList}>
          {editingIndex !== null ? "Editar Produto" : "Adicionar à Lista Quantitativa"}
        </Button>
      </div>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productList.map((product: Product, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Button onClick={() => handleRemoveProductFromList(index)}>Remover</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-6">
        <Link href={'/app/listing/products'} className='hover:bg-gray-100'>Ir para menu de Listagem de Produtos</Link>
        <Button onClick={handleSaveProducts}>Salvar Produtos</Button>
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
                Você está prestes a editar os dados desse produto.
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
