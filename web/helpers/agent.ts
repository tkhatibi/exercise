import Axios from 'axios';
import { Agent } from 'https';
import * as $ from '../openapi';

const baseURL = process.env.NEXT_PUBLIC_API_HOST;

export function createAgent(token?: string) {
  const axios = Axios.create({
    baseURL,
    headers: {
      Accept: 'application/json',
    },
    httpsAgent: new Agent({
      rejectUnauthorized: false,
    }),
    validateStatus: () => true,
    timeout: 60000,
    transformResponse: (data, headers) => {
      console.info('      - ' + headers['x-debug-token-link']);
      try {
        return JSON.parse(data);
      } catch (error) {
        return {};
      }
    },
  });
  if (token) {
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }
  return {
    auth: new $.AuthenticationApi(undefined, baseURL, axios),
    user: new $.UserApi(undefined, baseURL, axios),
  };
}
