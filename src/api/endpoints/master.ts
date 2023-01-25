import { axiosAuthenticationInstance } from '../instances/authInstance';

export const getsLanguages = () => axiosAuthenticationInstance.get('/master/v1/languages');
