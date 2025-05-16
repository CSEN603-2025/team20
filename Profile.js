import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    jobInterests: 'Web Development, Data Science',
    internships: [
      { company: 'TechCorp', role: 'Frontend Developer', duration: '3 months', responsibilities: 'Developed UI components' },
      { company: 'DataWorks', role: 'Data Analyst', duration: '6 months', responsibilities: 'Data cleaning and analysis' },
    ],
    activities: ['Member of Coding Club', 'Organizer of TechFest'],
    
  }
);

  const handleChange = (e, field) => {
    setProfile({ ...profile, [field]: e.target.value });
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };
  const goBackToDashboard = () => {
    window.location.href = '/student-dashboard';
  }

  return (
    <div className="profile-container">
         <button onClick={goBackToDashboard} className="go-back-button">
        Go Back to Dashboard
      </button>
      <h2>My Profile</h2>
      
      <div className="profile-section">
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> {editMode ? <input value={profile.name} onChange={(e) => handleChange(e, 'name')} /> : profile.name}</p>
        <p><strong>Email:</strong> {editMode ? <input value={profile.email} onChange={(e) => handleChange(e, 'email')} /> : profile.email}</p>
      </div>

      <div className="profile-section">
        <h3>Job Interests</h3>
        {editMode ? (
          <textarea value={profile.jobInterests} onChange={(e) => handleChange(e, 'jobInterests')} />
        ) : (
          <p>{profile.jobInterests}</p>
        )}
      </div>

      <div className="profile-section">
        <h3>Previous Internships / Part-time Jobs</h3>
        {profile.internships.map((internship, index) => (
          <div key={index} className="internship">
            <p><strong>Company:</strong> {internship.company}</p>
            <p><strong>Role:</strong> {internship.role}</p>
            <p><strong>Duration:</strong> {internship.duration}</p>
            <p><strong>Responsibilities:</strong> {internship.responsibilities}</p>
          </div>
        ))}
      </div>

      <div className="profile-section">
        <h3>College Activities</h3>
        {editMode ? (
          <textarea value={profile.activities.join(', ')} onChange={(e) => handleChange(e, 'activities')} />
        ) : (
          <ul>
            {profile.activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={handleEditToggle}>{editMode ? 'Save' : 'Edit Profile'}</button>
    </div>
  );
};

export default Profile;
