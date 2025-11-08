import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoAsync,
  deleteTodoAsync,
  fetchTodos,
  updateTodoAsync,
} from "./redux/features/ToDoSlice";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  const [inputText, setText] = useState("");
  const [boolean, setBoolean] = useState(true);
  const [todoIndex, setTodoIndex] = useState(null);
  const dispatch = useDispatch();
  const todoData = useSelector((state) => state.todolist.todos);
  const status = useSelector((state) => state.todolist.status);
  const error = useSelector((state) => state.todolist.error);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  function handleEdit(todo) {
    setText(todo.text);
    setTodoIndex(todo.id);
    setBoolean(false);
  }

  function handleUpdate() {
    dispatch(updateTodoAsync({ id: todoIndex, updateText: { text: inputText } }));
    setBoolean(true);
    setText("");
  }

  function handleAdd() {
    dispatch(addTodoAsync({ text: inputText }));
    setText("");
  }

  function handleDelete(id) {
    dispatch(deleteTodoAsync(id));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 flex-grow">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center">Todo List</h1>
          
          <div className="flex flex-col sm:flex-row gap-2 mb-4 sm:mb-6">
            <input
              type="text"
              value={inputText}
              onChange={(event) => setText(event.target.value)}
              className="flex-grow p-2 sm:p-2.5 text-sm sm:text-base border rounded focus:outline-none focus:border-blue-500"
              placeholder="Add a new todo..."
            />
            {boolean ? (
              <button
                onClick={handleAdd}
                className="bg-blue-500 text-white px-4 py-2 sm:py-2.5 rounded hover:bg-blue-600 text-sm sm:text-base whitespace-nowrap"
              >
                Add
              </button>
            ) : (
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 sm:py-2.5 rounded hover:bg-green-600 text-sm sm:text-base whitespace-nowrap"
              >
                Update
              </button>
            )}
          </div>

          {status === "loading" && (
            <div className="text-center text-gray-600 text-sm sm:text-base py-2">Loading...</div>
          )}
          
          {error && (
            <div className="text-center text-red-600 text-sm sm:text-base py-2 px-2">Error: {error}</div>
          )}

          <div className="space-y-3 sm:space-y-4">
            {todoData?.map((todo, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-white rounded shadow gap-2 sm:gap-0"
              >
                <p className="flex-grow text-sm sm:text-base break-words pr-2">{todo.text}</p>
                <div className="flex gap-2 sm:gap-2 justify-end sm:justify-start">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="bg-yellow-500 text-white px-3 py-1.5 sm:py-1 rounded hover:bg-yellow-600 text-xs sm:text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-500 text-white px-3 py-1.5 sm:py-1 rounded hover:bg-red-600 text-xs sm:text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;