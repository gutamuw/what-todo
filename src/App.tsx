import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { Todo } from "./models/Todo";
import ProgressCircle from "./components/ProgressCircle";
import { preview } from "vite";

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
      if (isAscending) {
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

        <div className="w-full max-w-[800px] flex items-start justify-start mt-10 mb-2">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-200 ease-in-out"
            onClick={toggleSortOrder}
            title={isAscending ? "Sort Descending" : "Sort Ascending"}
          >
            ↕
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
