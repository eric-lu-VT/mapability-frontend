import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavList, StackRoutes } from './routeTypes';
import { MapPage } from 'screens';

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
      </BaseStack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigation;