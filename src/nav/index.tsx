import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavList, StackRoutes } from './routeTypes';
import { MapPage, FilterPage, InfoPage } from 'screens';
import AddLocationPage from 'screens/AddLocationPage';

const BaseStack = createStackNavigator<NavList>();

function RootNavigation() {
  return (
    <NavigationContainer>
      <BaseStack.Navigator initialRouteName={StackRoutes.MAP}>
        <BaseStack.Screen
          name={StackRoutes.MAP}
          component={MapPage}
          options={{ header: () => null }}
        />
        <BaseStack.Screen
          name={StackRoutes.FILTER}
          component={FilterPage}
          options={{ header: () => null }}
        />
        <BaseStack.Screen
          name={StackRoutes.MORE_INFO}
          component={InfoPage}
          options={{ header: () => null }}
        />
        <BaseStack.Screen
          name={StackRoutes.ADD_LOC}
          component={AddLocationPage}
          options={{ header: () => null }}
        />
      </BaseStack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;
