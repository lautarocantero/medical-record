import { axiosAuthenticationInstance } from '../instances/authInstance';
import { NewIssue, NewMessage, CategoryTranslation } from '../types/types';

export const getsAllIssues = () =>
  axiosAuthenticationInstance.get(
    'support/v1/issues?page=0&pageSize=11&searchText=&orderField=title&orderDescending=true&status=',
  );

export const createsNewIssue = (data: NewIssue) => axiosAuthenticationInstance.post('/support/v1/issues', data);

export const getsIssueById = (data: { id: number }) => axiosAuthenticationInstance.get(`/support/v1/issues/${data.id}`);

export const addsNewMessage = (data: { id: number; newMessage: NewMessage }) =>
  axiosAuthenticationInstance.post(`/support/v1/issues/${data.id}/messages`, data.newMessage);

export const closesIssueById = (data: { id: number; closingData: { closing_comment: string } }) =>
  axiosAuthenticationInstance.put(`/support/v1/issues/${data.id}/closure`, data.closingData);

export const getsAllNotifications = () => axiosAuthenticationInstance.get('support/v1/messages');

export const createsCategory = (data: { category_translations: CategoryTranslation }) =>
  axiosAuthenticationInstance.post('/support/v1/categories', data);

export const getsCategory = (data: any) => axiosAuthenticationInstance.get(`/support/v1/categories/${data.id}`);
export const deleteCategory = (id: any) => axiosAuthenticationInstance.delete(`/support/v1/categories/${id}`);

export const updatesCategory = (data: { id: number; category_translations: CategoryTranslation }) =>
  axiosAuthenticationInstance.put(`/support/v1/categories/${data.id}`, {
    category_translations: data.category_translations,
  });
