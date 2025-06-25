import {useColorScheme} from 'react-native';
import {useAppSelector, useAppDispatch} from '@lib/store/hooks';
import {setThemePreference, type ThemeMode} from '@lib/store/slices/themeSlice';

export const useAppTheme = () => {
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const themePreference = useAppSelector(state => state.theme.themePreference);

  const isDark = themePreference === 'dark' || (themePreference === 'system' && colorScheme === 'dark');

  const setTheme = (mode: ThemeMode) => {
    dispatch(setThemePreference(mode));
  };

  return {
    themePreference,
    isDark,
    setTheme,
  };
};
