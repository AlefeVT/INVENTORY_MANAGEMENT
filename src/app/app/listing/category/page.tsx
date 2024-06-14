"use client"
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProducts, updateProduct } from '../../registration/products/actions';
import { useRouter } from 'next/navigation';

export default function ProductsList() {
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

  const handleInactivateProduct = async (productId: string) => {
    try {
      await updateProduct(productId, { isActive: false });
      fetchProducts();
      toast.success("Produto inativado com sucesso.");
    } catch (error) {
      console.error("Error inactivating product:", error);
      toast.error("Erro ao inativar produto.");
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
        />
      </div>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Descrição</TableHead>
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
                  <Button onClick={() => handleEditProduct(product)}>Editar</Button>
                  <Button onClick={() => handleInactivateProduct(product.id)}>Inativar</Button>
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
