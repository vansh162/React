import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:3004/tasks";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
});

export const addTodoAsync = createAsyncThunk("todos/addTodo", async (todo) => {
  const response = await axios.post(BASE_URL, todo);
  return response.data;
});

export const updateTodoAsync = createAsyncThunk("todos/updateTodo", async ({ id, updateText }) => {
  const response = await axios.put(`${BASE_URL}/${id}`, updateText);
  return { id, updateText: response.data };
});

export const deleteTodoAsync = createAsyncThunk("todos/deleteTodo", async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});

export const todolistSlice = createSlice({
  name: "todolist",
  initialState: {
    todos: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      })
      .addCase(updateTodoAsync.fulfilled, (state, action) => {
        const { id, updateText } = action.payload;
        const todo = state.todos.find(todo => todo.id === id);
        if (todo) {
          Object.assign(todo, updateText);
        }
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      });
  },
});

export default todolistSlice.reducer;