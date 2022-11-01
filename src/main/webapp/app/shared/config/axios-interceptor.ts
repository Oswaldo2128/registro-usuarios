import axios from 'axios';
import * as Sentry from '@sentry/vue';

const TIMEOUT = 1000000;
const onRequestSuccess = config => {
  const token = localStorage.getItem('jhi-authenticationToken') || sessionStorage.getItem('jhi-authenticationToken');
  if (token) {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.timeout = TIMEOUT;
  config.url = `${SERVER_API_URL}${config.url}`;
  return config;
};
const setupAxiosInterceptors = (onUnauthenticated, onServerError) => {
  const onResponseError = err => {
    if (err && (err.status || (err.response && err.response.status))) {
      const status = err.status || err.response.status;
      if (status === 403 || status === 401) {
        return onUnauthenticated(err);
      }
      if (status >= 500) {
        return onServerError(err);
      }
    } else {
      Sentry.captureMessage(`Excepción sin status ${JSON.stringify(err)}`);
    }
    return Promise.reject(err);
  };

  if (axios.interceptors) {
    axios.interceptors.request.use(onRequestSuccess);
    axios.interceptors.response.use(res => res, onResponseError);
  }
};

export { onRequestSuccess, setupAxiosInterceptors };
