import { Box, Button, IconButton, Popover } from "@mui/material";
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { IOptionsRow } from "../../types";

interface IMenuOptionsPopover<T> {
  options: IOptionsRow[];
  row: T ;
}

export const MenuOptionsPopover = <T,>({ options,row }: IMenuOptionsPopover<T>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen = !!anchorEl;
  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <CiMenuKebab />
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
        <Box p={2} sx={{ minWidth: 200 }}>
          {options?.map((option) => (
            <Button
              onClick={() => {
                console.log(row.original)
                option.onClick();
              }}
            >
              {option.label}
            </Button>
          ))}
        </Box>
      </Popover>
    </>
  );
};
