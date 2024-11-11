// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      navigate('/admin');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Admin Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f3f4f6',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '300px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    outline: 'none',
  },
};

export default Login;
