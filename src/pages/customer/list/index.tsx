import { useListModel } from "./models/listModel";
import { useListViewModel } from "./viewModels/listviewModel";
import { ListView } from "./views";

export const List = () => {
  const model = useListModel();
  const viewModel = useListViewModel(model);

  return <ListView {...viewModel} />;
};
