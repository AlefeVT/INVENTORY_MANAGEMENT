"use client"

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProducts, updateProduct } from '../../registration/products/actions';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const products = await getProducts();
      setProducts(products);
      setFilteredProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Erro ao buscar produtos.");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      product.supplier.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleEditProduct = (product: any) => {
    const productString = JSON.stringify(product);
    const params = new URLSearchParams({ product: productString }).toString();
    router.push(`/app/registration/products?${params}`);
  };

  const handleToggleProductStatus = async (productId: string, isActive: boolean) => {
    try {
      await updateProduct(productId, { isActive: !isActive });
      fetchProducts();
      toast.success(isActive ? "Produto inativado com sucesso." : "Produto ativado com sucesso.");
    } catch (error) {
      console.error("Error toggling product status:", error);
      toast.error("Erro ao alterar status do produto.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto my-8 p-6 bg-white rounded-md shadow">
      <ToastContainer />
      <div className="flex justify-between mb-6">
        <Input
          placeholder="Buscar produtos..."
          value={searchTerm}
          onChange={handleSearch}
          className='w-1/2'
        />
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
              <TableHead>Fornecedor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedProducts.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.supplier}</TableCell>
                <TableCell>{product.isActive ? "Ativo" : "Inativo"}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditProduct(product)} className='m-2'>Editar</Button>
                  <Button onClick={() => handleToggleProductStatus(product.id, product.isActive)} className='m-2'>
                    {product.isActive ? "Inativar" : "Ativar"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between mt-6">
        <Button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span>Página {currentPage} de {totalPages}</span>
        <Button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}