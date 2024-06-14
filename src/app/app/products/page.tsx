"use client"
import React, { useState } from 'react';
import BarcodeReader from 'react-barcode-reader';
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function Page() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleScan = (result: string | null) => {
    if (result) {
      setScanResult(result);
      closeModal();
    }
  };

  const handleError = (error: any) => {
    console.error(error);
  };

  return (
    <div className="max-w-7xl mx-auto my-8 p-6 bg-white rounded-md shadow">
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="flex flex-col">
          <Label htmlFor="supplier">Fornecedor*</Label>
          <Select>
            <SelectTrigger id="supplier">
              <SelectValue placeholder="Selecione um fornecedor" />
            </SelectTrigger>
            <SelectContent />
          </Select>
        </div>
        <div className="flex flex-col">
          <Label htmlFor="product">Produto*</Label>
          <Input id="product" placeholder="Nome do produto" />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="quantity">Quantidade*</Label>
          <Input id="quantity" type="number" placeholder="0" />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="category">Categoria</Label>
          <Select>
            <SelectTrigger id="category">
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent />
          </Select>
        </div>
        <div className="flex flex-col">
          <Label htmlFor="price">Preço*</Label>
          <Input id="price" type="number" step="0.01" placeholder="0.00" />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="sku">SKU</Label>
          <Input id="sku" placeholder="Código SKU" />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" placeholder="Descrição do produto" />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="status">Ativo</Label>
          <Switch id="status" defaultChecked />
        </div>
      </div>
      <div className="flex justify-end mb-6">
        <Button variant="secondary">Adicionar Produto</Button>
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
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>Produto Exemplo</TableCell>
              <TableCell>10</TableCell>
              <TableCell>R$ 100,00</TableCell>
              <TableCell>Exemplo</TableCell>
              <TableCell>
                <Button variant="destructive">Remover</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mt-6">
        <Button>Cadastrar Produtos</Button>
      </div>
      <div className="flex justify-end mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={openModal}>Ler Código de Barras</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Leitura de Código de Barras</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col items-center">
              <BarcodeReader
                onError={handleError}
                onScan={handleScan}
              />
              <DialogFooter>
                <Button onClick={closeModal}>Fechar</Button>
              </DialogFooter>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {scanResult && (
        <div className="mt-4">
          <h3>Resultado do Código:</h3>
          <p>{scanResult}</p>
        </div>
      )}
    </div>
  );
}
