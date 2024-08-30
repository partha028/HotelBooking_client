import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './../css/SignUpPage.css';

const SignUpPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:9192/api/sign-up', {
        userName,
        firstName,
        lastName,
        dob,
        gender,
        password,
        securityQuestion,
        securityAnswer,
      });

      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Username already exists');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="sign-up-page">
      <div className="form-container">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSignUp}>
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="userName">Email:</label>
            <input
              type="email"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="submit-btn">Sign Up</button>
          <button type="button" className="back-btn" onClick={() => navigate('/')}>
            Back to Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
