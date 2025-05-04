import React, { useState } from 'react';

const RegisterCompanyPage = () => {
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [size, setSize] = useState('');
  const [email, setEmail] = useState('');
  const [logo, setLogo] = useState(null);

  const handleFileChange = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add company registration logic here
    console.log('Registering Company:', companyName, industry, size, email);
  };

  return (
    <div className="register-company-container">
      <h2>Register as Company</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Company Name:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Industry:</label>
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Size:</label>
          <input
            type="text"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Logo:</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Register Company</button>
      </form>
    </div>
  );
};

export default RegisterCompanyPage;
