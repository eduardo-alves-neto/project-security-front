import { Card, Stack, Typography } from "@mui/material";
import { IListTable } from "./hooks/useListTable";
import {
  IListTablePagination,
  ListTablePagination,
} from "./listTablepagination";
import ListTable from "./listTable";

interface LayoutListTableProps<T> extends IListTable<T> {
  pagination?: IListTablePagination;
  isLoading?: boolean;
  title?: string;
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

        <ListTable {...props} />

        {props.pagination && <ListTablePagination {...props.pagination} />}
      </Stack>
    </>
  );
};
