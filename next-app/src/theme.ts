"use client";

import { createTheme } from "@mui/material/styles";
// import { lime } from "@mui/material/colors";

// Augment the palette to include an ochre color
declare module "@mui/material/styles" {
  interface Palette {
    lime: Palette["primary"];
  }

  interface PaletteOptions {
    lime?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        primary: {
          main: "#5EA500",
        },
        secondary: {
          main: "#ededed",
        },
        background: {
          default: "#ffffff",
        },
        lime: {
          main: "#81c784",
          light: "#a5d6a7",
          dark: "#66bb6a",
          contrastText: "#000000",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        primary: {
          main: "#497D00",
        },
        secondary: {
          main: "#171717",
        },
        background: {
          default: "#0a0a0a",
        },
        lime: {
          main: "#4caf50",
          light: "#66bb6a",
          dark: "#43a047",
          contrastText: "#000000",
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter, Arial, Helvetica, sans-serif",
  },
});

export default theme;
