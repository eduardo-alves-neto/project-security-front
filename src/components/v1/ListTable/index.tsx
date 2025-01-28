import { Card, Stack, Typography } from "@mui/material";
import { IListTable } from "./hooks/useListTable";
import { IListTablePagination } from "./listTablepagination";
import ListTable from "./listTable";
import CircularProgressComponent from "./components/circular-progress";
import { IOptionsRow } from "./types";

export interface LayoutListTableProps<T> extends IListTable<T> {
  pagination?: IListTablePagination;
  isLoading?: boolean;
  title?: string;
  optionsRow?: IOptionsRow[];
}

export const LayoutListTable = <T,>(props: LayoutListTableProps<T>) => {
  return (
    <>
      <Stack
        p={1.5}
        component={Card}
        sx={{ backgroundColor: "#ffffff", boxShadow: "none" }}
      >
        <Stack mb={1}>
          <Typography variant="subtitle1" fontWeight={600}>
            {`Total de ${props.title ?? "registros"} : ${
              props?.rows?.length ?? 0
            }`}
          </Typography>
        </Stack>

        {props.isLoading ? (
          <CircularProgressComponent />
        ) : (
          <ListTable {...props} />
        )}
      </Stack>
    </>
  );
};
