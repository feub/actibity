"use client";

import { createTheme } from "@mui/material/styles";
// import { orange } from "@mui/material/colors";

// Augment the palette to include an ochre color
declare module "@mui/material/styles" {
  interface Palette {
    orange: Palette["primary"];
  }

  interface PaletteOptions {
    orange?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: "#f57b00",
        },
        secondary: {
          main: "#ededed",
        },
        background: {
          default: "#ffffff",
        },
        orange: {
          main: "#ffe0b2",
          light: "#fff3e0",
          dark: "#ffcb80",
          contrastText: "#f57b00",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: "#fff3e0",
        },
        secondary: {
          main: "#171717",
        },
        background: {
          default: "#0a0a0a",
        },
        orange: {
          main: "#f57b00",
          light: "#ff9700",
          dark: "#ef6b01",
          contrastText: "#fff3e0",
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter, Arial, Helvetica, sans-serif",
  },
});

export default theme;
