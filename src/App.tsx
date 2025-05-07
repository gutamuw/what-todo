import { useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import { Todo } from "./models/Todo";
import ProgressCircle from "./components/ProgressCircle";

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

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

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const progress = todos.length > 0 ? (completedTodos / todos.length) * 100 : 0;

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-3 pb-3">
        <ProgressCircle
          progress={progress}
          completedTodos={completedTodos}
          totalTodos={todos.length}
        />

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
