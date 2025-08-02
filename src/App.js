import React, { useState } from "react";
import './styles/App.css';

function App() {
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    const trimmedInput = taskInput.trim();

    if (trimmedInput === '') return;

    const newTask = {
      id: Date.now(),
      text: trimmedInput,
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTaskInput('');
  };

  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  };

  return (
    <div className="app-container">
      <h1>QuickTask</h1>
      <p>Your simple, clean to-do quick task list.</p>

      <div className="task-input">
        <input
          type="text"
          placeholder="Enter a new task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key ==='Enter'){
              handleAddTask();
            }
          }} 
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="task-list">
        {tasks.length === 0 && <p className="no-tasks">No tasks added yet!!</p>}
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <span
              className={task.completed ? 'completed' : ''}
              onClick={() => toggleTaskCompleted(task.id)}
            >
              {task.text}
            </span>
            <button
              className="delete-btn"
              onClick={() => handleDeleteTask(task.id)}
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
