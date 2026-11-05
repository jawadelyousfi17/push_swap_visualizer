import { useState, useEffect } from 'react';

const THEME_COLORS = { red: 10, green: 120, blue: 220, rebecca: 270, default: 50 };

/**
 * Bar color theme, persisted in localStorage. The app itself is dark only.
 */
export const useTheme = () => {
  const [theme, setTheme] = useState('default');
  const [loaded, setLoaded] = useState(false);

  // Load after mount: localStorage is unavailable during SSR
  useEffect(() => {
    const saved = localStorage.getItem('thm');
    if (saved && saved in THEME_COLORS) setTheme(saved);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem('thm', theme);
  }, [theme, loaded]);

  return { theme, setTheme, clg: THEME_COLORS[theme] ?? 50 };
};
