import React, {useEffect} from 'react';
import {Platform, StatusBar, useColorScheme} from 'react-native';
import {ThemeProvider} from '@shopify/restyle';
import {useAppSelector} from '@lib/store/hooks';
import {Box, dark_theme, theme} from '../themes';

interface ThemeWrapperProps {
  children: React.ReactNode;
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({children}) => {
  const colorScheme = useColorScheme();
  const themePreference = useAppSelector(state => state.theme.themePreference);

  useEffect(() => {
    const isDark = themePreference === 'dark' || (themePreference === 'system' && colorScheme === 'dark');
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
  }, [themePreference, colorScheme]);

  const currentTheme =
    themePreference === 'dark' || (themePreference === 'system' && colorScheme === 'dark') ? dark_theme : theme;

  return (
    <ThemeProvider theme={currentTheme}>
      <Box flex={1} backgroundColor={'black'}>
        {Platform.OS === 'web' ? (
          <Box flex={1} alignItems="center" backgroundColor={'grey_light'}>
            <Box flex={1} width="100%" maxWidth={1200} backgroundColor={'white'}>
              {children}
            </Box>
          </Box>
        ) : (
          children
        )}
      </Box>
    </ThemeProvider>
  );
};
