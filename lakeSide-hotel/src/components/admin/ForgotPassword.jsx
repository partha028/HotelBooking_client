// src/components/ForgotPasswordPage.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../css/ForgotPassword.css';

const ForgotPassword = () => {
  const [userName, setEmail] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setMessage('');

    try {
      const response = await axios.put('http://localhost:9192/api/forgot-password', { userName, securityQuestion, securityAnswer, password });

      if (response.status === 200) {
        setMessage('Password Reset Successfully');
        setTimeout(() => {
          navigate('/'); 
        }, 3000);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('Email not found');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="forgot-password-page">
      <div className='form-container'>
        <h2>Forgot Password</h2>
        <form onSubmit={handleResetPassword}>
          <div className="form-group">
            <label htmlFor="userName">User Name:</label>
            <input
              type="userName"
              id="userName"
              value={userName}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
              <label htmlFor="securityQuestion">Security Question:</label>
              <select
                id="securityQuestion"
                value={securityQuestion}
                onChange={(e) => setSecurityQuestion(e.target.value)}
                required
              >
                <option value="">Select a Security Question</option>
                <option value="q1">What was the name of your first pet?</option>
                <option value="q2">What is your mother's maiden name?</option>
                <option value="q3">What was the name of your first school?</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="securityAnswer">Answer:</label>
              <input
                type="text"
                id="securityAnswer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {message && <p className="success-message">{message}</p>}
          <div className='password-button'>
            <button type="submit" className="submit-btn">Reset Password</button>
            <a href="/" className="btn btn-primary text-white">Login</a>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
