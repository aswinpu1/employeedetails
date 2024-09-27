// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import AddEmployee from './Components/AddEmployee';
import EmployeeList from './Components/EmployeeeList';
import EditEmployee from './Components/EditEmployee';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Fetch employees from the server initially
  const fetchEmployees = async () => {
    const response = await axios.get('http://localhost:3000/employees');
    setEmployees(response.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add employee to state and database
  const addEmployee = async (newEmployee) => {
    const response = await axios.post('http://localhost:3000/employees', newEmployee);
    setEmployees([...employees, response.data]);  // Update state directly with the new employee
  };

  // Update employee and state
  const updateEmployee = async (updatedEmployee) => {
    const response = await axios.put(`http://localhost:3000/employees/${updatedEmployee.id}`, updatedEmployee);
    setEmployees(employees.map(emp => emp.id === updatedEmployee.id ? response.data : emp));
    setEditingEmployee(null);  // Cancel edit mode after updating
  };

  // Delete employee and update state
  const deleteEmployee = async (id) => {
    await axios.delete(`http://localhost:3000/employees/${id}`);
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return (
    <div className="App">
      <h1>Employee Management System</h1>
      {editingEmployee ? (
        <EditEmployee
          employee={editingEmployee}
          updateEmployee={updateEmployee}
          cancelEdit={() => setEditingEmployee(null)}
        />
      ) : (
        <AddEmployee addEmployee={addEmployee} />
      )}
      <EmployeeList
        employees={employees}
        setEditingEmployee={setEditingEmployee}
        deleteEmployee={deleteEmployee}
      />
    </div>
  );
}

export default App;
