import React, { useEffect, useState } from "react";

const Section = () => {
  const [textInput, setTextInput] = useState("");
  const [todolist, setTodolist] = useState(
    JSON.parse(localStorage.getItem("todolist")) || []
  );
  const [bool, setBool] = useState(false);
  const [editIndex, setEditIndex] = useState("");
  const [errorMsg, setErrorMsg] = useState(false);

  function add() {
    if (textInput == "") {
      setErrorMsg(true);
      return;
    }
    setTodolist([...todolist, textInput]);
    setTextInput("");
  }

  function deleteFun(index) {
    let filterData = todolist.filter((item, i) => i != index);
    setTodolist(filterData);
  }

  function edit(index) {
    setBool(true);
    setTextInput(todolist[index]);
    setEditIndex(index);
  }

  function update() {
    let updatelist = todolist.map((todo, i) =>
      i == editIndex ? textInput : todo
    );
    setTodolist(updatelist);
    setBool(false);
    setTextInput("");
  }

  useEffect(() => {
    localStorage.setItem("todolist", JSON.stringify(todolist));
  }, [todolist]);
  console.log(todolist);

  return (
    <>
      <div className="m-8">
        <form className="max-w-md mx-auto">
          <div className="relative flex">
            <input
              type="text"
              id="default-search"
              className="block w-full p-4 ps-05 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your task here..."
              value={textInput}
              onChange={(x) => setTextInput(x.target.value)}
            />
            {bool ? (
              <button
                onClick={update}
                type="button"
                className="text-white absolute end-2.5 bottom-2.5 bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-2 "
              >
                Update
              </button>
            ) : (
              <button
                onClick={add}
                type="button"
                className="text-gray-900 absolute end-2.5 bottom-2.5 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 text-center"
              >
                Add
              </button>
            )}
          </div>
        </form>
      </div>

      {errorMsg && (
        <div
          id="alert-2"
          className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 w-80 content-center m-auto"
          role="alert"
        >
          <svg
            className="shrink-0 w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div className="ms-3 text-sm font-medium">
            Input is Empty! Input can't be Empty.
          </div>
          <button
            onClick={() => setErrorMsg(false)}
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-2"
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}

      <div className="place-items-center">
        {todolist.map((item, index) => (
          <div key={index}>
            <div className="text-center border-4">
              <p>{item}</p>
            </div>
            <div className="inline-flex rounded-md shadow-xs" role="group">
              <button
                onClick={() => {
                  deleteFun(index);
                }}
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-br border border-gray-900 rounded-s-lg from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:z-10 focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800 focus:outline-none focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  edit(index);
                }}
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 border border-gray-900 hover:bg-gradient-to-bl focus:z-10 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 dark:border-white dark:hover:bg-gray-700 dark:focus:bg-gray-700 rounded-e-lg"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Section;
