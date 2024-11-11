import React from 'react';
import EmployeeForm from './EmployeeForm';
import { useNavigate } from 'react-router-dom';
import './EmployeeCard.css';

const AddEmployee = () => {
  const navigate = useNavigate();

  const handleSuccess = (newEmployee) => {
    alert('Employee added successfully');
    navigate('/admin'); 
  };

  return (
    <div className="add-employee-container">
      <h2>Add New Employee</h2>
      <EmployeeForm onSubmitSuccess={handleSuccess} />
    </div> 
  );
};

export default AddEmployee;
