import React, { useState } from "react";
import { db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Button, Stack, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SearchList from "./SearchList";

interface IProps {
  todos: any;
}

const AddTodo = (props: IProps) => {
  const { todos } = props;
  const [todo, setTodo] = useState("");
  const [dupFlag, setDupFlag] = useState(Boolean);

  //START: Filter array object TODO
  const result = todos.filter((obj: any) => obj.todo.includes(todo));
  //END:

  const handleSubmit = async (values: any) => {
    values.preventDefault();
    let dupFlag: any = false;
    todos.forEach((todo1: any) => {
      if (todo1.todo == todo) {
        dupFlag = true;
      }
    });
    if (!todo) return;
    setDupFlag(dupFlag);
    if (dupFlag == true) return;

    await addDoc(collection(db, "todos"), {
      todo,
      isCompleted: false,
      createdAt: Date.now(),
    });
    setTodo("");
  };

  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              minWidth: 550,
              minHeight: 128,
            },
          }}
        >
          <Paper elevation={2}>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <TextField
                sx={{ m: 1, width: "450px" }}
                id="outlined-basic"
                label="Add Todo"
                placeholder="..."
                error={dupFlag == true ? true : false}
                helperText={
                  dupFlag == true ? "This todo is already exist!" : null
                }
                fullWidth
                defaultValue={todo}
                variant="outlined"
                onChange={(e) => setTodo(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit(e);
                  }
                }}
              />
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  onClick={handleSubmit}
                  variant="outlined"
                  size="small"
                  sx={{ mr: 1 }}
                  startIcon={<AddCircleOutlineIcon />}
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            {todo != "" && <SearchList result={result} />}
          </Paper>
        </Box>
      </Stack>
    </div>
  );
};
export default AddTodo;
