// import { NavigatorScreenParams } from '@react-navigation/native';
// Use NavigatorScreenParams to nest navigators within navigators

export enum AuthStackRoutes {
  BASE = 'Base',
  SIGNIN = 'Sign In',
  SIGNUP = 'Sign Up',
}

export type AuthNavigationList = {
  [AuthStackRoutes.BASE]: Record<string, unknown>;
  [AuthStackRoutes.SIGNIN]: Record<string, unknown>;
  [AuthStackRoutes.SIGNUP]: Record<string, unknown>;
};

export enum BaseTabRoutes {
  FRONT_NAV = 'Front Page Nav',
  MAP_NAV = 'Map Page Nav',
  VIEW_RESOURCES_NAV = 'View Resources Nav',
}

export enum FrontStackRoutes {
  FRONT = 'Front Page',
}

export enum MapStackRoutes {
  MAP = 'Map',
}

export enum ResourceStackRoutes {
  VIEW_RESOURCES = 'View Resources',
  VIEW_USERS = 'View Users',
}

export type BaseNavigationList = {
  [BaseTabRoutes.FRONT_NAV]: Record<string, unknown>;
  [BaseTabRoutes.MAP_NAV]: Record<string, unknown>;
  [BaseTabRoutes.VIEW_RESOURCES_NAV]: Record<string, unknown>;
  [FrontStackRoutes.FRONT]: Record<string, unknown>;
  [MapStackRoutes.MAP]: Record<string, unknown>;
  [ResourceStackRoutes.VIEW_RESOURCES]: Record<string, unknown>;
  [ResourceStackRoutes.VIEW_USERS]: Record<string, unknown>,
};