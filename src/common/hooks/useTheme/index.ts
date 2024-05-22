import { useEffect, useState } from 'react';

const THEME_KEY_NAME = 'ui:theme';

export default function useTheme(initialTheme = 'dark') {
  const defaultTheme = localStorage.getItem(THEME_KEY_NAME) ?? initialTheme;
  const [theme, setTheme] = useState(defaultTheme);

  const setDarkTheme = () => {
    setTheme('dark');
  };

  const setLightTheme = () => {
    setTheme('light');
  };

  const toggleTheme = () => {
    const isDark = theme === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';

    setTheme(nextTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark';
    const prevTheme = isDark ? 'light' : 'dark';

    root.classList.remove(prevTheme);
    root.classList.add(theme);

    localStorage.setItem(THEME_KEY_NAME, theme);
  }, [theme, setTheme]);

  const isDark = theme === 'dark';
  const isLight = theme === 'light';

  return {
    theme,
    setDarkTheme,
    setLightTheme,
    toggleTheme,
    isDark,
    isLight,
  };
}
