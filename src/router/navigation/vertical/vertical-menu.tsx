import { DynamicFeed, PeopleAlt, Person, TypeSpecimen } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { MessageList, TicketNotification } from './items-w-counter/Tickets';

export const verticalMenu: Array<VerticalMenuItemProp> = [
  {
    action: 'read',
    icon: Person,
    id: 'administratorss',
    navLink: '/administrators',
    resource: 'administrators',
    title: 'administrators',
    subMenus: null,
    mr: 0,
  },
  {
    action: 'read',
    icon: Person,
    id: 'administrators',
    navLink: '/patients',
    resource: 'patients',
    title: 'Pacientes',
    subMenus: null,
    mr: 0,
  },
  {
    action: 'read',
    icon: CalendarMonthIcon,
    id: 'administrators',
    navLink: '/agenda',
    resource: 'agenda',
    title: 'Agenda',
    subMenus: null,
    mr: 0,
  },
  {
    action: 'read',
    icon: AddIcon,
    id: 'administrators',
    navLink: '/vademecum',
    resource: 'vademecum',
    title: 'Vademecum',
    subMenus: null,
    mr: 0,
  },
  // {
  //   action: 'read',
  //   icon: PeopleAlt,
  //   id: 'users',
  //   navLink: '/users',
  //   resource: 'customers',
  //   title: 'users',
  //   subMenus: null,
  //   mr: 0,
  // },
  // {
  //   action: 'read',
  //   icon: DynamicFeed,
  //   id: 'news',
  //   navLink: '/news',
  //   resource: 'news',
  //   title: 'news',
  //   subMenus: null,
  //   mr: 0.2,
  // },
  // {
  //   action: 'read',
  //   icon: TicketNotification,
  //   id: 'tickets',
  //   navLink: '/tickets',
  //   resource: 'tickets',
  //   title: 'tickets',
  //   mr: 2,
  //   subMenus: [
  //     {
  //       action: 'read',
  //       icon: MessageList,
  //       id: 'list',
  //       navLink: '/tickets/list',
  //       resource: 'tickets_list',
  //       title: 'list',
  //     },
  //     {
  //       action: 'read',
  //       icon: TypeSpecimen,
  //       id: 'categories',
  //       navLink: '/tickets/categories',
  //       resource: 'categories',
  //       title: 'categories',
  //     },
  //   ],
  // },
];

export interface SubMenuItemProp {
  action: string;
  icon:
    | (OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>> & {
        muiName: string;
      })
    | (() => JSX.Element);
  id: string;
  navLink: string;
  resource: string;
  title: string;
}

export type VerticalMenuItemProp = {
  action: string;
  icon:
    | (OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>> & {
        muiName: string;
      })
    | (() => JSX.Element);
  id: string;
  navLink: string;
  resource: string;
  title: string;
  subMenus: Array<SubMenuItemProp> | null | undefined;
  mr?: number;
};
