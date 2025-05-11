import React, { useState } from 'react';
import './RegisterPage.css';
import logo from '../../assets/Logo.png';
import student from '../../assets/Student.png';
import Spinner from '../../components/common/Spinner';


const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
 

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    

    setTimeout(() => {
      setLoading(false);
      alert('Registration successful!');
      window.location.href = '/login';
    }, 5000);
  };

  return (
    <div className="register-container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <img src={logo} alt="GUC Logo" className="register-logo" />
          <div className="register-content">
            <div className="register-left">
              <img src={student} alt="Internship visual" />
            </div>

            <form className="register-form" onSubmit={handleSubmit}>
              <h2>Register as a Company</h2>
              <input className="register-input" type="text" placeholder="Company Name" required />
              <input className="register-input" type="text" placeholder="Industry" required />
              <input className="register-input" type="text" placeholder="Company Size" required />
              <input className="register-input" type="email" placeholder="Email" required />
              <input className="register-input" type="text" placeholder="Password" required />
              <label>Upload Logo:</label>
              <input className="register-input" type="file" accept="image/*" />

              <label>Upload Legal/Tax Documents:</label>
              <input className="register-input" type="file" accept="file/*" />

              <button className="register-button" type="submit">Sign Up</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterPage;
