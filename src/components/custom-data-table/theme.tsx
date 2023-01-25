import { createTheme } from 'react-data-table-component';

// createTheme creates a new theme named solarized that overrides the build in dark theme
export const customTheme = () =>
  createTheme('palierGridTheme', {
    //   text: {
    //     primary: '#268bd2',
    //     secondary: '#2aa198',
    //   },
    //   background: {
    //     default: '#002b36',
    //   },
    //   context: {
    //     background: '#cb4b16',
    //     text: '#FFFFFF',
    //   },
    header: {
      style: {
        padding: '0px',
      },
    },
    divider: {
      default: 'rgb(166, 139, 92,.1)',
    },
    //   button: {
    //     default: '#2aa198',
    //     hover: 'rgba(0,0,0,.08)',
    //     focus: 'rgba(255,255,255,.12)',
    //     disabled: 'rgba(255, 255, 255, .34)',
    //   },
    //   sortFocus: {
    //     default: '#2aa198',
    //   },
  });
