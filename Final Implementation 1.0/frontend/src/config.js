// API Configuration
export const API_BASE_URL = 'http://localhost:5000';

export const API_CONFIG = {
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 15000
};

export const API_ENDPOINTS = {
    PREDICT: `${API_BASE_URL}/api/predict`,
    FEEDBACK: `${API_BASE_URL}/api/feedback`,
    GENERATE_REPORT: `${API_BASE_URL}/api/generate-report`
}; 