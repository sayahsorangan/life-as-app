export const Route = {
  home: 'home',
} as const;

export type RouteStackNavigation = {
  [Route.home]: undefined;
};
