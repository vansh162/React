import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodoAsync,
  deleteTodoAsync,
  fetchTodos,
  updateTodoAsync,
} from "./redux/features/todoSlice";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
      
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">Todo List</h1>
          
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={inputText}
              onChange={(event) => setText(event.target.value)}
              className="flex-grow p-2 border rounded focus:outline-none focus:border-blue-500"
              placeholder="Add a new todo..."
            />
            {boolean ? (
              <button
                onClick={handleAdd}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            ) : (
              <button
                onClick={handleUpdate}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Update
              </button>
            )}
          </div>

          {status === "loading" && (
            <div className="text-center text-gray-600">Loading...</div>
          )}
          
          {error && (
            <div className="text-center text-red-600">Error: {error}</div>
          )}

          <div className="space-y-4">
            {todoData?.map((todo, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white rounded shadow"
              >
                <p className="flex-grow">{todo.text}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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