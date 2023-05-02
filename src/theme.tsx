import { ThemeOptions } from "@mui/material/styles/createTheme";

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#0B9078',
    },
    secondary: {
      main: '#CAF0F8',
    },
  },
  typography: {
    fontFamily: [
        "Quicksand",
    ].join(",")
  }
};