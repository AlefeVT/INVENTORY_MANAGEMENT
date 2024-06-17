import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Product } from '@/types/product';

interface ProductFormProps {
  formData: Product;
  onChange: (e: any) => void;
  onSwitchChange: (checked: boolean) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ formData, onChange, onSwitchChange }) => {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="flex flex-col">
        <Label htmlFor="supplier">Fornecedor*</Label>
        <Input id="supplier" value={formData.supplier} onChange={onChange} placeholder="Nome do fornecedor" />
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
        <Label htmlFor="category">Categoria*</Label>
        <Input id="category" value={formData.category} onChange={onChange} placeholder="Categoria do produto" />
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
