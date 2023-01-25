// import { ThemeProvider } from '@emotion/react';
import { createTheme, ThemeProvider, CssBaseline, PaletteMode } from '@mui/material';
import React from 'react';
import baseLightTheme from './baseLightTheme';
import baseDarkTheme from './baseDarkTheme';
import { ColorContext } from './ColorContext';
import GlobalStyle from './GlobalStyles';

const AppTheme = ({ children }: any) => {
  const [mode, setMode] = React.useState<PaletteMode>('light');

  const theme = React.useMemo(() => createTheme(mode === 'light' ? baseLightTheme : baseDarkTheme), [mode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  return (
    <ColorContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ColorContext.Provider>
  );
};

export default AppTheme;
