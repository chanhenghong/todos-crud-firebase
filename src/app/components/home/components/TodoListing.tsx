import React, { useState } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditTodo from "./EditTodo";
import moment from "moment";

interface IProps {
  todo: any;
  handleComplete: (todo: any) => void;
  handleEdit: (todo: any, newTodo: string) => void;
  handleDelete: (id: string) => void;
}

const TodoListing: React.FC<IProps> = ({
  todo,
  handleComplete,
  handleEdit,
  handleDelete,
}) => {
  const [open, setOpen] = useState(false);
  const date = new Date(todo.createdAt);
  const formatDate = moment(date).format("DD-MM-YYYY");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Stack direction="row">
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Typography
            style={{
              textDecoration: todo.isCompleted ? "line-through" : "none",
              width: "300px",
              color: "black",
            }}
          >
            {todo.todo}
          </Typography>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            sx={{ mt: 1, color: "#667085" }}
          >
            {formatDate}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={() => handleComplete(todo)}
            aria-label="complete"
            size="small"
          >
            {todo.isCompleted ? <DoneAllOutlinedIcon /> : <DoneOutlinedIcon />}
          </IconButton>
          <IconButton onClick={handleClickOpen} aria-label="edit" size="small">
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
