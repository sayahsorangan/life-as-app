import React, {Fragment, useEffect, useState} from 'react';

import {ActivityIndicator, Platform, SafeAreaView, StatusBar, StatusBarProps, View, ViewProps} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {Text, theme} from '@app/themes';

import {EmptyData} from './empty-data';

// Custom hook for getting status bar height reliably
export const useStatusBarHeight = () => {
  const insets = useSafeAreaInsets();

  if (Platform.OS === 'web') {
    return 0; // No status bar on web
  } else if (Platform.OS === 'ios') {
    return insets.top;
  } else {
    // For Android, combine safe area insets with StatusBar.currentHeight
    return Math.max(insets.top, StatusBar.currentHeight ?? 20);
  }
};

// More reliable status bar height calculation
export const getStatusBarHeight = () => {
  if (Platform.OS === 'web') {
    return 0; // No status bar on web
  } else if (Platform.OS === 'ios') {
    // For iOS, use safe area insets which properly handles all device types
    return 0; // Will be handled by SafeAreaView or useSafeAreaInsets
  } else {
    // For Android, ensure we have a fallback value
    return StatusBar.currentHeight ?? 24; // 24 is a reasonable default for Android
  }
};

// Legacy export for backward compatibility - but prefer using useSafeAreaInsets or useStatusBarHeight hook
export const STATUSBAR_HEIGHT = getStatusBarHeight();

interface ContainerProps extends OwnStatusBarProps {
  children: React.ReactNode;
  backgroundColor?: string;
  loading?: boolean;
  containerProps?: ViewProps;
  whithImageBg?: 1 | 2 | 3 | null;
  is_empty?: boolean;
  loading_text?: string;
}

export const Container = React.memo((props: ContainerProps) => {
  const {colors} = theme;
  const {
    children,
    backgroundColor = colors.white,
    translucent = false,
    loading = false,
    containerProps,
    whithImageBg = null,
    is_empty = false,
    loading_text,
    ...other
  } = props;

  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    setIsLoading(loading);
  }, [loading]);

  return (
    <View style={{flex: 1}} {...containerProps}>
      <MyStatusBar backgroundColor={whithImageBg ? undefined : backgroundColor} {...{translucent}} {...other} />
      <View style={{flex: 1, backgroundColor: whithImageBg ? undefined : backgroundColor, overflow: 'hidden'}}>
        {isLoading ? null : is_empty ? <EmptyData /> : children}
      </View>
      {isLoading && (
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            left: 0,
            zIndex: 10000,
          }}
        >
          <View style={{backgroundColor: colors.black, flex: 1, opacity: 0.1}} />
          <View
            style={{
              position: 'absolute',
              aspectRatio: 1,
              padding: theme.spacing.lg,
              borderRadius: 8,
              backgroundColor: theme.colors.white,
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />

            {!!loading_text && (
              <Text color={'info'} variant={'body_regular'} mt={'md'}>
                {loading_text}
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
});

interface OwnStatusBarProps extends StatusBarProps {
  safeArea?: boolean;
}

const MyStatusBar = React.memo(
  ({backgroundColor, safeArea = true, translucent = false, ...other}: OwnStatusBarProps) => {
    const Wrapper = safeArea ? SafeAreaView : Fragment;
    const statusBarHeight = useStatusBarHeight();

    return (
      <View style={{backgroundColor, height: translucent ? 0 : statusBarHeight}}>
        <Wrapper>
          <StatusBar animated={true} translucent backgroundColor="transparent" {...other} />
        </Wrapper>
      </View>
    );
  },
);
