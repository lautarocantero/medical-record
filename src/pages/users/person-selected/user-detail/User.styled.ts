import { styled, createTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 300,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export const UserCardWrapper = styled(Box)(() => ({
  minWidth: '260px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '6px',
  padding: '1rem',
  margin: 'auto',
  backgroundColor: '#fff',
  boxShadow: '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
  [theme.breakpoints.down('xs')]: {
    width: 'max-content',
    flexDirection: 'column',
  },
  [theme.breakpoints.up('xs')]: {
    width: 'max-content',
    flexDirection: 'column',
  },
  [theme.breakpoints.up('sm')]: {
    width: '100%',
    flexDirection: 'row',
    gap: theme.spacing(6),
  },
  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(5),
  },
  [theme.breakpoints.up('lg')]: {
    gap: theme.spacing(2),
    flexDirection: 'column',
  },
}));

export const UserCardInfoWrapper = styled(Box)(() => ({
  display: 'grid',
  [theme.breakpoints.down('xs')]: {
    gap: '0.5rem',
  },
  [theme.breakpoints.up('xs')]: {
    gap: '0.5rem',
  },
  [theme.breakpoints.up('sm')]: {
    width: '100%',
    flexDirection: 'row',
    gap: theme.spacing(6),
  },
  [theme.breakpoints.up('md')]: {
    gap: '1.5rem',
    gridTemplateColumns: 'auto auto',
  },
  [theme.breakpoints.up('lg')]: {
    gap: '1.5rem',
    gridTemplateColumns: 'auto',
  },
}));
