import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F5A623',
      light: '#FFD07A',
      dark: '#C47D0A',
      contrastText: '#1A1A2E',
    },
    secondary: {
      main: '#7C83FD',
    },
    background: {
      default: '#0F0F1A',
      paper: '#1A1A2E',
    },
    text: {
      primary: '#F0EDE8',
      secondary: '#9896A4',
    },
    divider: 'rgba(240,237,232,0.08)',
    error: {
      main: '#FF6B6B',
    },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h4: {
      fontFamily: '"DM Serif Display", serif',
      fontWeight: 400,
      letterSpacing: '-0.02em',
    },
    h5: {
      fontFamily: '"DM Serif Display", serif',
      fontWeight: 400,
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 500,
      letterSpacing: '0.04em',
      textTransform: 'none',
      fontFamily: '"DM Sans", sans-serif',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * { box-sizing: border-box; }
        body {
          background: #0F0F1A;
          min-height: 100vh;
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.875rem',
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            background: 'linear-gradient(135deg, #F5A623 0%, #FFD07A 100%)',
            boxShadow: '0 4px 20px rgba(245,166,35,0.35)',
            '&:hover': {
              background: 'linear-gradient(135deg, #C47D0A 0%, #F5A623 100%)',
              boxShadow: '0 6px 28px rgba(245,166,35,0.5)',
            },
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderColor: 'rgba(240,237,232,0.15)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(245,166,35,0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#F5A623',
              borderWidth: 1.5,
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#F5A623',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
