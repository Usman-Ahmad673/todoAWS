import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', username);
    formData.append('password', password);
    try{
        const response = await axios.post(
          // 'https://todoapp-ten-orcin.vercel.app/register',
          'http://54.242.41.61:5000/api/register',
          formData,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        navigate('/');
        
    }
    catch{
        setUsername('')
        setPassword('')
        navigate('/signup');
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <div>
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Unique Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />
        <button type="submit" style={buttonStyle}>
          Signup
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '20px' }}>
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
};

export default SignupPage;
