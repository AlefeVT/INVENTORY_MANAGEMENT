"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PDFViewer } from "@react-pdf/renderer";
import DefaultReport from "../../components/DefaultReport";
import Link from "next/link";

interface StockItem {
  product: string;
  quantity: number;
  price: string;
}

const Report: React.FC = () => {
  const searchParams = useSearchParams();
  const [stockData, setStockData] = useState<StockItem[]>([]);

  useEffect(() => {
    const data = searchParams.get('data');
    if (data) {
      setStockData(JSON.parse(decodeURIComponent(data)));
    }
  }, [searchParams]);

  return (
    <div className="">

        <div className=" bg-gray-500 items-center">

          <div className="flex justify-between px-2 py-2">
          <h1 className="text-white ml-5">Relatório de Estoque</h1>
          <Link href={'/app/Generate-Report'} className="text-white text-xs bg-gray-800 rounded-md px-4 py-2">Voltar</Link>
          </div>

        </div>

          {stockData.length > 0 ? (
            <PDFViewer className="w-full h-screen">
              <DefaultReport data={stockData} />
            </PDFViewer>
          ) : (
            <p>Gerando relatório...</p>
          )}

    </div>

  );
};

export default Report;
