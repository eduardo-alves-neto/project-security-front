export interface ICustomer {
  id?: string;
  name: string;
  email: string;
  phone: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  cpf: string;
  birthDate?: Date;
  notes?: string;
  active?: boolean;
  Contract: IContract;
}

export interface IContract {
  id?: string;
  customerId: string; // FK para ICustumer
  title: string; // Ex: "Contrato de prestação de serviços"
  description?: string;
  startDate: Date;
  endDate?: Date;
  value: number;
  status: "ativo" | "pendente" | "cancelado" | "expirado";
  services?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  notes?: string;
}

export interface IContractService {
  id?: string;
  name: string;
  description?: string;
  price: number;
}
