export const LIGHT_THEME = "ghorermeal";
export const DARK_THEME = "ghorermeal-night";
export const THEME_STORAGE_KEY = "ghorermeal-theme";

export const getTheme = (storage = window.localStorage) =>
  storage.getItem(THEME_STORAGE_KEY) || LIGHT_THEME;

export const setTheme = (
  theme,
  target = document.documentElement,
  storage = window.localStorage
) => {
  target.setAttribute("data-theme", theme);
  storage.setItem(THEME_STORAGE_KEY, theme);
  return theme;
};

export const toggleTheme = currentTheme =>
  currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
