import React, { useEffect, useState } from 'react';
import './../css/UserProfile.css';
import axios from 'axios';

const UserProfile = () => {
  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:9192/api/user-profile");
        setError(null);
        setProfile(response.data);
      } catch (e) {
        if (error.response && error.response.status === 404) {
          setErrorMessage('Profile not found.');
        }
         else {
          setErrorMessage('Failed to load profile details. Please try again later.');
        }
      }
    }
    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="profile-details">
          <div className="profile-field">
            <label>First Name:</label>
            <span>{profile.firstName || '-'}</span>
          </div>
          <div className="profile-field">
            <label>Last Name:</label>
            <span>{profile.lastName || '-'}</span>
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <span>{profile.userName || '-'}</span>
          </div>
          <div className="profile-field">
            <label>Date of Birth:</label>
            <span>{profile.dob || '-'}</span>
          </div>
          <div className="profile-field">
            <label>Gender:</label>
            <span>{profile.gender || '-'}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
