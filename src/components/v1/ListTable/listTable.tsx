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
import { MenuOptionsPopover } from "./components/menu-options-popover";
import NotFoundRowsComponent from "./components/not-found-rows";
import {
  IListTablePagination,
  ListTablePagination,
} from "./listTablepagination";
import { LayoutListTableProps } from ".";

interface ListTableProps<T> extends IListTable<T> {
  isLoading?: boolean;
  pagination?: IListTablePagination;
}

const ListTable = <T,>({
  rows,
  columns,
  optionsRow,
  onDeleteRow,
  ...res
}: ListTableProps<T> & LayoutListTableProps<T>) => {
  const table = useListTable<T>({ rows: rows ?? [], columns: columns ?? [] });

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: "none", border: 1, borderColor: "divider" }}
      >
        {!rows ? (
          <NotFoundRowsComponent />
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
                    <TableCell></TableCell>
                  </React.Fragment>
                ))}
              </TableRow>
            </TableHead>

            <TableBody sx={{ backgroundColor: "#FFFFFF" }}>
              {table?.getRowModel()?.rows?.map((row) => (
                <TableRow key={row.id}>
                  {row?.getVisibleCells()?.map((cell) => (
                    <TableCell
                      key={cell.id}
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                      size={"medium"}
                    >
                      {flexRender(
                        cell?.column?.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}

                  {optionsRow && (
                    <TableCell
                      align="right"
                      sx={{ borderBottom: 1, borderColor: "divider" }}
                      size={"small"}
                    >
                      <MenuOptionsPopover
                        row={row}
                        options={optionsRow}
                        onDeleteRow={(row) =>
                          onDeleteRow && onDeleteRow(row.original)
                        }
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {res.pagination && <ListTablePagination {...res.pagination} />}
    </>
  );
};

export default ListTable;
