import { ColumnDef } from "@tanstack/react-table";
import { ICustomer } from "./types";
import { LayoutListTable } from "../../components/v1/ListTable";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase";
import { enqueueSnackbar } from "notistack";

export const List = () => {
  const { data: rows } = useQuery({
    queryKey: ["customer_list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("customers").select("*");
      if (error) {
        enqueueSnackbar(error?.message, { variant: "error" });
        return [];
      }
      return data;
    },
  });

  const columns: ColumnDef<ICustomer>[] = [
    {
      accessorKey: "Name",
      header: "Name",
    },

    {
      accessorKey: "Email",
      header: "Email",
    },
    {
      accessorKey: "Phone",
      header: "Telefone",
    },
    {
      accessorKey: "TypePerson",
      header: "Tipo de pessoa",
    },
  ];

  return (
    <>
      <LayoutListTable rows={rows as ICustomer[]} columns={columns} />
    </>
  );
};
