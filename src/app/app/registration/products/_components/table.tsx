"use client"

import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Product } from '@/types/product';
import { getCategoryNameById } from '../actions';

interface ProductTableProps {
  productList: Product[];
  onRemoveProduct: (index: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ productList, onRemoveProduct }) => {
  const [categories, setCategories] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesMap: { [key: string]: string } = {};
      for (const product of productList) {
        if (!categoriesMap[product.categoryId]) {
          const categoryName = await getCategoryNameById(product.categoryId);
          if (categoryName) {
            categoriesMap[product.categoryId] = categoryName;
          }
        }
      }
      setCategories(categoriesMap);
    };

    fetchCategories();
  }, [productList]);

  return (
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
          {productList.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{categories[product.categoryId] || "Carregando..."}</TableCell>
              <TableCell>
                <Button onClick={() => onRemoveProduct(index)}>Remover</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProductTable;
