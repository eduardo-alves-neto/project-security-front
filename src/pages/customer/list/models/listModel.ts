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

      return await customerServices.get({ from, to });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      await customerServices.delete(id);
    },
  });

  return {
    listDataQuery,
    mutationDelete,
  };
};
