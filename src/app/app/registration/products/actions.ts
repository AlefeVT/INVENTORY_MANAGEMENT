"use server"
import { prisma } from "@/app/api/database/prisma";

export const createProduct = async (productData: {
  supplier?: string;
  name: string;
  quantity: number;
  category: string;
  price: number;
  barCode?: string;
  sku?: string;
  description?: string;
  isActive: boolean;
}) => {
  try {
    const newProduct = await prisma.product.create({
      data: productData,
    });
    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (id: string, updatedData: {
  supplier?: string;
  name?: string;
  quantity?: number;
  category?: string;
  price?: number;
  barCode?: string;
  sku?: string;
  description?: string;
  isActive?: boolean;
}) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: updatedData,
    });
    return updatedProduct;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    await prisma.product.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const getProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
