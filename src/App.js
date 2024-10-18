// src/App.js
import React from 'react';
import TaskBoard from './components/TaskBoard';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1 className="app-title">Task Management Board</h1>
      <TaskBoard />
    </div>
  );
}

export default App;
