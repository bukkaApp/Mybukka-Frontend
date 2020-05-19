import React, { useEffect } from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { useDarkModeContext } from './DarkMode';

import theme from '../shared/theme';

const defaultContextData = {
  dark: false,
  toggle: () => {},
};

const ThemeContext = React.createContext(defaultContextData);
const useTheme = () => React.useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [themeState, setThemeState] = useDarkModeContext();

  const newTheme = themeState.dark ? theme('dark') : theme('light');

  useEffect(() => {
    setThemeState({ hasThemeLoaded: true, });
  }, []);

  const toggle = () => {
    // toogle function goes here
    setThemeState(prop => ({ hasThemeLoaded: true, dark: !prop.dark }));
  };

  if (!themeState.hasThemeLoaded) {
    /*
      If the theme is not yet loaded we don't want to render
      this is just a workaround to avoid having the app rendering
      in light mode by default and then switch to dark mode while
      getting the theme state from localStorage
    */
    return <div />;
  }

  return (
    <EmotionThemeProvider theme={newTheme}>
      <ThemeContext.Provider
        value={{
          dark: themeState.dark,
          toggle,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </EmotionThemeProvider>
  );
};

export { ThemeProvider, useTheme };
