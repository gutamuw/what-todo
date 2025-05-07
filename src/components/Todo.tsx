import { Todo } from "../models/Todo";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodo,
  removeTodo,
  updateTodo,
}) => {
  return (
    <div
      onClick={() => toggleTodo(todo.id)}
      className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg shadow-md cursor-pointer ${
        todo.completed
          ? "bg-emerald-100 border-l-4 border-emerald-700"
          : "bg-gray-100 border-l-4 border-gray-400"
      }`}
    >
      <div className="flex-1">
        <h2 className="text-lg font-semibold text-gray-800">{todo.title}</h2>
        <p
          className={`text-sm ${
            todo.completed ? "text-emerald-700" : "text-gray-600"
          }`}
        >
          {todo.completed ? "Completed" : "Not Completed"}
        </p>
      </div>
      <div className="flex gap-2 mt-3 sm:mt-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            removeTodo(todo.id);
          }}
          className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          aria-label="Remove Todo"
        >
          ✖
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            updateTodo(todo.id);
          }}
          className="px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          aria-label="Update Todo"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
