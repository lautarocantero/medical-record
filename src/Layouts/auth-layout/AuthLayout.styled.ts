import { Box } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';

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

export const AuthLayoutContainer = styled(Box)`
  display: flex;
`;

export const AuthLayoutNav = styled(Box)(({ width }: { width: number }) => ({
  width: `${width}`,
  transition: 'width 1s',
  flexShrink: 0,
  position: 'static',
  [theme.breakpoints.down('md')]: {
    position: 'absolute',
  },
}));

export const AuthLayoutMain = styled(Box)(({ width }: { width: string }) => ({
  flexGrow: 1,
  padding: '24px',
  width: `${width}`,
  transition: 'width 1s',
  marginTop: '0px',
  [theme.breakpoints.down('sm')]: {
    padding: '6px',
  },
  [theme.breakpoints.down('md')]: {
    marginTop: '60px',
  },
}));
