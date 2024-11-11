import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch employee data from the server
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Handle delete employee
  const deleteEmployee = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);
        setEmployees(employees.filter((employee) => employee._id !== id));
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <div className="employee-list">
      <h2>Employee List</h2>
      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Created At</th> {/* New column for Created At */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.mobile}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.gender}</td>
                  {/* <td>{employee.course}</td>  */}
                  <td>{Array.isArray(employee.course) ? employee.course.join(', ') : employee.course}</td> 
                  <td>{new Date(employee.createdAt).toLocaleDateString()}</td> {/* Display Created At */}
                  <td>
                    <Link to={`/admin/edit/${employee._id}`} className="edit-btn">
                      Edit
                    </Link>
                    <button
                      className="delete-btn"
                      onClick={() => deleteEmployee(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/admin/add" className="add-btn">Add Employee</Link>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
