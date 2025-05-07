interface ProgressCircleProps {
  progress: number;
  completedTodos: number;
  totalTodos: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress,
  completedTodos,
  totalTodos,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg className="w-24 h-24" viewBox="0 0 36 36">
        <circle
          className="text-gray-300"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          cx="18"
          cy="18"
          r="15.915"
        />
        <circle
          className="text-green-500"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          cx="18"
          cy="18"
          r="15.915"
          strokeDasharray="100"
          strokeDashoffset={100 - progress}
          style={{ transition: "stroke-dashoffset 0.3s ease" }}
        />
      </svg>
      <h1 className="absolute text-lg font-semibold">
        {completedTodos}/{totalTodos}
      </h1>
    </div>
  );
};

export default ProgressCircle;
