"use client";

import React, { useEffect } from "react";
import { useColorScheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

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
    <IconButton aria-label="mode">
      {mode === "dark" ? (
        <LightModeOutlinedIcon
          onClick={() => setMode("light")}
          sx={{ color: "lime.main" }}
        />
      ) : (
        <DarkModeOutlinedIcon
          onClick={() => setMode("dark")}
          sx={{ color: "lime.main" }}
        />
      )}
    </IconButton>
  );
}
