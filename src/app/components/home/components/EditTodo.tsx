import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}
export interface EditTodoProps {
  open: boolean;
  handleClose: () => void;
  todo: any;
  handleEdit: (todo: any, newTodo: string) => void;
}
const EditTodo = (props: EditTodoProps) => {
  const { open, handleClose, todo, handleEdit } = props;
  const [newTodo, setNewTodo] = useState("");

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Edit Todo
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TextField
            id="outlined-basic"
            sx={{ width: "400px" }}
            variant="outlined"
            defaultValue={todo.todo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleEdit(todo, newTodo);
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handleEdit(todo, newTodo)}>
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};
export default EditTodo;
