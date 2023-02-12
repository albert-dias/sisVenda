import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.testfront.cvti.cloud/api',
  // baseURL: 'http://94.250.203.165:3333',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

export default api;