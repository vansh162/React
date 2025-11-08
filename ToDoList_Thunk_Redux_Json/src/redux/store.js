import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./features/ToDoSlice";

export default configureStore({
  reducer: {
    todolist: todoReducer,
  },
});