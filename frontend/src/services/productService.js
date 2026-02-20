import axios from "axios";
import { getCurrentUser } from "./authService";

const API_URL = "/api/products";

// Get all products
export const getProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get single product
export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const productService = {
  getProducts,
  getProductById,
};

export default productService;
