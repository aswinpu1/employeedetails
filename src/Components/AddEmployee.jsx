// src/components/AddEmployee.js
import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  status: yup.string().required('Status is required')
});

const AddEmployee = ({ fetchEmployees }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    await axios.post('http://localhost:5000/employees', data);
    reset();
    fetchEmployees();  // Refresh employee list after adding
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Username</label>
        <input {...register('username')} />
        <p>{errors.username?.message}</p>
      </div>
      <div>
        <label>Email</label>
        <input {...register('email')} />
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <label>Status</label>
        <select {...register('status')}>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <p>{errors.status?.message}</p>
      </div>
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default AddEmployee;
