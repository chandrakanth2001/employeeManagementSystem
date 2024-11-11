// src/components/AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';

const AdminPanel = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/employees')
      .then(response => setEmployees(response.data))
      .catch(error => console.log(error));
  }, [employees]);

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      
      <EmployeeList employees={employees} />
    </div>
  );
};

export default AdminPanel;
