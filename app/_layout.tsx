if (__DEV__ && require('react-native').Platform.OS !== 'web') {
  // require('../ReactotronConfig');
}

import {ThemeProvider} from '@shopify/restyle';
import {QueryClientProvider} from '@tanstack/react-query';
import 'react-native-reanimated';

import {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import {queryClient} from '@react-query/query-client';
import {StackNavigator} from '@router/stack-navigation';
import {Box, dark_theme, theme} from './themes';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const themePreference = 'system';

  useEffect(() => {
    const isDark = themePreference === 'dark' || (themePreference === 'system' && colorScheme === 'dark');
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
  }, [themePreference, colorScheme]);

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          theme={
            themePreference === 'dark' || (themePreference === 'system' && colorScheme === 'dark') ? dark_theme : theme
          }
        >
          <Box flex={1} backgroundColor={'white'}>
            <StackNavigator />
          </Box>
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
