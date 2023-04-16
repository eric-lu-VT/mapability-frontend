import { StackRoutes } from 'nav/routeTypes';

interface NavType {
  navigate: (value: string, params?: object) => void
  goBack: () => void
}

export type RootStackParamList = {
  [StackRoutes.MORE_INFO]: undefined,
};

export default NavType;
