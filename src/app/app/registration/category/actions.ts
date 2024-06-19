"use server"
import { prisma } from "@/app/api/database/prisma";
import { Category } from "@/types/category";

export const createCategory = async (CategoryData: {
  name: string;
  priority: string;
  description?: string;
  isActive: boolean;
}) => {
  try {
    const newCategory = await prisma.category.create({
      data: CategoryData,
    });
    return newCategory;
  } catch (error) {
    console.error("Error creating Category:", error);
    throw error;
  }
};

export const updateCategory = async (id: string, updatedData: Partial<Category>) => {
  try {
    const existingCategory = await prisma.category.findUnique({
      where: { id },
    });

    if (!existingCategory) {
      throw new Error(`Category with id ${id} not found`);
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        ...existingCategory,
        ...updatedData,
      },
    });

    return updatedCategory;
  } catch (error) {
    console.error("Error updating Category:", error);
    throw error;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    await prisma.category.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting Category:", error);
    throw error;
  }
};

export const getCategorys = async () => {
  try {
    const Categorys = await prisma.category.findMany();
    return Categorys;
  } catch (error) {
    console.error("Error fetching Categorys:", error);
    throw error;
  }
};
