"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: "#ea580c",
        },
        secondary: {
          main: "#ededed",
        },
        background: {
          default: "#ffffff",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: "#f97316",
        },
        secondary: {
          main: "#171717",
        },
        background: {
          default: "#0a0a0a",
        },
      },
    },
  },
  typography: {
    fontFamily: "Barlow, Inter, Arial, Helvetica, sans-serif",
  },
});

export default theme;
