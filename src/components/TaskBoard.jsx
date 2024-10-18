import React, { useEffect, useState } from 'react';
import TaskColumn from './TaskColumn';
import { v4 as uuidv4 } from 'uuid';

const TaskBoard = () => {
  const initialColumns = [
    { id: uuidv4(), title: 'To Do', tasks: [] },
    { id: uuidv4(), title: 'In Progress', tasks: [] },
    { id: uuidv4(), title: 'Done', tasks: [] },
  ];

  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem('taskColumns');
    return savedColumns ? JSON.parse(savedColumns) : initialColumns;
  });

  useEffect(() => {
    localStorage.setItem('taskColumns', JSON.stringify(columns));
  }, [columns]);

  const addTask = (columnId, taskTitle) => {
    setColumns(prev =>
      prev.map(column =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, { id: uuidv4(), title: taskTitle }] }
          : column
      )
    );
  };

  const editTask = (columnId, taskId, newTitle) => {
    setColumns(prev =>
      prev.map(column =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.map(task =>
                task.id === taskId ? { ...task, title: newTitle } : task
              ),
            }
          : column
      )
    );
  };

  const deleteTask = (columnId, taskId) => {
    setColumns(prev =>
      prev.map(column =>
        column.id === columnId
          ? { ...column, tasks: column.tasks.filter(task => task.id !== taskId) }
          : column
      )
    );
  };

  const moveTask = (sourceColumnId, destinationColumnId, taskId) => {
    setColumns(prev => {
      // Find source and destination columns
      const sourceColumn = prev.filter(column => column.title === sourceColumnId)[0];
      const destinationColumn = prev.filter(column => column.title === destinationColumnId)[0];
      
      // Check if both columns exist
      if (!sourceColumn || !destinationColumn) return prev;
  
      // Find the task to move
      const taskToMove = sourceColumn.tasks.filter(task => task.id === taskId)[0];
      
      // If the task doesn't exist, return the previous state
      if (!taskToMove) return prev;
  
      return prev.map(column => {
        if (column.title === sourceColumnId) {
          // Remove the task from the source column
          return {
            ...column,
            tasks: column.tasks.filter(task => task.id !== taskId),
          };
        }
        if (column.title === destinationColumnId) {
          // Add the task to the destination column
          return {
            ...column,
            tasks: [...column.tasks, taskToMove],
          };
        }
        return column; // Return other columns unchanged
      });
    });
  };
  

  return (
    <div className="task-board">
      {columns.map(column => (
        <TaskColumn
          key={column.id}
          column={column}
          addTask={addTask}
          editTask={editTask}
          deleteTask={deleteTask}
          moveTask={moveTask}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
