import axios from 'axios';
import {appStore} from './store.config';

/**
 * Returns new Axios instance
 * Intercepts responses from server and handles errors
 */
export function baseAxios() {
  let baseAxiosConfig = axios.create();
  baseAxiosConfig.interceptors.response.use(
    (res) => res,
    (err) => {
      return Promise.reject(err);
    },
  );
  return baseAxiosConfig;
}
