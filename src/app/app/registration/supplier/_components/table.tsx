import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Supplier } from '@/types/supplier'; 

interface SupplierTableProps {
  supplierList: Supplier[];
  onRemoveSupplier: (index: number) => void;
  onEditSupplier: (index: number) => void; 
}

const SupplierTable: React.FC<SupplierTableProps> = ({ supplierList, onRemoveSupplier, onEditSupplier }) => {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Nome Fantasia</TableHead>
            <TableHead>CNPJ/CPF</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {supplierList.map((supplier, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{supplier.name}</TableCell>
              <TableCell>{supplier.cnpjCpf}</TableCell>
              <TableCell>{supplier.supplierType}</TableCell>
              <TableCell>{supplier.telephone || supplier.cellphone}</TableCell> 
              <TableCell>
                <Button size="sm" variant="outline" onClick={() => onEditSupplier(index)}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => onRemoveSupplier(index)}>Remover</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SupplierTable;