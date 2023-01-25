import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import {
  authEn,
  commonEn,
  usersEn,
  errorsEn,
  feedEn,
  ticketsEn,
  translationEn,
  dateEn,
  cdtModalEn,
  customerUsersEn,
} from './en';
import {
  authEs,
  commonEs,
  usersEs,
  errorsEs,
  feedEs,
  ticketsEs,
  translationEs,
  dateEs,
  cdtModalEs,
  customerUsersEs,
} from './es';

const resources = {
  en: {
    auth: authEn,
    common: commonEn,
    date: dateEn,
    errors: errorsEn,
    feed: feedEn,
    customerUsers: customerUsersEn,
    tickets: ticketsEn,
    translation: translationEn,
    users: usersEn,
    cdtModal: cdtModalEn,
  },
  es: {
    auth: authEs,
    common: commonEs,
    date: dateEs,
    errors: errorsEs,
    feed: feedEs,
    customerUsers: customerUsersEs,
    tickets: ticketsEs,
    translation: translationEs,
    users: usersEs,
    cdtModal: cdtModalEs,
  },
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
    keySeparator: false,
    ns: ['auth', 'common', 'users', 'errors', 'feed', 'tickets', 'customerUsers'],
    resources,
  });

export default i18n;
