"use client";
import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function Page() {
  const [supplierName, setSupplierName] = useState('');
  const [supplierDescription, setSupplierDescription] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [suppliers, setSuppliers] = useState<{ name: string; description: string; contactInfo: string; isActive: boolean; createdAt: string; updatedAt: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedSuppliers = [...suppliers];
      updatedSuppliers[editIndex] = {
        ...updatedSuppliers[editIndex],
        name: supplierName,
        description: supplierDescription,
        contactInfo,
        isActive,
        updatedAt: new Date().toLocaleString(),
      };
      setSuppliers(updatedSuppliers);
      setEditIndex(null);
    } else {
      const newSupplier = {
        name: supplierName,
        description: supplierDescription,
        contactInfo,
        isActive,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString()
      };
      setSuppliers([...suppliers, newSupplier]);
    }
    setSupplierName('');
    setSupplierDescription('');
    setContactInfo('');
    setIsActive(true);
  };

  const handleEdit = (index: number) => {
    const supplier = suppliers[index];
    setSupplierName(supplier.name);
    setSupplierDescription(supplier.description);
    setContactInfo(supplier.contactInfo);
    setIsActive(supplier.isActive);
    setEditIndex(index);
  };

  const handleToggleActive = (index: number) => {
    const updatedSuppliers = [...suppliers];
    updatedSuppliers[index].isActive = !updatedSuppliers[index].isActive;
    updatedSuppliers[index].updatedAt = new Date().toLocaleString();
    setSuppliers(updatedSuppliers);
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto my-8 p-6 bg-white rounded-md shadow">
      <h1 className="text-2xl font-semibold mb-6">Cadastro de Fornecedores</h1>
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex flex-col">
          <Label htmlFor="supplierName">Nome do Fornecedor*</Label>
          <Input
            id="supplierName"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            placeholder="Nome do fornecedor"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="supplierDescription">Descrição</Label>
          <Textarea
            id="supplierDescription"
            value={supplierDescription}
            onChange={(e) => setSupplierDescription(e.target.value)}
            placeholder="Descrição do fornecedor"
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="contactInfo">Informações de Contato*</Label>
          <Input
            id="contactInfo"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder="Informações de contato"
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
          <Button onClick={handleSave}>{editIndex !== null ? 'Atualizar Fornecedor' : 'Salvar Fornecedor'}</Button>
        </div>
      </div>
      <div className="mb-6">
        <Label htmlFor="search">Pesquisar Fornecedores</Label>
        <Input
          id="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar fornecedores"
        />
      </div>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Contato</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead>Atualizado em</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.map((supplier, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.description}</TableCell>
                <TableCell>{supplier.contactInfo}</TableCell>
                <TableCell>{supplier.isActive ? 'Sim' : 'Não'}</TableCell>
                <TableCell>{supplier.createdAt}</TableCell>
                <TableCell>{supplier.updatedAt}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(index)} className="mr-2">Editar</Button>
                  <Button onClick={() => handleToggleActive(index)}>
                    {supplier.isActive ? 'Desativar' : 'Ativar'}
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
