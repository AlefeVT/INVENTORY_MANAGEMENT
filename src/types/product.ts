export type Product = {
  id?: string;
  supplierId: string;
  name: string;
  quantity: number;
  categoryId?: string;
  price: number;
  barCode?: string;
  sku?: string;
  description?: string;
  isActive: boolean;
};
