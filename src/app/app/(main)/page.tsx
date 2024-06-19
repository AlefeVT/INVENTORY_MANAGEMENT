"use client";
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';

const dataProdutosVendidos = [
  { name: 'Produto A', quantidade: 4000 },
  { name: 'Produto B', quantidade: 3000 },
  { name: 'Produto C', quantidade: 2000 },
  { name: 'Produto D', quantidade: 2780 },
  { name: 'Produto E', quantidade: 1890 },
];

const dataProdutosEstoque = [
  { name: 'Baixo', value: 20, color: '#ec9595' },
  { name: 'Médio', value: 50, color: '#d6bc8c' },
  { name: 'Alto', value: 30, color: '#8bd88b' },
];

const dataProdutosBaixoEstoque = [
  { id: 1, nome: 'Produto F', quantidade: 5, categoria: 'Eletrônicos' },
  { id: 2, nome: 'Produto G', quantidade: 2, categoria: 'Roupas' },
  { id: 3, nome: 'Produto H', quantidade: 8, categoria: 'Alimentos' },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`Valor: ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Taxa: ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


export default function Page() {
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [valorTotalEstoque, setValorTotalEstoque] = useState(0);
  const [produtosBaixoEstoque, setProdutosBaixoEstoque] = useState(0);

  useEffect(() => {
    const delay = setTimeout(() => {
      setTotalProdutos(123);
      setValorTotalEstoque(54321.00);
      setProdutosBaixoEstoque(dataProdutosBaixoEstoque.length);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-8 h-screen overflow-y-auto bg-gray-50 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="py-8 px-6 flex flex-col items-center justify-center bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">Total de Produtos</h2>
            <p className="text-3xl font-bold text-blue-500">{totalProdutos}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-8 px-6 flex flex-col items-center justify-center bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">Valor Total do Estoque</h2>
            <p className="text-3xl font-bold text-green-500">R$ {valorTotalEstoque.toFixed(2)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-8 px-6 flex flex-col items-center justify-center bg-white shadow-md rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800">Produtos em Baixo Estoque</h2>
            <p className="text-3xl font-bold text-red-500">{produtosBaixoEstoque}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="col-span-1">
          <CardContent className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Produtos Mais Vendidos</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataProdutosVendidos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="quantidade" fill="#84b6d8" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardContent className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Nível de Estoque</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  activeIndex={0}
                  activeShape={renderActiveShape}
                  data={dataProdutosEstoque}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dataProdutosEstoque.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className='bg-white shadow-md rounded-lg'>
          <CardContent>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Produtos em Baixo Estoque</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Quantidade</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataProdutosBaixoEstoque.map((produto) => (
                  <TableRow key={produto.id}>
                    <TableCell>{produto.id}</TableCell>
                    <TableCell>{produto.nome}</TableCell>
                    <TableCell>{produto.categoria}</TableCell>
                    <TableCell>
                      <Badge variant="destructive">{produto.quantidade}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}