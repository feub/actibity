"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#171717",
    },
    secondary: {
      main: "#ededed",
    },
    background: {
      default: "#ffffff",
    },
  },
  typography: {
    fontFamily: "Inter, Arial, Helvetica, sans-serif",
  },
});

export default theme;
