import {
  ChangePassword as ChangePasswordPage,
  UsersPage,
  FeedPage,
  TicketsPage,
  TicketsCategoryPage,
  UserProfile as UserProfilePage,
  AdministratorsPage,
  PatientsPage,
} from '@/src/pages';

type TPagesOptions = {
  [key: string]: any;
};

export const pages: TPagesOptions = {
  administrators: <AdministratorsPage />,
  patients: <PatientsPage />,
  news: <FeedPage />,
  'tickets/list': <TicketsPage />,
  'tickets/categories': <TicketsCategoryPage />,
  users: <UsersPage />,
  accounts: <UserProfilePage />,
  'account/profile': <UserProfilePage />,
  'account/change-password': <ChangePasswordPage />,
};
