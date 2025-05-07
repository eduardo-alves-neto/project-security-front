import { useListModel } from "./models/listModel";
import { useListViewModel } from "./viewModels/listviewModel";

export type ListModelType = ReturnType<typeof useListModel>;
export type ListViewModel = ReturnType<typeof useListViewModel>;
