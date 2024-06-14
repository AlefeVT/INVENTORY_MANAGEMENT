"use client";

import React, { useState } from "react";
import { AiOutlineFileText} from "react-icons/ai";

interface StockItem {
  product: string;
  quantity: number;
  price: string;
  category: string;
  date: string;
}

const GenerateReport: React.FC = () => {
  const [filter, setFilter] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [stockData, setStockData] = useState<StockItem[]>([
    { product: "Produto A", quantity: 100, price: "R$ 10,00", category: "Categoria 1", date: "2024-06-01" },
    { product: "Produto B", quantity: 50, price: "R$ 20,00", category: "Categoria 2", date: "2024-07-01" },
  ]);

  const handleGenerateClick = () => {
    const data = encodeURIComponent(JSON.stringify(filteredData));
    const link = document.createElement("a");
    link.href = `/report?data=${data}`;
    link.target = "_blank";
    link.click();
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };

  const filteredData = stockData.filter((item) => {
    const matchesProduct = filter ? item.product === filter : true;
    const matchesCategory = category ? item.category === category : true;
    const matchesDateRange = startDate && endDate ? new Date(item.date) >= new Date(startDate) && new Date(item.date) <= new Date(endDate) : true;
    return matchesProduct && matchesCategory && matchesDateRange;
  });

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
  
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <AiOutlineFileText className="mr-2" />
        Relatório de Estoque
      </h1>
  
      <div className="mb-4 flex flex-wrap space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center w-full md:w-auto">
          <select
            value={filter}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full md:w-auto"
          >
            <option value="">Selecione o produto...</option>
            <option value="Produto A">Produto A</option>
            <option value="Produto B">Produto B</option>
          </select>
        </div>
  
        <div className="flex items-center w-full md:w-auto">
          <input
            type="date"
            placeholder="Data inicial"
            value={startDate}
            onChange={handleStartDateChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full md:w-auto"
          />
        </div>
  
        <div className="flex items-center w-full md:w-auto">
          <input
            type="date"
            placeholder="Data final"
            value={endDate}
            onChange={handleEndDateChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full md:w-auto"
          />
        </div>
  
        <div className="flex items-center w-full md:w-auto">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="p-2 border border-gray-300 rounded-md shadow-sm w-full md:w-auto"
          >
            <option value="">Selecione a categoria...</option>
            <option value="Categoria 1">Categoria 1</option>
            <option value="Categoria 2">Categoria 2</option>
          </select>
        </div>
  
      </div>
      
      <button
        onClick={handleGenerateClick}
        className="mt-6 bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 flex items-center"
      >
        <AiOutlineFileText className="mr-2" />
        Gerar Relatório
      </button>
    </div>
  );
  
};

export default GenerateReport;
