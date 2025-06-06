import { ColumnDef } from "@tanstack/react-table";
import { ICustomer } from "../../services/types";

export const columns = (): ColumnDef<ICustomer>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "telefone",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
];
