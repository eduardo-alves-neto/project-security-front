import { Button, IconButton, Popover, Stack } from "@mui/material";
import { useState } from "react";
import { IOptionsRow } from "../../types";
import { TfiMoreAlt } from "react-icons/tfi";

interface IMenuOptionsPopover<T> {
  row: T;
  options: IOptionsRow[];
  onDeleteRow?: (row: T) => void;
}

export const MenuOptionsPopover = <T,>({
  options,
  row,
  onDeleteRow,
}: IMenuOptionsPopover<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = !!anchorEl;

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <TfiMoreAlt />
      </IconButton>

      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack
          py={0.5}
          sx={{
            minWidth: 160,
            border: 1,
            borderColor: "divider",
            borderRadius: 1,
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          {options?.map((option) => (
            <Button
              sx={{
                color: "text.primary",
                textTransform: "inherit",
                justifyContent: "flex-start",
              }}
              onClick={() => {
                option.onClick(row);
                setAnchorEl(null);
              }}
            >
              {option.label}
            </Button>
          ))}

          <Button
            color="error"
            sx={{ textTransform: "inherit", justifyContent: "flex-start" }}
            onClick={() => {
              if (onDeleteRow) onDeleteRow(row);
              setAnchorEl(null);
            }}
          >
            {"Deletar"}
          </Button>
        </Stack>
      </Popover>
    </>
  );
};
