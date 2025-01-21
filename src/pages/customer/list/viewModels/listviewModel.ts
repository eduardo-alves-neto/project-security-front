import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { ListModelType } from "../types";
import { ICustomer } from "../../services/types";
import { enqueueSnackbar } from "notistack";
import { columns } from "../constants/columns";

export const useListViewModel = ({ listDataQuery }: ListModelType) => {
  const [rowsLength, setRowsLength] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState<ICustomer[]>([]);

  const { mutateAsync, isPending } = listDataQuery;

  const fetch = useCallback(() => {
    mutateAsync({ page, rowsPerPage }).then((res) => {
      const { data, error, count } = res;
      setRows(data as ICustomer[]);
      if (count !== null) setRowsLength(count);
      if (error) {
        enqueueSnackbar(error?.message, { variant: "error" });
      }
    });
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  const handleChangePage = useCallback((_: unknown, newPage: number) => {
    setPage(newPage);
    fetch();
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
      fetch();
    },
    []
  );

  const Columns = useCallback(() => columns(), []);

  return {
    rows,
    page,
    rowsLength,
    rowsPerPage,
    isLoading: isPending,
    Columns,
    handleChangePage,
    handleChangeRowsPerPage,
  };
};
