import { axiosAuthenticationInstance } from '../instances/authInstance';

export const createAdminUser = (data: any) => axiosAuthenticationInstance.post(`/v1/admin-accounts`, data);
export const updateAdminUser = ({ id, data }: { id: string; data: any }) =>
  axiosAuthenticationInstance.put(`/v1/admin-accounts/${id}`, data);
export const getAdminUserById = (id: string) => axiosAuthenticationInstance.get(`/v1/admin-accounts/${id}`);
export const getAdminGroups = () => axiosAuthenticationInstance.get(`/v1/admin-groups`);
export const getUserInfo = () => axiosAuthenticationInstance.get('v1/admin-accounts/profile');
export const updateUserInfo = (data: any) =>
  axiosAuthenticationInstance.put(`v1/authentication/accounts/backoffice`, data);
export const getAdminInfo = (id: string) => axiosAuthenticationInstance.get(`v1/admin-accounts/${id}`);
