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
          main: "#c0ca33", // Material UI lime[600]
          light: "#e6ee9c", // Material UI lime[200]
          dark: "#9e9d24", // Material UI lime[800]
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
          main: "#d4e157", // Material UI lime[400]
          light: "#f0f4c3", // Material UI lime[100]
          dark: "#afb42b", // Material UI lime[700]
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
