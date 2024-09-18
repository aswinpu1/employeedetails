// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeeList = ({ setEditingEmployee }) => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    const response = await axios.get('http://localhost:5000/employees');
    setEmployees(response.data);
  };

  const deleteEmployee = async (id) => {
    await axios.delete(`http://localhost:5000/employees/${id}`);
    fetchEmployees();
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(employee => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.username}</td>
            <td>{employee.email}</td>
            <td>{employee.status}</td>
            <td>
              <button onClick={() => setEditingEmployee(employee)}>Edit</button>
              <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeeList;
