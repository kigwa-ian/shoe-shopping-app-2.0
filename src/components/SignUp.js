import React, { useState } from 'react';
import authService from '../services/auth';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    authService.register(username, email, password).then(
      () => {
        setMessage('Registration successful! Please log in.');
        setLoading(false);
        navigate('/login');  // Redirect to login page after successful registration
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          'Registration failed.';
        setMessage(resMessage);
        setLoading(false);
      }
    );
  };

  return (
    <form onSubmit={handleSignUp} className="max-w-md mx-auto p-4 border">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full mb-2 p-2 border"
        disabled={loading}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-2 p-2 border"
        disabled={loading}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full mb-4 p-2 border"
        disabled={loading}
      />
      <button
        type="submit"
        className={`w-full p-2 text-white ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </form>
  );
};

export default SignUp;

