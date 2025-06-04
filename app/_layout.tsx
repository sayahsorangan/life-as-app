import {ThemeProvider} from '@shopify/restyle';
import {QueryClientProvider} from '@tanstack/react-query';
import 'react-native-reanimated';

import {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';

import {queryClient} from '@react-query/query-client';
import {RoleList} from './modules/roles/screens/role-list';
import {dark_theme, theme} from './themes';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const themePreference = 'dark';

  useEffect(() => {
    const isDark = themePreference === 'dark' || (themePreference === 'system' && colorScheme === 'dark');
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
  }, [themePreference, colorScheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        theme={
          themePreference === 'dark' || (themePreference === 'system' && colorScheme === 'dark') ? dark_theme : theme
        }
      >
        <RoleList />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
