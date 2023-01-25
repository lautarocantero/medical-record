import i18n from 'i18next';
import { languages } from '../helpers/commonTypes';
import getEnvVariables from '../helpers/getEnvVariables';

const { VITE_STORAGE_TOKEN_KEY_NAME, VITE_STORAGE_REFRESH_TOKEN_KEY_NAME } = getEnvVariables();

export const getToken = () => localStorage.getItem(VITE_STORAGE_TOKEN_KEY_NAME);
export const getRefreshtoken = () => localStorage.getItem(VITE_STORAGE_REFRESH_TOKEN_KEY_NAME);

export const setToken = (value: any) => {
  localStorage.setItem(VITE_STORAGE_TOKEN_KEY_NAME, value);
};

export const setRefreshToken = (value: string) => {
  localStorage.setItem(VITE_STORAGE_REFRESH_TOKEN_KEY_NAME, value);
};

export const getLanguage = () => languages[i18n.language];
export const getMenus = () => JSON.parse(localStorage.getItem('menus') as string);

export const cleanStorage = () => localStorage.clear();
