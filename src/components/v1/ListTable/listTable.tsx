import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { flexRender } from "@tanstack/react-table";
import { useListTable, IListTable } from "./hooks/useListTable";
import { PaletteColorOptions, Box, IconButton, Popover } from "@mui/material";
import { CgMoreVerticalO } from "react-icons/cg";
import { MenuOptionsPopover } from "./components/menu-options-popover";

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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 200,
            backgroundColor: "#f9f9f9",
            borderRadius: "4px",
            borderTop: 1,
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" color="textSecondary">
            Sem dados
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
                  <TableCell></TableCell>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHead>

          <TableBody sx={{ backgroundColor: "#FFFFFF" }}>
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

                <TableCell align="right">
                  <IconButton
                    onClick={(event) => handleOpenPopover(event, row)}
                  >
                    <CgMoreVerticalO />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      <MenuOptionsPopover anchorEl={anchorEl} isOpen={isPopoverOpen} />
    </TableContainer>
  );
};

export default ListTable;
