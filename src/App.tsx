import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { Todo } from "./models/Todo";
import ProgressCircle from "./components/ProgressCircle";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAscending, setIsAscending] = useState(false);

  const addTodo = (newTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const removeTodo = (id: number) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };
  const toggleTodo = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const updateTodo = (id: number) => {
    const newTitle = prompt("Enter new title:")?.trim();

    if (!newTitle) return;

    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const sortTodos = (todos: Todo[], isAscending: boolean) => {
    const sortedTodos = [...todos].sort((a, b) => {
      if (!isAscending) {
        return a.createdAt > b.createdAt ? 1 : -1;
      } else {
        return a.createdAt < b.createdAt ? 1 : -1;
      }
    });
    return sortedTodos;
  };

  const toggleSortOrder = () => {
    setIsAscending((prev) => !prev);
    setTodos(sortTodos(todos, !isAscending));
  };

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const progress = todos.length > 0 ? (completedTodos / todos.length) * 100 : 0;

  return (
    <>
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-3">
        <ProgressCircle
          progress={progress}
          completedTodos={completedTodos}
          totalTodos={todos.length}
        />

        <div className="w-full max-w-[800px] flex items-center justify-between mt-10 mb-2">
          <button
            className="flex items-center px-6 py-3 text-white bg-indigo-500 rounded-full hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-200 ease-in-out"
            onClick={toggleSortOrder}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 10h18M3 14h18M3 18h18"
              />
            </svg>
            {isAscending ? "Sort Ascending" : "Sort Descending"}
          </button>
        </div>

        <TodoList
          todos={todos}
          addTodo={addTodo}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
          updateTodo={updateTodo}
        />
      </div>
    </>
  );
}

export default App;
