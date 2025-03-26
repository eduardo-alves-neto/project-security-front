import { ColumnDef } from "@tanstack/react-table";
import { ICustomer } from "../../services/types";

export const columns = (): ColumnDef<ICustomer>[] => [
  {
    accessorKey: "nome",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "telefone",
    header: "Telefone",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
];
