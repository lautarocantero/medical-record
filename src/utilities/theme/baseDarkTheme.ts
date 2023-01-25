import { createTheme } from '@mui/material';
import { green, red } from '@mui/material/colors';

const baseTheme = createTheme({
  palette: {
    error: {
      main: red.A400,
    },
    mode: 'dark',
    primary: {
      main: green[100],
    },
    secondary: {
      main: '#543884',
    },
  },
});

export default baseTheme;
