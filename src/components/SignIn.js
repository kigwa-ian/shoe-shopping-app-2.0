import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    authService.login(username, password).then(
      () => {
        // Redirect to the Profile or Home page
        navigate('/profile');
      },
      (error) => {
        const resMessage =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          'Login failed.';
        setMessage(resMessage);
        setLoading(false);
      }
    );
  };

  return (
    <form onSubmit={handleSignIn} className="max-w-md mx-auto p-4 border">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
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
        {loading ? 'Signing in...' : 'Sign In'}
      </button>
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </form>
  );
};

export default SignIn;
