import { useMutation } from "@tanstack/react-query";
import { occurrenceServices } from "../../services/occurrenceServices";

export const useListModel = () => {
  const listDataQuery = useMutation({
    mutationFn: async () => {
      return await occurrenceServices.get();
    },
  });

  const mutationDelete = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await occurrenceServices.delete(id);
    },
  });

  return {
    listDataQuery,
    mutationDelete,
  };
};
