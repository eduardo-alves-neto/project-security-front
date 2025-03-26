export interface ICustomer {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  endereco?: {
    rua?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    cidade?: string;
    estado?: string;
    cep?: string;
  };
  dataNascimento?: Date;
  observacoes?: string;
  ativo?: boolean;
}
