import { PUBLIC_URLS } from '@app/constants/var';
import { IsValidString } from '@app/utils/helpers';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

type RequestData = Record<string, any>;

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
//axios.defaults.baseURL = "https://maxtransapi-dev.azurewebsites.net/api/";
axios.defaults.headers.common = {
  'content-type': 'application/json',
};

axios.interceptors.request.use((requestConfig) => {
  const userAuth = localStorage.getItem('authentication')
    ? JSON.parse(localStorage.getItem('authentication') || '{}')
    : {};
  const { pathname } = location;
  const authToken: string = userAuth?.token ?? '';
  if (!IsValidString(authToken)) {
    if (PUBLIC_URLS.includes(pathname)) return requestConfig;
    const cancelSource = axios.CancelToken.source();
    requestConfig.cancelToken = cancelSource.token;
    cancelSource.cancel('AuthToken expired');
    location.replace('/login');
  }
  requestConfig.headers['Authorization'] = authToken;
  return requestConfig;
});

const responseData = (axiosResponse: AxiosResponse) => axiosResponse.data;

axios.interceptors.response.use(
  (axiosResponse: AxiosResponse) => {
    return axiosResponse;
  },
  (error: AxiosError) => {
    const errorData = error?.response?.data;
    console.error(errorData);
    return Promise.reject(error.response);
  },
);

const requests = {
  get: (url: string, httpOptions: AxiosRequestConfig = {}) =>
    axios.get(url, httpOptions),
  post: <T = any>(url: string, data: RequestData): Promise<AxiosResponse<T>> =>
    axios.post(url, data),
  put: <T = any>(url: string, data: RequestData): Promise<AxiosResponse<T>> =>
    axios.put(url, data),
  patch: <T = any>(url: string, data: RequestData): Promise<AxiosResponse<T>> =>
    axios.patch(url, data),
  delete: <T = any>(url: string): Promise<AxiosResponse<T>> =>
    axios.delete(url).then(responseData),
  setAutentication: (token: string) => {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
};

const APIService = {
  requests,
};

export default APIService;
