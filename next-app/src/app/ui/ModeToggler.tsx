"use client";

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  useColorScheme,
} from "@mui/material";
import React, { useEffect } from "react";

export default function ModeToggler() {
  const { mode, setMode } = useColorScheme();

  // Sync Material UI theme with Tailwind dark mode
  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  if (!mode) {
    return null;
  }

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="theme-toggle"
        name="theme-toggle"
        row
        value={mode}
        onChange={(event) =>
          setMode(event.target.value as "system" | "light" | "dark")
        }
      >
        <FormControlLabel value="system" control={<Radio />} label="System" />
        <FormControlLabel value="light" control={<Radio />} label="Light" />
        <FormControlLabel value="dark" control={<Radio />} label="Dark" />
      </RadioGroup>
    </FormControl>
  );
}
