import { ColumnDef } from "@tanstack/react-table";
import { ICollaborator } from "../../services/types";

export const columns = (): ColumnDef<ICollaborator>[] => [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
];
