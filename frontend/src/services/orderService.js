import axios from "axios";
import { getCurrentUser } from "./authService";

const API_URL = "/api/orders";

// Get auth config
const getAuthConfig = () => {
  const user = getCurrentUser();
  return {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };
};

// Create order
export const createOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData, getAuthConfig());
  return response.data;
};

// Get user orders
export const getUserOrders = async (userId) => {
  const response = await axios.get(
    `${API_URL}/user/${userId}`,
    getAuthConfig(),
  );
  return response.data;
};

const orderService = {
  createOrder,
  getUserOrders,
};

export default orderService;
