const BASE_URL = 'http://localhost:5000/api';

const apiFetch = async (endpoint, options = {}) => {
  const { body, ...customConfig } = options;
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    
    if (response.status === 204) {
        return; 
    }
    
    const data = await response.json();

    if (!response.ok) {
      return Promise.reject(data);
    }
    
    return data;
  } catch (err) {
    return Promise.reject({ message: err.message });
  }
};

export default apiFetch;