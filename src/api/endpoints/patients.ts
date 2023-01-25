import { axiosAuthenticationInstance } from '../instances/authInstance';

export const createPatientUser = (data: any) => axiosAuthenticationInstance.post(`/v1/admin-accounts`, data);
export const updatePatientUser = ({ id, data }: { id: string; data: any }) =>
  axiosAuthenticationInstance.put(`/v1/admin-accounts/${id}`, data);
export const getPatientUserById = (id: string) => axiosAuthenticationInstance.get(`/v1/admin-accounts/${id}`);
export const getPatientGroups = () => axiosAuthenticationInstance.get(`/v1/admin-groups`);
export const getPatientInfo = () => axiosAuthenticationInstance.get('v1/admin-accounts/profile');
export const updatePatientInfo = (data: any) =>
  axiosAuthenticationInstance.put(`v1/authentication/accounts/backoffice`, data);
export const getInfo = (id: string) => axiosAuthenticationInstance.get(`v1/admin-accounts/${id}`);
