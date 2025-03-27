import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const redditBotAPI = {
  checkUser: async (username) => {
    const response = await api.post('/api/predict', { screen_name: username });
    return response.data;
  },
  
  generateReport: async (userData) => {
    const response = await api.post('/api/generate-report', userData);
    return response.data;
  },
  
  submitFeedback: async (feedbackData) => {
    const response = await api.post('/api/feedback', feedbackData);
    return response.data;
  },
}; 