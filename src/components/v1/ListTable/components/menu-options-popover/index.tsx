import * as React from "react";
import { useState } from "react";
import { IOptionsRow } from "../../types";
import { TfiMoreAlt } from "react-icons/tfi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Button, IconButton, Popover, Stack } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

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
  const [openDialog, setOpenDialog] = useState(false); 

  const handleClickDelete = () => {
    setOpenDialog(true); 
    setAnchorEl(null); 
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); 
  };

  const handleConfirmDelete = () => {
    if (onDeleteRow) {
      onDeleteRow(row); 
    }
    setOpenDialog(false); 
  };

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
            onClick={handleClickDelete}
          >
            {"Deletar"}
          </Button>
        </Stack>
      </Popover>

      <AlertDialogSlide
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete} 
      />
    </>
  );
};

interface IAlertDialagoSlid {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  open,
  onClose,
  onConfirm,
}: IAlertDialagoSlid) {
  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    onConfirm(); 
    onClose(); 
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      TransitionComponent={Transition}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Você tem certeza que deseja excluir?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Esta ação não pode ser desfeita.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={handleConfirm} color="error">
          Deletar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
