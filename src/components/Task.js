import React from "react";

const Task = React.memo(
  ({ task, onComplete, onDelete, onMove }) => {
    console.log(`Rendering task: ${task.text}`);

    return (
      <div className="task-item">
        <span>{task.text}</span>
        {onComplete && (
          <button onClick={() => onComplete(task.id)}>Finish</button>
        )}
        {onMove && (
          <button onClick={() => onMove(task.id)}>Move to To-Do</button>
        )}
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.task === nextProps.task;
  }
);

export default Task;
