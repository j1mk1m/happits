import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
      type: 'light',
      primary: {
        main: '#1d6d4e',
      },
      secondary: {
        main: '#d5ef32',
      },
      background: {
        default: '#EFEBEB',
      },
    },
    typography: {
      h1: {
        fontFamily: 'Roboto',
      },
    }
  });