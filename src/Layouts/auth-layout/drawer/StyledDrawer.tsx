import { CSSObject, styled } from '@mui/material/styles';
import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import { Box, Dialog, ListItem, ListItemButton, Theme } from '@mui/material';

interface StyledDrawerProps extends MuiDrawerProps {
  open?: boolean;
  drawerwidth: number;
}

const openedMixin = (theme: Theme, drawerwidth: number): CSSObject => ({
  overflowX: 'hidden',
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.enteringScreen,
    easing: theme.transitions.easing.sharp,
  }),
  width: drawerwidth,
});

const closedMixin = (theme: Theme): CSSObject => ({
  overflowX: 'hidden',
  transition: theme.transitions.create('width', {
    duration: theme.transitions.duration.leavingScreen,
    easing: theme.transitions.easing.sharp,
  }),
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

export const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })<StyledDrawerProps>(
  ({ theme, open, drawerwidth }) => ({
    boxSizing: 'border-box',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    width: drawerwidth,
    ...(open && {
      ...openedMixin(theme, drawerwidth),
      '& .MuiDrawer-paper': openedMixin(theme, drawerwidth),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const FlexedDialog = styled(Dialog)`
  display: flex;
`;

export const SpanWrapper = styled(Box)`
  transition: opacity 0.3s ease-in-out;
  padding: 8px 16px;
`;

export const Span = styled('span')`
  color: #a6a4b0;
  font-weight: 600;
  letter-spacing: 0.15rem;
`;

export const DrawerListItem = styled(ListItem)(({ open }: { open: boolean }) => ({
  transition: 'opacity .3s ease-in-out',
  opacity: `${open ? '1' : '0'}`,
}));

export const DrawerHeader = styled('div')(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 1),
  textAlign: 'center',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  height: '60px',
}));

export const DrawerLogo = styled('div')((props: { open: boolean; src: any }) => ({
  // backgroundImage: `url(${props.src})`,
  background: `url(${props.src}) no-repeat center center transparent`,
  backgroundSize: 'contain',
  height: '40px',
  width: '100%',
}));

export const DrawerTitle = styled('h3')((props: { open: boolean; device: string }) => ({
  color: '#1C6758',
  fontSize: '27px',
  fontWeight: 'bolder',
  marginBottom: '15px',
  marginLeft: '20px',
  textAlign: 'center',
  ...(!props.open && { display: 'none' }),
  ...(props.open && { marginRight: '0px' }),
  transition: '.2s linear ease-in-out',
  ...(props.device === 'small-screen' && { display: 'none' }),
}));

export const DrawerHolderBox = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: flex-end;
  padding-bottom: 1rem;
  padding-right: 24px;
`;

export const CustomListItem = styled(ListItem)(({ theme }: { theme: Theme }) => ({
  display: 'block',
  padding: '2px 8px',
  '.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: 'rgba(145, 158, 171, 0.08)',
    '& .icon': { color: theme.palette.primary.main },
  },
}));

export const DrawerMenuButton = styled(ListItemButton)(
  ({ theme, pl, justify }: { theme: Theme; pl: string; justify: string }) => ({
    '&:hover': {
      paddingLeft: `${pl}`,
      color: theme.palette.secondary.main,
      '& .icon': { color: theme.palette.secondary.main },
    },
    borderRadius: '6px',
    justifyContent: `${justify}`,
    transition: '.2s ease-in-out',
  }),
);

export const DrawerSubmenuButton = styled(ListItemButton)(({ theme, pl }: { theme: Theme; pl: string }) => ({
  paddingLeft: `${pl}`,
  borderRadius: '8px',
  marginTop: '5px',
  marginBottom: '5px',
  '&:hover': {
    paddingLeft: '45px',
    color: theme.palette.secondary.main,
    '& .sub_icon': { color: theme.palette.secondary.main },
  },
  transition: '.2s ease-in-out',
}));
