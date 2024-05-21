// components/Register.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);

      const response = await axios.post('http://54.242.41.61:5000/api/register', { formData });

      if (response.ok) {
        // Registration successful, redirect to todo page
        navigate('/login');
      } else {
        // Handle registration error
        // Example: show error message
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;
