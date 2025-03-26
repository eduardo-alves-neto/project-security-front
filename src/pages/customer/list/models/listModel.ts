import { useMutation } from "@tanstack/react-query";
import { customerServices } from "../../services/customerServices";

export const useListModel = () => {
  const listDataQuery = useMutation({
    mutationFn: async () => {
      return await customerServices.get();
    },
  });

  const mutationDelete = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await customerServices.delete(id);
    },
  });

  return {
    listDataQuery,
    mutationDelete,
  };
};
