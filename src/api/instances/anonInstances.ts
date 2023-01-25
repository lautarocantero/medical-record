import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import getEnvVariables from '../../utilities/helpers/getEnvVariables';

const { VITE_API_URL, VITE_TENANT_ID } = getEnvVariables();
const axiosAnonInstance = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    accept: '*/*',
    'x-tenant-id': VITE_TENANT_ID,
  },
});

axiosAnonInstance.interceptors.response.use((response: AxiosResponse<any, any>) => response);

axiosAnonInstance.interceptors.request.use(async (config: AxiosRequestConfig<any>) => config);

export default axiosAnonInstance;
