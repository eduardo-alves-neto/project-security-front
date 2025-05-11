import { useMutation } from "@tanstack/react-query";
import { collaboratorServices } from "../../services/collaboratorServices";

export const useListModel = () => {
  const listDataQuery = useMutation({
    mutationFn: async () => {
      return await collaboratorServices.get();
    },
  });

  const mutationDelete = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      await collaboratorServices.delete(id);
    },
  });

  return {
    listDataQuery,
    mutationDelete,
  };
};
