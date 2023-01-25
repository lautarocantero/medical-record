import axios, { AxiosResponse } from 'axios';
import getEnvVariables from '../../utilities/helpers/getEnvVariables';
import { cleanStorage, getRefreshtoken, getToken, setToken, getLanguage } from '../../utilities/storage';

const { VITE_API_URL, VITE_TOKEN_TYPE, VITE_TENANT_ID } = getEnvVariables();

const getAuthInstance = (baseUrl: string, headerOptions?: { ContentType: string }) => {
  const axiosAuthInstance = axios.create({
    baseURL: baseUrl,
    headers: {
      Accept: `${headerOptions?.ContentType || 'application/json'}`,
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': `${headerOptions?.ContentType || 'application/json'}`,
    },
  });

  axiosAuthInstance.interceptors.request.use((config: any) => {
    const token = getToken();
    config.headers.Authorization = `${VITE_TOKEN_TYPE} ${token}`;
    config.headers['x-tenant-id'] = `${VITE_TENANT_ID}`;
    config.headers['accept-language'] = getLanguage();
    return config;
  });

  function refreshToken() {
    return axios.post(
      `${VITE_API_URL}/accounts/v1/admins/refresh-token`,
      {
        refresh_token: getRefreshtoken(),
      },
      {
        headers: {
          'x-tenant-id': `${VITE_TENANT_ID}`,
        },
      },
    );
  }

  axiosAuthInstance.interceptors.response.use(
    (response: AxiosResponse<any, any>) => {
      const token = getToken();
      if (token) {
        response.headers.Authorization = `${VITE_TOKEN_TYPE} ${token}`;
      }
      return response;
    },
    async (error: any) => {
      const { response, config } = error;
      if (response && response.status === 401) {
        let retryOriginalRequest;
        await refreshToken()
          .then((res) => {
            setToken(res.data.access_token);
            retryOriginalRequest = new Promise((resolve) => {
              config.headers.Authorization = `${VITE_TOKEN_TYPE} ${getToken()}`;
              resolve(axios(config));
            });
          })
          .catch(() => {
            cleanStorage();
            window.location.replace('auth/login');
          });
        return retryOriginalRequest;
      }
      return Promise.reject(error);
    },
  );

  return axiosAuthInstance;
};

export const axiosAuthenticationInstance = getAuthInstance(VITE_API_URL);
export const axiosAuthenticationInstanceMultipart = getAuthInstance(VITE_API_URL, {
  ContentType: 'multipart/form-data',
});
