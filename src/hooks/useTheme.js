import { useState, useEffect } from 'react';
import { useColorScheme } from "@mui/joy/styles";

/**
 * Custom hook for managing theme state and color scheme
 */
export const useTheme = () => {
  const { mode, setMode } = useColorScheme();
  const [theme, setTheme] = useState(localStorage.getItem('thm') || 'default');
  const [clg, setClg] = useState(0);

  // Initialize mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("mode");
    setMode(savedMode || "dark");
  }, [setMode]);

  // Save mode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  // Update color and save theme to localStorage
  useEffect(() => {
    localStorage.setItem("thm", theme);
    const themeColors = { 
      red: 10, 
      green: 120, 
      blue: 220, 
      rebecca: 270, 
      default: 50 
    };
    setClg(themeColors[theme]);
  }, [theme]);

  const handleTheme = (e, newTheme) => {
    setTheme(newTheme);
  };

  return {
    mode,
    setMode,
    theme,
    setTheme,
    clg,
    handleTheme
  };
};
