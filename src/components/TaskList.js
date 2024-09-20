import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  const saveTask = (task) => {
    const updatedTasks = task.id
      ? tasks.map(t => (t.id === task.id ? task : t))
      : [...tasks, { ...task, id: Date.now() }];

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setEditingTask(null);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancel = () => {
    setEditingTask(null);
  };

  return (
    <div className="task-list">
      <div className="task-form">
        <TaskForm task={editingTask} onSave={saveTask} onCancel={handleCancel} />
      </div>
      <div>
        {tasks.map(task => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={handleEdit}
            onDelete={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
