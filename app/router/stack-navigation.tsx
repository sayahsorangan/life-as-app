import {TouchableOpacity, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Icons} from '@app/assets/icons';
import {Text, theme} from '@app/themes';
import {useStatusBarHeight} from '@components/container';

import {Home} from '@app/modules/home/screens/home';
import {Route, RouteStackNavigation} from './route-name';

const Stack = createNativeStackNavigator<RouteStackNavigation>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        header: p => CustomHeader(p),
      }}
      initialRouteName={'home'}
    >
      <Stack.Screen name={Route.home} component={Home} />
    </Stack.Navigator>
  );
};

const CustomHeader = (p: any) => {
  const statusBarHeight = useStatusBarHeight();

  return (
    <View
      style={{
        paddingHorizontal: theme.spacing.xs,
        paddingVertical: theme.spacing.xs,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.white,
        paddingTop: statusBarHeight + theme.spacing.xs,
        borderBottomWidth: 1,
        borderColor: theme.colors.grey_light,
      }}
    >
      <TouchableOpacity
        style={{
          padding: theme.spacing.xs,
        }}
        onPress={() => p.navigation.goBack()}
      >
        <Icons.Feather name="chevron-left" size={32} color={theme.colors.grey_dark} />
      </TouchableOpacity>
      <Text numberOfLines={1} variant={'h_4_medium'} marginHorizontal={'xs'}>
        {p.options.title}
      </Text>

      <View style={{width: theme.spacing.xs * 2 + 24}}>
        {
          // @ts-ignore
          p.options.headerRight && p.options.headerRight(null)
        }
      </View>
    </View>
  );
};
