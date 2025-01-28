import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { flexRender } from "@tanstack/react-table";
import { useListTable, IListTable } from "./hooks/useListTable";
import { PaletteColorOptions, IconButton } from "@mui/material";
import { CgMoreVerticalO } from "react-icons/cg";
import { MenuOptionsPopover } from "./components/menu-options-popover";
import NotFoundRowsComponent from "./components/not-found-rows";

interface ListTableProps<T> extends IListTable<T> {
  isLoading?: boolean;
}

const ListTable = <T,>({ rows, columns }: ListTableProps<T>) => {
  const table = useListTable<T>({ rows: rows ?? [], columns: columns ?? [] });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>, row: T) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const isPopoverOpen = Boolean(anchorEl);

  return (
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
                    sx={{ borderBottom: 1 }}
                    size={"small"}
                  >
                    {flexRender(
                      cell?.column?.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>
                ))}

                <TableCell
                  align="right"
                  sx={{ borderBottom: 1 }}
                  size={"small"}
                >
                  <IconButton
                    onClick={(event) => handleOpenPopover(event, row.original)}
                  >
                    <CgMoreVerticalO />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <MenuOptionsPopover
        anchorEl={anchorEl}
        isOpen={isPopoverOpen}
        onClose={handleClosePopover}
      />
    </TableContainer>
  );
};

export default ListTable;
