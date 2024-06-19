import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Category } from '@/types/category';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CategoryFormProps {
  formData: Category;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSwitchChange: (checked: boolean) => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ formData, onChange, onSwitchChange }) => {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="flex flex-col">
        <Label htmlFor="name">Nome*</Label>
        <Input id="name" value={formData.name} onChange={onChange} placeholder="Nome do produto" />
      </div>

      <div className="flex flex-col">
        <Label htmlFor="priority">Prioridade*</Label>
        <Select value={formData.priority} onValueChange={(value) => onChange({ target: { id: 'priority', value } } as React.ChangeEvent<HTMLSelectElement>)}>
          <SelectTrigger>
            <SelectValue placeholder="Prioridade de reposição" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={null}>Prioridade de reposição</SelectItem> 
              <SelectItem value="alta">Alta</SelectItem>
              <SelectItem value="media">Média</SelectItem>
              <SelectItem value="baixa">Baixa</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
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
};

export default CategoryForm;