import { useState } from "react";
import { Todo } from "../models/Todo";

interface TodoFormProps {
  addTodo: (newTodo: Todo) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ addTodo }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      title,
      completed: false,
      createdAt: new Date(),
    };

    addTodo(newTodo);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <input
        type="text"
        placeholder="Add a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded-lg cursor-pointer hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200 ease-in-out"
      >
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
