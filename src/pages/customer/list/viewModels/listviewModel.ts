import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ListModelType } from "../types";
import { ICustomer } from "../../services/types";
import { enqueueSnackbar } from "notistack";
import { columns } from "../constants/columns";

export const useListViewModel = ({
  listDataQuery,
  mutationDelete,
}: ListModelType) => {
  const [rowsLength, setRowsLength] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<ICustomer[]>([]);

  const { mutateAsync, isPending } = listDataQuery;

  const fetch = useCallback(() => {
    mutateAsync({ page, rowsPerPage }).then((res) => {
      setRows(res.data);
      setRowsLength(res.count);
    }).catch((error) => {
      enqueueSnackbar(error.response?.data?.message || "Erro ao carregar clientes", { variant: "error" });
    });
  }, [page, rowsPerPage]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleChangePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  const handlerDelete = useCallback(async (id: number) => {
    try {
      await mutationDelete.mutateAsync({ id });
      enqueueSnackbar("Cliente deletado com sucesso", { variant: "success" });
      fetch();
    } catch (error: any) {
      enqueueSnackbar(error.response?.data?.message || "Erro ao deletar cliente", { variant: "error" });
    }
  }, [fetch]);

  const Columns = useCallback(() => columns(), []);

  return {
    rows,
    page,
    rowsLength,
    rowsPerPage,
    isLoading: isPending,
    Columns,
    handlerDelete,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};
