import { useMutation } from "@tanstack/react-query";
import { customerServices } from "../../services/customerServices";

interface IListDataQuery {
  page: number;
  rowsPerPage: number;
}

export const useListModel = () => {
  const listDataQuery = useMutation({
    mutationFn: async ({ page, rowsPerPage }: IListDataQuery) => {
      const from = page * rowsPerPage;
      const to = from + rowsPerPage - 1;

      const res = await customerServices.get({ from, to });

      return res;
    },
  });

  const mutationDelete = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const res = await customerServices.delete(id);
      return res;
    },
  });

  return {
    listDataQuery,
    mutationDelete,
  };
};
