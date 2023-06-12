import { Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import AddTodo from "./components/AddTodo";
import TodoListing from "./components/TodoListing";
import {
  collection,
  query,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase";

const HomeTodo = () => {
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todos: any = [];
      querySnapshot.forEach((doc) => {
        todos.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todos);
    });
  }, []);
  const handleComplete = async (todo: any) => {
    await updateDoc(doc(db, "todos", todo.id), {
      isCompleted: !todo.isCompleted,
    });
  };
  const handleEdit = async (todo1: any, title: any) => {
    await updateDoc(doc(db, "todos", todo1.id), {
      todo: title,
    });
  };
  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "todos", id));
  };
  
  return (
    <div>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <Typography
          variant="h4"
          sx={{
            color: "#667085",
            fontWeight: 500,
            mt: 4,
          }}
        >
          All Tasks
        </Typography>
        <AddTodo todos={todos}/>
        <Stack>
          {todos.map((todo: any) => (
            <TodoListing
              key={todo.id}
              todo={todo}
              handleComplete={handleComplete}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </Stack>
      </Stack>
    </div>
  );
};
export default HomeTodo;
