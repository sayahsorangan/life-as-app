if (__DEV__ && require('react-native').Platform.OS !== 'web') {
  // require('../ReactotronConfig');
}

import {QueryClientProvider} from '@tanstack/react-query';
import 'react-native-reanimated';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {queryClient} from '@react-query/query-client';
import {StackNavigator} from '@router/stack-navigation';
import {store, persistor} from '@lib/store/index';
import {ThemeWrapper} from '@components/theme-wrapper';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <ThemeWrapper>
              <StackNavigator />
            </ThemeWrapper>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
