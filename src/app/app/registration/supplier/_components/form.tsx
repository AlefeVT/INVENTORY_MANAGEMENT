"use client";
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Supplier } from '@/types/supplier'; 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SupplierFormProps {
  formData: Supplier;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSwitchChange: (checked: boolean) => void;
}

const SupplierForm: React.FC<SupplierFormProps> = ({ formData, onChange, onSwitchChange }) => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="flex flex-col">
        <Label htmlFor="name">Nome Fantasia*</Label>
        <Input id="name" value={formData.name} onChange={onChange} placeholder="Nome Fantasia" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="corporateName">Razão Social</Label>
        <Input id="corporateName" value={formData.corporateName || ''} onChange={onChange} placeholder="Razão Social" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="cnpjCpf">CNPJ/CPF*</Label>
        <Input id="cnpjCpf" value={formData.cnpjCpf} onChange={onChange} placeholder="CNPJ/CPF" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="supplierType">Tipo de Fornecedor*</Label>
        <Select value={formData.supplierType} onValueChange={(value) => onChange({ target: { id: 'supplierType', value } } as React.ChangeEvent<HTMLSelectElement>)}>
          <SelectTrigger>
            <SelectValue placeholder="Tipo de Fornecedor" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="pessoa_fisica">Pessoa Física</SelectItem>
              <SelectItem value="pessoa_juridica">Pessoa Jurídica</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col">
        <Label htmlFor="telephone">Telefone</Label>
        <Input id="telephone" value={formData.telephone || ''} onChange={onChange} placeholder="Telefone" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="cellphone">Celular</Label>
        <Input id="cellphone" value={formData.cellphone || ''} onChange={onChange} placeholder="Celular" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={formData.email || ''} onChange={onChange} placeholder="Email" />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="website">Website</Label>
        <Input id="website" type="url" value={formData.website || ''} onChange={onChange} placeholder="Website" />
      </div>
      <div className="col-span-2 flex flex-col">
        <Label htmlFor="notes">Observações</Label>
        <Textarea id="notes" value={formData.notes || ''} onChange={onChange} placeholder="Observações" />
      </div>
      <div className="col-span-2 flex flex-col">
        <Label htmlFor="isActive">Ativo</Label>
        <Switch id="isActive" checked={formData.isActive} onCheckedChange={onSwitchChange} />
      </div>
    </div>
  );
};

export default SupplierForm;