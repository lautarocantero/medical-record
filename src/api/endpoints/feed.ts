import { axiosAuthenticationInstance, axiosAuthenticationInstanceMultipart } from '../instances/authInstance';

export const getArticles = () => axiosAuthenticationInstance.get(`/v1/publications?page=0&pageSize=100`);
export const getArticleById = (id: number) => axiosAuthenticationInstance.get(`v1/publications/${id}`);
export const deleteArticle = (id: number) => axiosAuthenticationInstance.delete(`v1/publications/${id}`);
export const newArticle = ({ formattedDataToCreate }: any) =>
  axiosAuthenticationInstance.post('v1/publications', formattedDataToCreate);
export const editArticle = ({ id, formattedDataToEdit }: any) =>
  axiosAuthenticationInstance.put(`v1/publications/${id}`, formattedDataToEdit);
export const filesArticle = (data: { image: string; file_name: string }) =>
  axiosAuthenticationInstance.post(`/utils/v1/files/images`, data);
export const createNewDocument = (data: any) =>
  axiosAuthenticationInstanceMultipart.post('/utils/v1/files/documents', data);
export const preFetchVideoUrl = (data: { file_name: string }) =>
  axiosAuthenticationInstance.post('/utils/v1/files/presigned-url', data);
