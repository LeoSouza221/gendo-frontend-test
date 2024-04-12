import axios from 'axios';

const http = axios.create();

http.interceptors.request.use((config) => {
  config.headers['X-GitHub-Api-Version'] = '2022-11-28';
  return config;
});

export default http;
