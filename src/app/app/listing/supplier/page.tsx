"use client"

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { BiLoaderCircle } from "react-icons/bi";
import { getSuppliers, updateSupplier } from '../../registration/supplier/actions';

export default function Page() {
  const [Supplier, setSupplier] = useState<any[]>([]);
  const [filteredSupplier, setFilteredSupplier] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const fetchSupplier = async () => {
    try {
      setIsLoading(true); 
      const Supplier = await getSuppliers();
      setSupplier(Supplier);
      setFilteredSupplier(Supplier);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Supplier:", error);
      toast.error("Erro ao buscar produtos.");
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = Supplier.filter(supplier =>
      supplier.name.toLowerCase().includes(term) ||
      supplier.category.toLowerCase().includes(term) ||
      supplier.supplier.toLowerCase().includes(term)
    );
    setFilteredSupplier(filtered);
    setCurrentPage(1);
  };

  const handleEditsupplier = (supplier: any) => {
    const Suppliertring = JSON.stringify(supplier);
    const params = new URLSearchParams({ supplier: Suppliertring }).toString();
    router.push(`/app/registration/supplier?${params}`);
  };

  const handleToggleSuppliertatus = async (supplierId: string, isActive: boolean) => {
    try {
      await updateSupplier(supplierId, { isActive: !isActive });
      fetchSupplier();
      toast.success(isActive ? "Fornecedor inativado com sucesso." : "Fornecedor ativado com sucesso.");
    } catch (error) {
      console.error("Error toggling supplier status:", error);
      toast.error("Erro ao alterar status do fornecedor.");
    }
  };

  useEffect(() => {
    fetchSupplier();
  }, []);

  const totalPages = Math.ceil(filteredSupplier.length / itemsPerPage);
  const paginatedSupplier = filteredSupplier.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

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
              <TableHead>Fornecedor</TableHead>
              <TableHead>Razão Social</TableHead>
              <TableHead>CNPJ / CPF</TableHead>
              <TableHead>Tipo de Fornecedor</TableHead>
              <TableHead>telefone</TableHead>
              <TableHead>celular</TableHead>
              <TableHead>email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedSupplier.map((supplier, index) => (
              <TableRow key={supplier.id}>
                <TableCell>{index + 1 + (currentPage - 1) * itemsPerPage}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.corporateName}</TableCell>
                <TableCell>{supplier.cnpjCpf}</TableCell>
                <TableCell>{supplier.supplierType}</TableCell>
                <TableCell>{supplier.telephone}</TableCell>
                <TableCell>{supplier.cellphone}</TableCell>
                <TableCell>{supplier.email}</TableCell>
                <TableCell>{supplier.isActive ? "Ativo" : "Inativo"}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditsupplier(supplier)} className='m-2'>Editar</Button>
                  <Button onClick={() => handleToggleSuppliertatus(supplier.id, supplier.isActive)} className='m-2'>
                    {supplier.isActive ? "Inativar" : "Ativar"}
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
