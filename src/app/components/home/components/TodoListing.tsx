import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { IconButton, Stack, Typography } from "@mui/material";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTodo from "./EditTodo";

interface IProps {
  todo: any;
  handleComplete: any;
  handleEdit: any;
  handleDelete: any;
}

const TodoListing: React.FC<IProps> = ({
  todo,
  handleComplete,
  handleEdit,
  handleDelete,
}) => {
  const [newTodo, setNewTodo] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Stack direction="row">
        <Typography
          style={{
            textDecoration: todo.isCompleted ? "line-through" : "none",
            width: "300px",
            color: "black",
          }}
        >
          {todo.todo}
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={() => handleComplete(todo)}
            aria-label="complete"
            size="small"
          >
            {todo.isCompleted ? <DoneAllOutlinedIcon /> : <DoneOutlinedIcon />}
          </IconButton>
          <IconButton
            // onClick={() => handleEdit(todo, newTodo)}
            onClick={handleClickOpen}
            aria-label="edit"
            size="small"
          >
            <BorderColorOutlinedIcon />
          </IconButton>
          <EditTodo
            open={open}
            handleClose={handleClose}
            todo={todo}
            handleEdit={handleEdit}
          />
          <IconButton
            onClick={() => handleDelete(todo.id)}
            aria-label="delete"
            size="small"
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Stack>
      </Stack>
    </div>
  );
};
export default TodoListing;
