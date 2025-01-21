import { useListModel } from "./list/models/listModel";
import { useListViewModel } from "./list/viewModels/listviewModel";
import { ListView } from "./list/views";

export const List = () => {
  const model = useListModel();
  const viewModel = useListViewModel(model);

  return <ListView {...viewModel} />;
};
