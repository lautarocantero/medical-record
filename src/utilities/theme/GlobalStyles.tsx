import { GlobalStyles } from '@mui/material';

const GlobalStyle = () => (
  <GlobalStyles
    styles={{
      body: {
        '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
          background: '#f2f2f2',
          width: '6px',
          height: '6px',
        },
        '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
          boxShadow: 'inset 0 0 6px #b3b3b3',
          borderRadius: '15px',
        },
        '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
          borderRadius: '100px',
          background: '#b3b3b3',
          width: '6px',
        },
      },
    }}
  />
);

export default GlobalStyle;
