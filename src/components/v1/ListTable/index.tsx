import { Card, Stack, Typography } from "@mui/material";
import { IListTable } from "./hooks/useListTable";
import {
  IListTablePagination,
  ListTablePagination,
} from "./listTablepagination";
import ListTable from "./listTable";

interface LayoutListTableProps<T> extends IListTable<T> {
  pagination?: IListTablePagination;
}

export const LayoutListTable = <T,>(props: LayoutListTableProps<T>) => {
  return (
    <>
      <Stack
        p={1.5}
        variant="outlined"
        component={Card}
        sx={{ backgroundColor: "#FFFF", boxShadow: "none" }}
      >
        <Stack mb={1}>
          <Typography variant="h6" fontWeight={700}>
            Total: {props?.rows?.length ?? 0}
          </Typography>
        </Stack>

        {/* TABELA */}
        {<ListTable {...props} />}
        {/* RODAPE DE PAGINAÇÃO */}
        {props.pagination && <ListTablePagination {...props.pagination} />}
      </Stack>
    </>
  );
};
