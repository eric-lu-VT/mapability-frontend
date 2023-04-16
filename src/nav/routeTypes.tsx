// import { NavigatorScreenParams } from '@react-navigation/native';
// Use NavigatorScreenParams to nest navigators within navigators

export enum StackRoutes {
  MAP = 'MapView',
  MORE_INFO = 'MoreInfoView',
  FILTER = 'FilterView',
  ADD_LOC = 'AddLocationView',
}

export type NavList = {
  [StackRoutes.MAP]: Record<string, unknown>;
  [StackRoutes.MORE_INFO]: Record<string, unknown>;
  [StackRoutes.FILTER]: Record<string, unknown>;
  [StackRoutes.ADD_LOC]: Record<string, unknown>;
};
