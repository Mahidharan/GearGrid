import axios from "axios";
import { getCurrentUser } from "./authService";

const API_URL = "/api/reminders";

// Get auth config
const getAuthConfig = () => {
  const user = getCurrentUser();
  return {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };
};

// Create reminder
export const createReminder = async (reminderData) => {
  const response = await axios.post(API_URL, reminderData, getAuthConfig());
  return response.data;
};

// Get user reminders
export const getUserReminders = async (userId) => {
  const response = await axios.get(
    `${API_URL}/user/${userId}`,
    getAuthConfig(),
  );
  return response.data;
};

// Reorder from reminder
export const reorderFromReminder = async (reminderId) => {
  const response = await axios.post(
    `${API_URL}/reorder`,
    { reminderId },
    getAuthConfig(),
  );
  return response.data;
};

const reminderService = {
  createReminder,
  getUserReminders,
  reorderFromReminder,
};

export default reminderService;
