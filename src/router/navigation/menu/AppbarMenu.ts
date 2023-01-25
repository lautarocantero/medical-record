import { Person, Logout, Password } from '@mui/icons-material';

import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { VerticalMenuItemProp } from '../vertical/vertical-menu';

export const menuList: Array<VerticalMenuItemProp> = [
  {
    action: 'read',
    icon: Person,
    id: 'account',
    navLink: '/account',
    resource: 'account',
    title: 'account',
    subMenus: [
      {
        icon: Person,
        id: 'profile',
        navLink: '/account/profile',
        resource: 'Mi Perfil',
        action: 'read',
        title: 'profile',
      },
      {
        icon: Password,
        id: 'change-password',
        navLink: '/account/change-password',
        resource: 'Cambiar contraseña',
        action: 'read',
        title: 'change-password',
      },
    ],
  },
  {
    icon: Logout,
    id: 'logout',
    navLink: '/logout',
    resource: 'Log out',
    subMenus: null,
    action: 'read',
    title: 'logout',
  },
];

export const logoutMenu = {
  action: 'read',
  icon: Logout,
  id: 'logout',
  navLink: '/Login',
  resource: 'logout',
  title: 'logout',
  subMenus: null,
};

export const profileMenu = {
  action: 'read',
  icon: AccountCircleIcon,
  id: 'account',
  navLink: '/account',
  resource: 'account',
  title: 'account',
  subMenus: [
    {
      action: 'read',
      icon: AccountBoxIcon,
      id: 'profile',
      navLink: '/account/profile',
      resource: 'profile',
      title: 'profile',
    },
    {
      action: 'read',
      icon: Password,
      id: 'change-password',
      navLink: '/account/change-password',
      resource: 'change-password',
      title: 'change_password',
    },
  ],
};
