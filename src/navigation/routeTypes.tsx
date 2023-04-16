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
  PROFILE_NAV = 'Profile Nav',
}

export enum FrontStackRoutes {
  FRONT = 'Front Page',
}

export enum MapStackRoutes {
  MAP = 'Map',
}

export enum ProfileStackRoutes {
  PROFILE_PAGE = 'Profile Page',
}

export type BaseNavigationList = {
  [BaseTabRoutes.FRONT_NAV]: Record<string, unknown>;
  [BaseTabRoutes.MAP_NAV]: Record<string, unknown>;
  [BaseTabRoutes.PROFILE_NAV]: Record<string, unknown>;
  [FrontStackRoutes.FRONT]: Record<string, unknown>;
  [MapStackRoutes.MAP]: Record<string, unknown>;
  [ProfileStackRoutes.PROFILE_PAGE]: Record<string, unknown>,
};