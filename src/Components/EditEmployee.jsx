// src/components/EditEmployee.js
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const EditEmployee = ({ employee, fetchEmployees, cancelEdit }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: employee
  });

  setValue('username', employee.username);
  setValue('email', employee.email);
  setValue('status', employee.status);

  const onSubmit = async (data) => {
    await axios.put(`http://localhost:5000/employees/${employee.id}`, data);
    fetchEmployees();
    cancelEdit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username</label>
        <input {...register('username')} />
      </div>
      <div>
        <label>Email</label>
        <input {...register('email')} />
      </div>
      <div>
        <label>Status</label>
        <select {...register('status')}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button type="submit">Update Employee</button>
      <button type="button" onClick={cancelEdit}>Cancel</button>
    </form>
  );
};

export default EditEmployee;
