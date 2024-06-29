import React from "react";
import Task from "./Task";

const TaskList = React.memo(
  ({ tasks, onComplete, onDelete, onMove }) => {
    console.log("Rendering task list");

    return (
      <div className="task-column">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onComplete={onComplete}
            onDelete={onDelete}
            onMove={onMove}
          />
        ))}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.tasks === nextProps.tasks;
  }
);

export default TaskList;
