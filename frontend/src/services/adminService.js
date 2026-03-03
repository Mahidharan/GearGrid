import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create axios instance with credentials
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  withCredentials: true,
});

// Get all users
export const getAllUsers = async () => {
  const response = await api.get("/admin/users");
  return response.data;
};

// Delete user
export const deleteUser = async (userId) => {
  const response = await api.delete(`/admin/users/${userId}`);
  return response.data;
};

// Get all products
export const getAllProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// Add product
export const addProduct = async (productData) => {
  const response = await api.post("/admin/products", productData);
  return response.data;
};

// Update product
export const updateProduct = async (productId, productData) => {
  const response = await api.put(`/admin/products/${productId}`, productData);
  return response.data;
};

// Delete product
export const deleteProduct = async (productId) => {
  const response = await api.delete(`/admin/products/${productId}`);
  return response.data;
};

const adminService = {
  getAllUsers,
  deleteUser,
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};

export default adminService;
