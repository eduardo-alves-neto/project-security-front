import { ColumnDef } from "@tanstack/react-table";
import { ICustomer } from "./types";
import { LayoutListTable } from "../../components/v1/ListTable";
import { ChangeEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../supabase";
import { enqueueSnackbar } from "notistack";
import { Title } from "../../components/v1/title";

export const List = () => {
  const [rowsLength, setRowsLength] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const { data: rows, isLoading } = useQuery({
    queryKey: ["customer_list", page, rowsPerPage],
    queryFn: async () => {
      const from = page * rowsPerPage;
      const to = from + rowsPerPage - 1;

      const { data, error, count } = await supabase
        .from("customers")
        .select("*", { count: "exact" })
        .range(from, to);

      if (error) {
        enqueueSnackbar(error?.message, { variant: "error" });
        return [];
      }

      if (count !== null) setRowsLength(count);
      return data;
    },

    placeholderData: [{ keepPreviousData: true }],
  });

  const columns: ColumnDef<ICustomer>[] = [
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

  return (
    <>
      <Title title="Clientes" />
      
      <LayoutListTable
        rows={rows as ICustomer[]}
        title="clientes"
        columns={columns}
        pagination={{
          rowsLength,
          rowsPerPage,
          page,
          onPageChange: handleChangePage,
          onRowsPerPageChange: handleChangeRowsPerPage,
        }}
        isLoading={isLoading}
      />
    </>
  );
};

// const MOCK_DATA: ICustomer[] = [
//   {
//     Name: "Lucas",
//     Email: "lucas@gmail.com",
//     Phone: "999999999",
//     TypePerson: "Fisica",
//   },
//   {
//     Name: "pedro",
//     Email: "teste@gmail.com",
//     Phone: "999999999",
//     TypePerson: "Fisica",
//   },
//   {
//     Name: "Jose",
//     Email: "teste@gmail.com",
//     Phone: "999999999",
//     TypePerson: "Fisica",
//   },
//   {
//     Name: "Carla",
//     Email: "teste@gmail.com",
//     Phone: "999999999",
//     TypePerson: "Fisica",
//   },
//   {
//     Name: "maria",
//     Email: "teste@gmail.com",
//     Phone: "999999999",
//     TypePerson: "Fisica",
//   },
//   {
//     Name: "ELiza",
//     Email: "teste@gmail.com",
//     Phone: "999999999",
//     TypePerson: "Fisica",
//   },
//   {
//     Name: "Noe",
//     Email: "teste@gmail.com",
//     Phone: "999999999",
//     TypePerson: "Fisica",
//   },
//   {
//     Name: "tiago",
//     Email: "teste@gmail.com",
//     Phone: "999999999",
//     TypePerson: "Fisica",
//   },
//   {
//     Name: "jesus Cristo",
//     Email: "teste@gmail.com",
//     Phone: "999999999",
//     TypePerson: "Fisica",
//   },
//   {
//     Name: "jesus Cristo",
//     Email: "teste@gmail.com",
//     Phone: "999999999",
//     TypePerson: "Fisica",
//   },
//   {
//     Name: "jesus Cristo",
//     Email: "teste@gmail.com",
//     Phone: "999999999",
//     TypePerson: "Fisica",
//   },
// ];
