import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { flexRender } from "@tanstack/react-table";
import { useListTable, IListTable } from "./hooks/useListTable";
import { PaletteColorOptions } from "@mui/material";

interface ListTableProps<T> extends IListTable<T> {}

const ListTable = <T,>({ rows, columns }: ListTableProps<T>) => {
  const table = useListTable<T>({ rows: rows ?? [], columns: columns ?? [] });

  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead
          sx={{
            backgroundColor: (theme) =>
              theme.palette.primary["50" as keyof PaletteColorOptions],
          }}
        >
          <TableRow>
            {table?.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                {headerGroup?.headers?.map((header) => (
                  <TableCell key={header.id}>
                    {flexRender(
                      header?.column.columnDef.header,
                      header?.getContext()
                    )}
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
                  {flexRender(cell?.column?.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListTable;
