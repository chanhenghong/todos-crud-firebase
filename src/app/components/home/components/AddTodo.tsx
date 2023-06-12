import React, { useState } from "react";
import { db } from "@/config/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Button, Stack, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

const AddTodo = ({ todos }) => {
  const [todo, setTodo] = useState("");
  const [dupli, setDupli] = useState(false);
  console.log("todossss:::", todos);
  // const gg = todos.forEach((todo) => console.log("forEach:::", todo));
  const handleSubmit = async (values) => {
    values.preventDefault();
    setDupli(false);
    let a: Boolean = false;
    todos.forEach((todo1: any) => {
      if (todo1.todo == todo) {
        setDupli(true);
        a = true;
        console.log("a11::::", a);
        console.log("todo::", todo1.todo);
        console.log("todo2::", todo);
        console.log("dupli in IF::::", dupli);
      }
    });
    console.log("a::::", a);
    if (!todo) return;
    if (a == true) return;

    await addDoc(collection(db, "todos"), {
      todo,
      isCompleted: false,
      createdAt: new Date(),
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
              height: 128,
            },
          }}
        >
          <Paper elevation={2}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <TextField
                sx={{ m: 1, width: "450px" }}
                id="outlined-basic"
                label="Add Todo"
                placeholder="..."
                fullWidth
                defaultValue={todo}
                variant="outlined"
                onChange={(e) => setTodo(e.target.value)}
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
                  startIcon={<AddCircleOutlineIcon />}
                >
                  Add
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </div>
  );
};
export default AddTodo;
