import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { flexRender } from "@tanstack/react-table";
import { useListTable, IListTable } from "./hooks/useListTable";
import { PaletteColorOptions, Box } from "@mui/material";

interface ListTableProps<T> extends IListTable<T> {
  isLoading?: boolean;
}

const ListTable = <T,>({ rows, columns, isLoading }: ListTableProps<T>) => {
  const table = useListTable<T>({ rows: rows ?? [], columns: columns ?? [] });

  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 200,
          }}
        >
          <CircularProgress />
        </Box>
      ) : rows.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 200,
            backgroundColor: "#f9f9f9",
            borderRadius: "4px",
            borderTop: 1,
          }}
        >
          <Typography variant="h6" color="textSecondary">
            Nenhum dado disponível
          </Typography>
        </Box>
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead
            sx={{
              borderTop: 1,
              borderTopColor: "divider",
              backgroundColor: (theme) =>
                theme.palette.primary["50" as keyof PaletteColorOptions],
            }}
          >
            <TableRow>
              {table?.getHeaderGroups().map((headerGroup) => (
                <React.Fragment key={headerGroup.id}>
                  {headerGroup?.headers?.map((header) => (
                    <TableCell
                      key={header.id}
                      variant="body"
                      sx={{ fontSize: 12.79, fontWeight: 600 }}
                    >
                      {flexRender(
                        header?.column.columnDef.header,
                        header?.getContext()
                      )
                        ?.toString()
                        .toUpperCase()}
                    </TableCell>
                  ))}
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>

          <TableBody
            sx={{
              backgroundColor: "#FFFFFF",
            }}
          >
            {table?.getRowModel()?.rows?.map((row) => (
              <TableRow key={row.id}>
                {row?.getVisibleCells()?.map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(
                      cell?.column?.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default ListTable;
