// ResetPassword.js

import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:3001/gym/resetpswd/${token}`, { password });
    alert('Password reset successfully');
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" placeholder="Enter new password" onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Reset Password</button>
    </form>
  );
};

export default ResetPassword;
