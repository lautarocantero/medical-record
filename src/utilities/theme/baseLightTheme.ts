import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

import AvenirNextBold from '../../assets/fonts/AvenirNext/AvenirNext-Bold.ttf';
import AvenirNextItalic from '../../assets/fonts/AvenirNext/AvenirNext-Italic.ttf';
import AvenirNextMedium from '../../assets/fonts/AvenirNext/AvenirNext-Medium.ttf';
import AvenirNextRegular from '../../assets/fonts/AvenirNext/AvenirNext-Regular.ttf';
import AvenirNextSemiBold from '../../assets/fonts/AvenirNext/AvenirNext-SemiBold.ttf';

const baseTheme = createTheme({
  palette: {
    error: {
      main: red.A400,
    },
    mode: 'light',
    primary: {
      main: '#001441',
      // main: 'rgb(0, 20, 65,0.76)',
      // main: '#7367f0',
    },
    secondary: {
      main: '#A68B5C',
    },
    background: {
      default: '#f3f3f4',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: "AvenirNext";
        font-style: italic;
        font-weight: 400;
        font-display:"swap";
        src: url("${AvenirNextItalic}") format("truetype");
      }
      @font-face {
        font-family: "AvenirNext";
        font-weight: 500;
        src: url("${AvenirNextMedium}") format("truetype");
        font-display:"swap";
      }
      @font-face {
        font-family: "AvenirNext";
        font-weight: 400;
        src: url("${AvenirNextRegular}") format("truetype");
        font-display:"swap";
      }
      @font-face {
        font-family: "AvenirNext";
        font-weight: 600;
        src: url("${AvenirNextSemiBold}") format("truetype");
        font-display:"swap";
      }
      @font-face {
        font-family: "AvenirNext";
        font-weight: 700;
        src: url("${AvenirNextBold}") format("truetype");
        font-display:"swap";
      }
      `,
    },
  },
  typography: {
    fontFamily: ['AvenirNext', 'Roboto', 'Helvetica', 'Arial', 'serif'].join(','),
    // h1: {
    //   fontSize: '30px',
    //   fontWeight: 400,
    //   alignSelf: 'center',
    //   letterSpacing: 'normal',
    //   lineHeight: '56px',
    // },
    // h2: {
    //   fontSize: '26px',
    //   fontWeight: 400,
    //   alignSelf: 'center',
    //   letterSpacing: 'normal',
    //   lineHeight: '40px',
    // },
    // h3: {
    //   fontSize: '24px',
    //   fontWeight: 400,
    //   alignSelf: 'center',
    //   letterSpacing: 'normal',
    //   lineHeight: '33px',
    // },
    // h4: {
    //   fontSize: '22px',
    //   fontWeight: 400,
    //   letterSpacing: 'normal',
    //   lineHeight: '28px',
    // },
    // h5: {
    //   fontSize: '20px',
    //   fontWeight: 400,
    //   letterSpacing: '0.15px',
    //   lineHeight: '23px',
    // },
    // h6: {
    //   fontSize: '18px',
    //   fontWeight: 400,
    //   letterSpacing: '0.15px',
    //   lineHeight: '20px',
    // },
    // body1: {
    //   fontSize: '16px',
    //   fontWeight: 400,
    //   letterSpacing: '0.5px',
    //   lineHeight: '19px',
    // },
    // body2: {
    //   fontSize: '14px',
    //   fontWeight: 400,
    //   letterSpacing: '0.5px',
    //   lineHeight: '17px',
    // },
    // caption: {
    //   fontSize: '12px',
    //   letterSpacing: '0.4px',
    //   fontWeight: 400,
    //   lineHeight: '14px',
    // },
    // overline: {
    //   fontSize: '10px',
    //   letterSpacing: '1.5px',
    //   fontWeight: 400,
    //   lineHeight: '12px',
    // },
    // subtitle1: {
    //   fontSize: '15px',
    //   letterSpacing: '0.15px',
    //   fontWeight: 400,
    //   lineHeight: '19px',
    // },
    // subtitle2: {
    //   fontSize: '13px',
    //   letterSpacing: '0.1px',
    //   fontWeight: 400,
    //   lineHeight: '16px',
    // },
  },
});

export default baseTheme;
