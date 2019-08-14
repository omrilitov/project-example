import axios from 'axios';

export default class RestStore {
  constructor() {
    this.auth = axios.create({
      baseURL: '/auth',
      responseType: 'json'
    });

    this.client = axios.create({
      baseURL: '/api',
      responseType: 'json'
    });

    this.client.interceptors.request.use(config => {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    }, error => Promise.reject(error));
  }
}
