import dayjs from 'dayjs';
import 'dayjs/locale/es';
import moment from 'moment';
import { getLanguage } from '../storage';
import { capitalizeFirstLetter } from './stringsHelper';

const lang = getLanguage()?.split('-')[0];
dayjs.locale(lang);

export const getFormattedDate = (date: string) => {
  const formattedDate = dayjs(date);
  return `${formattedDate.format('DD/MM/YY')}`;
};
export const getFormattedDateEs = (date: string) => {
  const formattedDate = dayjs(date);
  return `${formattedDate.format('MM/DD/YY')}`;
};

export const getFormattedDateFullYearEs = (date: number) => {
  const formattedDate = moment.utc(date);
  return `${formattedDate.format('DD/MM/YYYY')}`;
};
export const getFormattedDateFullYearEn = (date: number) => {
  const formattedDate = moment.utc(date);
  return `${formattedDate.format('MM/DD/YYYY')}`;
};

export const getFormattedDateNumberEs = (date: number) => {
  const formattedDate = moment.utc(date);
  return `${formattedDate.format('DD/MM/YY')}`;
};
export const getFormattedDateNumberEn = (date: number) => {
  const formattedDate = moment.utc(date);
  return `${formattedDate.format('MM/DD/YY')}`;
};

export const getFormattedHourNumber = (date: number) => {
  const formattedDate = moment.utc(date);
  return `${formattedDate.format('HH:mm')}hs`;
};

export const getFormattedLocalFullDateNumberEs = (date: number) => {
  const formattedDate = moment(date);
  return `${formattedDate.format('DD/MM/YYYY HH:mm')}hs`;
};
export const getFormattedLocalFullDateNumberEn = (date: number) => {
  const formattedDate = moment(date);
  return `${formattedDate.format('MM/DD/YYYY HH:mm')}hs`;
};

export const getDayHourDateEs = (date: number) => {
  const actualDate = dayjs(date);
  return `${actualDate.format('DD/MM')}, ${actualDate.format('HH:mm')}`;
};
export const getDayHourDateEn = (date: number) => {
  const actualDate = dayjs(date);
  return `${actualDate.format('MM/DD')}, ${actualDate.format('HH:mm')}`;
};

export const getDayHourYearDateEs = (date: number) => {
  const actualDate = dayjs(date);
  return `${actualDate.format('DD/MM/YYYY')} - ${actualDate.format('HH:mm')}hs`;
};
export const getDayHourYearDateEn = (date: number) => {
  const actualDate = dayjs(date);
  return `${actualDate.format('MM/DD/YYYY')} - ${actualDate.format('HH:mm')}hs`;
};

export const getMonthLabel = (date: string) => {
  const actualDate = dayjs(date);
  return `${actualDate.format('DD')} ${capitalizeFirstLetter(actualDate.format('MMM'))}`;
};

export const getMilis = (argument: number) => {
  const date = new Date(argument).getTime();
  return date;
};

export const getMonthDayYearValue = (date: string) => {
  const actualDate = dayjs(date).locale(getLanguage()?.split('-')[0]);
  return `${capitalizeFirstLetter(actualDate.format('MMMM'))} ${actualDate.format('DD')}, ${actualDate.format(
    'YYYY',
  )} `;
};

export const getFormattedDateByLanguague = (
  language: string,
  fnEs: (n: number) => string,
  fnEn: (n: number) => string,
  date: number,
) => (language === 'es' ? fnEs(date) : fnEn(date));
