export type Supplier = {
    id: string;
    name: string;
    corporateName?: string;
    cnpjCpf: string;
    supplierType: string;
    telephone?: string;
    cellphone?: string;
    email?: string;
    website?: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
  };