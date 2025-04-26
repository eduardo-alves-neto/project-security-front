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
}
