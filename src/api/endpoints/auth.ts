import axiosAnonInstance from '../instances/anonInstances';
import { axiosAuthenticationInstance } from '../instances/authInstance';

// export const login = (data: FormData) => axiosAnonInstance.post('v1/authentication/accounts/backoffice/login', data);
export const login = (data: { email: string; password: string }) =>
  axiosAnonInstance.post('accounts/v1/admins/login', data);
export const forgotPassword = (data: any) => axiosAnonInstance.post(`accounts/v1/admins/forgot-password`, data);
export const forgotPasswordConfirmation = (data: any) =>
  axiosAnonInstance.post(`accounts/v1/admins/forgot-password/confirmation`, data);
export const changePassword = (data: { actual_password: string; new_password: string }) =>
  axiosAuthenticationInstance.post('accounts/v1/admins/change-password', data);
// export const getUserInfo = () => axiosAuthenticationInstance.get('v1/admin-accounts/profile');
// export const updateUserInfo = (data: any) =>
//   axiosAuthenticationInstance.put(`v1/authentication/accounts/backoffice`, data);
export const logout = () => axiosAuthenticationInstance.post('accounts/v1/admins/logout');
