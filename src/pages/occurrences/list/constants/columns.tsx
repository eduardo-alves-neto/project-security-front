import { ColumnDef } from "@tanstack/react-table";
import { IOccurrence } from "../../services/types";
import dayjs from "dayjs";

export const columns = (): ColumnDef<IOccurrence>[] => [
  {
    accessorKey: "description",
    header: "Descrição",
  },

  {
    accessorKey: "collaboratorName",
    header: "Colaborador",
  },
  {
    accessorKey: "customerName",
    header: "Cliente",
  },

  {
    accessorKey: "occurrenceDate",
    header: "Data",
    cell: ({ getValue }) => {
      const value = getValue() as string;
      return value ? dayjs.utc(value).format("DD/MM/YYYY") : "-";
    },
  },
];
