import { useState } from "react";
import { Todo } from "../models/Todo";
import TodoItem from "./Todo";
import TodoForm from "./TodoForm";
import { AnimatePresence, motion } from "framer-motion";
import { Modal } from "./Modal";

interface TodoListProps {
  todos: Todo[];
  addTodo: (newTodo: Todo) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
  updateTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  addTodo,
  toggleTodo,
  removeTodo,
  updateTodo,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative max-w-[800px] w-full bg-white shadow-lg rounded-lg p-6 mt-10 min-h-[400px]">
      <div className="space-y-4">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <TodoItem
                todo={todo}
                toggleTodo={toggleTodo}
                removeTodo={removeTodo}
                updateTodo={updateTodo}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        aria-label="Add Todo"
      >
        +
      </button>

      {isModalOpen && (
        <Modal addTodo={addTodo} closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default TodoList;
