import { Box, Button, Stack, TablePagination, Typography } from "@mui/material";

export interface IListTablePagination {
  rowsLength: number;
  page: number;
  rowsPerPage: number;
  onPageChange: VoidFunction;
  onRowsPerPageChange: VoidFunction;
}

export const ListTablePagination = ({
  page,
  rowsLength,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}: IListTablePagination) => {
  return (
    <TablePagination
      page={page}
      disabled
      ActionsComponent={(actionsProp) => (
        <Box sx={{ mx: 2 }} gap={1}>
          <Stack direction="row" alignItems={"center"}>
            <Button
              variant="outlined"
              size="small"
              sx={{ maxHeight: 40, minWidth: 120 }}
              onClick={(e) => actionsProp.onPageChange(e, actionsProp.page - 1)}
              disabled={actionsProp.page === 0}
            >
              {"<- Anterior"}
            </Button>

            <Stack flexDirection="row" alignItems="center" mx={1}>
              <Typography sx={{ mx: 1, minWidth: 10 }}>
                {actionsProp.page + 1}
              </Typography>

              <span>/</span>

              <Typography ml={1}>
                {`${Math.ceil(actionsProp.count / actionsProp.rowsPerPage)}`}
              </Typography>
            </Stack>

            <Button
              size="small"
              variant="contained"
              sx={{ maxHeight: 40, minWidth: 120 }}
              onClick={(e) => actionsProp.onPageChange(e, actionsProp.page + 1)}
              disabled={
                actionsProp.page >=
                Math.ceil(actionsProp.count / actionsProp.rowsPerPage) - 1
              }
            >
              {"Proximo ->"}
            </Button>
          </Stack>
        </Box>
      )}
      rowsPerPage={rowsPerPage}
      labelRowsPerPage={"Linhas por página:"}
      count={rowsLength}
      rowsPerPageOptions={[5, 10, 25]}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
};
