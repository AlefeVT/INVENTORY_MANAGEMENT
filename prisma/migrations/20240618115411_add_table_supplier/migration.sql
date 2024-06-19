-- CreateTable
CREATE TABLE "Supplier" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "corporateName" TEXT,
    "cnpjCpf" TEXT NOT NULL,
    "supplierType" TEXT NOT NULL,
    "telephone" TEXT,
    "cellphone" TEXT,
    "email" TEXT,
    "website" TEXT,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
