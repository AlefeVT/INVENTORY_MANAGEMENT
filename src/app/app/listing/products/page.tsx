"use client"

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategoryNameById, getProducts, updateProduct, getSupplierNameById } from '../../registration/products/actions';
import { useRouter } from 'next/navigation';
import { BiLoaderCircle } from "react-icons/bi";

export default function Page() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setIsLoading(true); 
      const products = await getProducts();
      setProducts(products);
      setFilteredProducts(products);
      setIsLoading(false);
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
      categories[product.categoryId]?.toLowerCase().includes(term) ||
      suppliers[product.supplierId]?.toLowerCase().includes(term)
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
  const [categories, setCategories] = useState<{ [key: string]: string }>({});
  const [suppliers, setSuppliers] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchCategoriesAndSuppliers = async () => {
      const categoriesMap: { [key: string]: string } = {};
      const suppliersMap: { [key: string]: string } = {};
      for (const product of products) {
        if (!categoriesMap[product.categoryId]) {
          const categoryName = await getCategoryNameById(product.categoryId);
          if (categoryName) {
            categoriesMap[product.categoryId] = categoryName;
          }
        }
        if (!suppliersMap[product.supplierId]) {
          const supplierName = await getSupplierNameById(product.supplierId);
          if (supplierName) {
            suppliersMap[product.supplierId] = supplierName;
          }
        }
      }
      setCategories(categoriesMap);
      setSuppliers(suppliersMap);
    };

    if (products.length > 0) {
      fetchCategoriesAndSuppliers();
    }
  }, [products]);

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
        {isLoading && <div className="flex justify-center mt-4"><BiLoaderCircle size={30} className="text-gray-400 animate-spin" /></div>}
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
                <TableCell>{categories[product.categoryId] || "Carregando..."}</TableCell>
                <TableCell>{suppliers[product.supplierId] || "Carregando..."}</TableCell>
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
      <div className="flex justify-center mt-6 w-90 gap-6">
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
