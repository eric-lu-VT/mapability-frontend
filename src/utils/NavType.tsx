import { MapStackRoutes } from 'navigation/routeTypes';

interface NavType {
  navigate: (value: string, params?: object) => void
  goBack: () => void
}

export type RootStackParamList = {
  [MapStackRoutes.MAP]: undefined;
};


export default NavType;
