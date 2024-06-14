"use client";
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function Page() {
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [categories, setCategories] = useState<{ name: string; description: string; isActive: boolean; createdAt: string; updatedAt: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedCategories = [...categories];
      updatedCategories[editIndex] = {
        ...updatedCategories[editIndex],
        name: categoryName,
        description: categoryDescription,
        isActive,
        updatedAt: new Date().toLocaleString(),
      };
      setCategories(updatedCategories);
      setEditIndex(null);
    } else {
      const newCategory = {
        name: categoryName,
        description: categoryDescription,
        isActive,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString()
      };
      setCategories([...categories, newCategory]);
    }
    setCategoryName('');
    setCategoryDescription('');
    setIsActive(true);
  };

  const handleEdit = (index: number) => {
    const category = categories[index];
    setCategoryName(category.name);
    setCategoryDescription(category.description);
    setIsActive(category.isActive);
    setEditIndex(index);
  };

  const handleToggleActive = (index: number) => {
    const updatedCategories = [...categories];
    updatedCategories[index].isActive = !updatedCategories[index].isActive;
    updatedCategories[index].updatedAt = new Date().toLocaleString();
    setCategories(updatedCategories);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto my-8 p-6 bg-white rounded-md shadow">
      <h1 className="text-2xl font-semibold mb-6">Cadastro de Categoria de Produtos</h1>
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex flex-col">
          <Label htmlFor="categoryName">Nome da Categoria*</Label>
          <Input
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Nome da categoria"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="categoryDescription">Descrição</Label>
          <Textarea
            id="categoryDescription"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            placeholder="Descrição da categoria"
          />
        </div>
        <div className="flex items-center">
          <Label htmlFor="isActive" className="mr-4">Ativo</Label>
          <Switch 
            id="isActive" 
            checked={isActive} 
            onCheckedChange={(checked) => setIsActive(checked)} 
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleSave}>{editIndex !== null ? 'Atualizar Categoria' : 'Salvar Categoria'}</Button>
        </div>
      </div>
      <div className="mb-6">
        <Label htmlFor="search">Pesquisar Categorias</Label>
        <Input
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar categorias"
        />
      </div>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead>Atualizado em</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.map((category, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.isActive ? 'Sim' : 'Não'}</TableCell>
                <TableCell>{category.createdAt}</TableCell>
                <TableCell>{category.updatedAt}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(index)} className="mr-2">Editar</Button>
                  <Button onClick={() => handleToggleActive(index)}>
                    {category.isActive ? 'Desativar' : 'Ativar'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
