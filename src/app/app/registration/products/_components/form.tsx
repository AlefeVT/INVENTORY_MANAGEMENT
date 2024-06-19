import React, { useEffect, useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Product } from '@/types/product';
import { getCategorys } from '../../category/actions';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getSuppliers } from '../../supplier/actions';

interface ProductFormProps {
  formData: Product;
  onChange: (e: any) => void;
  onSwitchChange: (checked: boolean) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ formData, onChange, onSwitchChange }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategorys();
        setCategories(data);
      } catch (error) {
        console.error("Erro ao carregar categorias:", error);
      }
    };

    const fetchSuppliers = async () => {
      try {
        const data = await getSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error("Erro ao carregar fornecedores:", error);
      }
    };

    fetchCategories();
    fetchSuppliers();
  }, []);



  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="flex flex-col">
        <Label htmlFor="supplierId">Fornecedor*</Label>
        <Select onValueChange={(value) => onChange({ target: { id: 'supplierId', value } })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o fornecedor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={null}>Selecione um fornecedor</SelectItem> 
              {suppliers.map((supplier) => (
                <SelectItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col">
        <Label htmlFor="name">Nome do Produto*</Label>
        <Input id="name" value={formData.name} onChange={onChange} placeholder="Nome do produto" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="quantity">Quantidade disponivel*</Label>
        <Input id="quantity" type="number" value={formData.quantity} onChange={onChange} placeholder="0" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="categoryId">Categoria*</Label>
        <Select onValueChange={(value) => onChange({ target: { id: 'categoryId', value } })}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione a categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={null}>Selecione uma categoria</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col">
        <Label htmlFor="price">Preço*</Label>
        <Input id="price" type="number" step="0.01" value={formData.price} onChange={onChange} placeholder="0.00" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="barCode">Código de Barras</Label>
        <Input id="barCode" value={formData.barCode} onChange={onChange} placeholder="Código de barras" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="sku">SKU</Label>
        <Input id="sku" value={formData.sku} onChange={onChange} placeholder="Código SKU" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="description">Descrição</Label>
        <Textarea id="description" value={formData.description} onChange={onChange} placeholder="Descrição do produto" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="isActive">Ativo</Label>
        <Switch id="isActive" checked={formData.isActive} onCheckedChange={onSwitchChange} />
      </div>
    </div>
  );
}

export default ProductForm;