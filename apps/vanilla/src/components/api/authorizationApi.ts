import axios from 'axios';
import { BASE_URL } from '../constants/constants';

export const axiosInstance = axios.create({
  baseURL: 'https://api.camp-js.saritasa.rocks/api/v1', //обновить base_url
  timeout: 1000,
  headers: {
    'Api-Key': '569aeb3e-11bc-4ace-8e61-bfcca98b0814',
  },
});

function registerUser() {
  const response = axiosInstance.post('/auth/register/', {

  })
}
