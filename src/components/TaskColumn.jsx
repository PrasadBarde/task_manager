import React, { useState } from 'react';
import Task from './Task';

const TaskColumn = ({ column, addTask, editTask, deleteTask, moveTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  const handleAddTask = () => {
    if (taskTitle) {
      addTask(column.id, taskTitle);
      setTaskTitle('');
    }
  };

  const handleEditTask = (taskId) => {
    if (editingTitle) {
      editTask(column.id, taskId, editingTitle);
      setEditingTaskId(null);
      setEditingTitle('');
    }
  };

  return (
    <div className="task-column">
      <h2 className="column-title">{column.title}</h2>
      <div className="task-list">
        {column.tasks.map(task => (
          <Task
            key={task.id}
            task={task}
            editTask={() => {
              setEditingTaskId(task.id);
              setEditingTitle(task.title);
            }}
            deleteTask={() => deleteTask(column.id, task.id)}
            handleEditTask={handleEditTask}
            editing={editingTaskId === task.id}
            editingTitle={editingTitle}
            setEditingTitle={setEditingTitle}
            moveTask={moveTask} // Pass moveTask function
            columnId={column.title} // Pass current column title
          />
        ))}
      </div>
      {column.title === 'To Do' && (
        <>
          <input
            type="text"
            value={taskTitle}
            onChange={e => setTaskTitle(e.target.value)}
            placeholder="Add a new task"
            className="task-input"
          />
          <button onClick={handleAddTask} className="add-task-button">
            Add Task
          </button>
        </>
      )}
    </div>
  );
};

export default TaskColumn;
