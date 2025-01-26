import { Box, Popover } from "@mui/material";
import { MouseEvent } from "react";

interface IMenuOptionsPopover {
  isOpen: boolean;
  anchorEl: HTMLElement | null;
}

export const MenuOptionsPopover = ({
  anchorEl,
  isOpen,
}: IMenuOptionsPopover) => {
  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClosePopover}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
    >
      <Box p={2} sx={{ minWidth: 200 }}>
        {/* <Typography variant="subtitle1">Detalhes da linha:</Typography>
        <Typography variant="body2">
          {selectedRow
            ? JSON.stringify(selectedRow.original, null, 2)
            : "Nenhum dado"}
        </Typography> */}
      </Box>
    </Popover>
  );
};
