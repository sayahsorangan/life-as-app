import {createNavigationContainerRef, StackActions} from '@react-navigation/native';

import {Route, RouteStackNavigation} from './route-name';

export const navigationRef = createNavigationContainerRef();

const navigate: typeof navigationRef.navigate = navigationRef.navigate;

const back = () => {
  navigationRef.goBack();
};

const replace = <RouteName extends keyof RouteStackNavigation>(
  ...args: undefined extends RouteStackNavigation[RouteName]
    ? [screen: RouteName] | [screen: RouteName, params: RouteStackNavigation[RouteName]]
    : [screen: RouteName, params: RouteStackNavigation[RouteName]]
) => {
  const [name, params] = args;
  navigationRef.dispatch(StackActions.replace(name, params));
};

const push = <RouteName extends keyof RouteStackNavigation>(
  ...args: undefined extends RouteStackNavigation[RouteName]
    ? [screen: RouteName] | [screen: RouteName, params: RouteStackNavigation[RouteName]]
    : [screen: RouteName, params: RouteStackNavigation[RouteName]]
) => {
  const [name, params] = args;
  navigationRef.dispatch(StackActions.push(name, params));
};

type ResetParam<RouteName extends keyof RouteStackNavigation> = {
  name: RouteName;
  params?: RouteStackNavigation[RouteName];
};

const reset = <SecondRoute extends keyof RouteStackNavigation>(first: ResetParam<SecondRoute>) =>
  navigationRef.reset({routes: [first]});

const resetToMain = () => navigationRef.reset({routes: [{name: Route.home}]});

export const Navigation = {
  navigate,
  back,
  replace,
  push,
  reset,
  resetToMain,
};
