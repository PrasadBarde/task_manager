// src/components/Task.js
import React from 'react';

const Task = ({ task, editTask, deleteTask, handleEditTask, editing, editingTitle, setEditingTitle, moveTask, columnId }) => {
  return (
    <div className="task">
      {editing ? (
        <>
          <input
            type="text"
            value={editingTitle}
            onChange={(e) => setEditingTitle(e.target.value)}
            onBlur={() => handleEditTask(task.id)}
            className="task-edit-input"
            onKeyDown={(e) => e.key === 'Enter' && handleEditTask(task.id)}
          />
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <div>
          <button onClick={editTask} className="edit-button">Edit</button>
          <button onClick={deleteTask} className="delete-button">Delete</button>
          {/* Move buttons based on the column title */}
          {columnId === 'To Do' && (
            <button onClick={() => moveTask(columnId, 'In Progress', task.id)} className="move-button">In Progress</button>
          )}
          {columnId === 'In Progress' && (
            <button onClick={() => moveTask(columnId, 'Done', task.id)} className="move-button">Done</button>
          )}
          </div>
          
        </>
      )}
    </div>
  );
};

export default Task;
