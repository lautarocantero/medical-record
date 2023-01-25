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

export const InputFlagContainer = styled(Box)`
  display: flex;
  gap: 16px;
  margin-top: 8px;
`;

export const InputFlagWrapper = styled(Box)(() => ({
  [theme.breakpoints.down('sm')]: {
    width: '85%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '90%',
  },
}));

export const FlagWrapper = styled(Box)(() => ({
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    width: '15%',
  },
  [theme.breakpoints.up('sm')]: {
    width: '10%',
  },
}));
