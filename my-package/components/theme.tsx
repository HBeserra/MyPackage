import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#E02041'
        },
        background: {
            default: '#F0F0F5',
            paper: '#F0F0F5'
        },
        neutral: {
            main: '#DCDCE5',
          },
        highlight: {
          main: '#fff'
        }
    },
    shape: {
      borderRadius: 10
    },
    typography: {
      h1:{
        fontWeight: 500,
        fontSize: '2.6rem'
      }
    }
});


declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    highlight: Palette['info'];
    
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    highlight?: PaletteOptions['info'];
  }
}

// Update the Button's color prop options
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
    highlight: true;
  }
}

export default theme