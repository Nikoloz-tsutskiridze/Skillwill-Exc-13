import React, { useState, useCallback } from "react";
import "./App.css";
import TaskList from "./components/Tasklist";

function App() {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = useCallback(() => {
    if (newTask.trim()) {
      setTasks((prevTasks) => [
        ...prevTasks,
        { text: newTask, id: Date.now() },
      ]);
      setNewTask("");
    }
  }, [newTask]);

  const completeTask = useCallback((id) => {
    setTasks((prevTasks) => {
      const task = prevTasks.find((task) => task.id === id);
      if (task) {
        setCompletedTasks((prevCompletedTasks) => [
          ...prevCompletedTasks,
          task,
        ]);
        return prevTasks.filter((task) => task.id !== id);
      }
      return prevTasks;
    });
  }, []);

  const deleteTask = useCallback((id, isCompleted) => {
    if (isCompleted) {
      setCompletedTasks((prevCompletedTasks) =>
        prevCompletedTasks.filter((task) => task.id !== id)
      );
    } else {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  }, []);

  const moveToTasks = useCallback((id) => {
    setCompletedTasks((prevCompletedTasks) => {
      const task = prevCompletedTasks.find((task) => task.id === id);
      if (task) {
        setTasks((prevTasks) => [...prevTasks, task]);
        return prevCompletedTasks.filter((task) => task.id !== id);
      }
      return prevCompletedTasks;
    });
  }, []);

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div className="task-container">
        <div className="task-column">
          <h2>To Be Performed</h2>
          <TaskList
            tasks={tasks}
            onComplete={completeTask}
            onDelete={(id) => deleteTask(id, false)}
          />
        </div>
        <div className="task-column">
          <h2>Completed</h2>
          <TaskList
            tasks={completedTasks}
            onMove={moveToTasks}
            onDelete={(id) => deleteTask(id, true)}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
