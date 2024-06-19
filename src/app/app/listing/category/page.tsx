"use client"
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCategorys, updateCategory } from '../../registration/category/actions';
import { useRouter } from 'next/navigation';
import { BiLoaderCircle } from 'react-icons/bi';

export default function CategorysList() {
  const [Categorys, setCategorys] = useState<any[]>([]);
  const [filteredCategorys, setFilteredCategorys] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const fetchCategorys = async () => {
    try {
      setIsLoading(true); 
      const Categorys = await getCategorys();
      setCategorys(Categorys);
      setFilteredCategorys(Categorys);
      setIsLoading(false); 
    } catch (error) {
      console.error("Error fetching Categorys:", error);
      toast.error("Erro ao buscar produtos.");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = Categorys.filter(category =>
      category.name.toLowerCase().includes(term) ||
      category.priority.toLowerCase().includes(term) ||
      category.description.toLowerCase().includes(term)
    );
    setFilteredCategorys(filtered);
    setCurrentPage(1);
  };

  const handleEditProduct = (product: any) => {
    const Categorystring = JSON.stringify(product);
  const params = new URLSearchParams({ product: Categorystring }).toString();
  router.push(`/app/registration/Categorys?${params}`);
  };

  const handleInactivateProduct = async (productId: string) => {
    try {
      await updateCategory(productId, { isActive: false });
      fetchCategorys();
      toast.success("Produto inativado com sucesso.");
    } catch (error) {
      console.error("Error inactivating product:", error);
      toast.error("Erro ao inativar produto.");
    }
  };

  useEffect(() => {
    fetchCategorys();
  }, []);

  const totalPages = Math.ceil(filteredCategorys.length / itemsPerPage);
  const paginatedCategorys = filteredCategorys.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
              <TableHead>Categoria</TableHead>
              <TableHead>Prioridade de reposição</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedCategorys.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.priority}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>{product.isActive ? "Ativo" : "Inativo"}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditProduct(product)} className='mr-4'>Editar</Button>
                  <Button onClick={() => handleInactivateProduct(product.id)}>Inativar</Button>
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
