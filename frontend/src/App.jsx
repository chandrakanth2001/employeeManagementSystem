import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar'; // Import NavBar component
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import EmployeeForm from './components/EmployeeForm';
import EmployeeCard from './components/EmployeeCard';

const App = () => {
  return (
    <Router>
      <div className="App">
        <NavBar /> {/* Navbar will show on all pages */}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/add" element={<EmployeeCard />} />
          <Route path="/admin/edit/:id" element={<EmployeeForm />} /> {/* For editing existing employees */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;