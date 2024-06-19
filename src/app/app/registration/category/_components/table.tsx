import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Category } from '@/types/category';

interface CategoryTableProps {
  categoryList: Category[];
  onRemoveCategory: (index: number) => void;
  onEditCategory: (index: number) => void;
}

const CategoryTable: React.FC<CategoryTableProps> = ({ categoryList, onRemoveCategory, onEditCategory }) => {
  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Prioridade de Reposição</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categoryList.map((Category, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{Category.name}</TableCell>
              <TableCell>{Category.priority}</TableCell>
              <TableCell>{Category.description}</TableCell>
              <TableCell>
                <Button size="sm" variant="outline" onClick={() => onEditCategory(index)}>Editar</Button>
                <Button size="sm" variant="destructive" onClick={() => onRemoveCategory(index)}>Remover</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default CategoryTable;
