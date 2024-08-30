// src/components/LoginPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../css/LoginPage.css';

const LoginPage = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:9192/api/login', { userName, password });

      if (response.status === 200) {
        navigate('/home');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage('Invalid username or password');
      }
       else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate('/forgot-password')}>
          Forgot Password
        </button>
        <button type="button" onClick={() => navigate('/sign-up')}>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
