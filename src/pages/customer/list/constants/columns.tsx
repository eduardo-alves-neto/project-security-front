import { ColumnDef } from "@tanstack/react-table";
import { ICustomer } from "../../services/types";

export const columns = (): ColumnDef<ICustomer>[] => [
  {
    accessorKey: "id",
    header: "ID",
  },
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
    header: "Telefone",
  },
  {
    accessorKey: "typePerson",
    header: "Tipo de pessoa",
  },
];
