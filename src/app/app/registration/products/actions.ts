"use server"
import { prisma } from "@/app/api/database/prisma";
import { Product } from "@/types/product";

export const createProduct = async (productData: Product) => {
  try {
    const { id, supplierId, categoryId, ...data } = productData; 

    const newProduct = await prisma.product.create({
      data: {
        ...data,
        supplier: { 
          connect: { 
            id: supplierId
          }
        },
        category: { 
          connect: { 
            id: categoryId 
          }
        }
      },
    });

    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async (id: string, updatedData: Partial<Product>) => {
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

export const getCategoryNameById = async (categoryId: string): Promise<string | null> => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    return category ? category.name : null;
  } catch (error) {
    console.error("Erro ao buscar nome da categoria:", error);
    throw error; 
  }
};

export const getSupplierNameById = async (supplierId: string): Promise<string | null> => {
  try {
    const supplier = await prisma.supplier.findUnique({
      where: { id: supplierId },
    });

    return supplier ? supplier.name : null;
  } catch (error) {
    console.error("Erro ao buscar nome do fornecedor:", error);
    throw error;
  }
};