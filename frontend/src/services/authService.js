import axios from "axios";

const API_URL = "/api/auth";

// Configure axios to send cookies
axios.defaults.withCredentials = true;

// Register user
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

// Login user
export const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// Logout user
export const logout = async () => {
  await axios.post(`${API_URL}/logout`);
};

// Get current user from server
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`);
    return response.data;
  } catch (error) {
    return null;
  }
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;
