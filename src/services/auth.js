import axios from 'axios';

const API_URL = 'https://your-backend-api.com/api/auth/';

const register = async (username, email, password) => {
  try {
    const response = await axios.post(API_URL + 'signup', {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL + 'signin', {
      username,
      password,
    });
    if (response.data.accessToken) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
