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
          main: "#4d7c0f",
          light: "#84cc16",
          dark: "#365314",
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
          main: "#84cc16",
          light: "#a3e635",
          dark: "#4d7c0f",
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
