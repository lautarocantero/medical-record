import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const axiosAnonInstanceFake = axios.create({
  baseURL: 'https://palier-demo.herokuapp.com/api',
});

axiosAnonInstanceFake.interceptors.response.use((response: AxiosResponse<any, any>) => response);

axiosAnonInstanceFake.interceptors.request.use(async (config: AxiosRequestConfig<any>) => config);

export default axiosAnonInstanceFake;
