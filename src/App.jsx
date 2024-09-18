// src/App.js
import React, { useState } from 'react';
import './App.css';
import AddEmployee from './Components/AddEmployee';
import EmployeeeList from './Components/EmployeeeList';
import EditEmployee from './Components/EditEmployee';

function App() {
  const [editingEmployee, setEditingEmployee] = useState(null);

  const cancelEdit = () => setEditingEmployee(null);

  return (
    <div className="App">
      <h1>Employee Management System</h1>
      {editingEmployee ? (
        <EditEmployee 
          employee={editingEmployee} 
          cancelEdit={cancelEdit}
        />
      ) : (
        <AddEmployee />
      )}
      <EmployeeeList setEditingEmployee={setEditingEmployee} />
    </div>
  );
}

export default App;
