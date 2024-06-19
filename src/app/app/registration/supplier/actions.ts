"use server";
import { prisma } from "@/app/api/database/prisma"; 
import { Supplier } from "@/types/supplier";


export const createSupplier = async (supplierData: Supplier) => {
  try {
    const { id, ...Data} = supplierData;

    const newSupplier = await prisma.supplier.create({
      data: Data,
    });
    return newSupplier;
  } catch (error) {
    console.error("Error creating supplier:", error);
    throw error;
  }
};

export const updateSupplier = async (id: string, updatedData: Partial<Supplier>) => {
  try {
    const existingSupplier = await prisma.supplier.findUnique({
      where: { id },
    });

    if (!existingSupplier) {
      throw new Error(`Supplier with id ${id} not found`);
    }

    const updatedSupplier = await prisma.supplier.update({
      where: { id },
      data: {
        ...existingSupplier,
        ...updatedData,
      },
    });

    return updatedSupplier;
  } catch (error) {
    console.error("Error updating Supplier:", error);
    throw error;
  }
};

export const deleteSupplier = async (id: string) => {
  try {
    await prisma.supplier.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting Supplier:", error);
    throw error;
  }
};

export const getSuppliers = async () => {
  try {
    const suppliers = await prisma.supplier.findMany();
    return suppliers;
  } catch (error) {
    console.error("Error fetching Suppliers:", error);
    throw error;
  }
};