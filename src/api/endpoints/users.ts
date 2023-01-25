import { axiosAuthenticationInstance } from '../instances/authInstance';

export const customerSelected = (id: string) => axiosAuthenticationInstance.get(`v1/customers/${id}`);
