import TodoForm from "./TodoForm";
import { Todo } from "../models/Todo";

interface ModalProps {
  addTodo: (newTodo: Todo) => void;
  closeModal: () => void;
}

export const Modal: React.FC<ModalProps> = ({ addTodo, closeModal }) => {
  const handleAddTodo = (newTodo: Todo) => {
    addTodo(newTodo);
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-[#1c398ef8] backdrop-blur-lg flex flex-col items-center justify-center z-50 p-2">
      <div>
        <h1 className="text-3xl mb-10 text-white font-bold">
          What are <br /> you going <br /> todo today?
        </h1>
        <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
          <button
            onClick={closeModal}
            className="absolute top-4 left-4 text-white hover:text-gray-300 focus:outline-none"
            aria-label="Close Modal"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <TodoForm addTodo={handleAddTodo} />
        </div>
      </div>
    </div>
  );
};
