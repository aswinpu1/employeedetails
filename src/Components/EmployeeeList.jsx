// src/components/EmployeeList.js
import React from 'react';

const EmployeeList = ({ employees, setEditingEmployee, deleteEmployee }) => {
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

export default EmployeeList;
