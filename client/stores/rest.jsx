import axios from "axios";

export default class RestStore {
  auth;
  client;

  constructor() {
    this.auth = axios.create({
      baseURL: '/auth',
      responseType: 'json'
    });

    this.client = axios.create({
      baseURL: '/api',
      responseType: 'json'
    })

    this.client.interceptors.request.use(function (config) {
      const token = localStorage.getItem('token');

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    }, function (error) {
      return Promise.reject(error);
    });
  }
}
