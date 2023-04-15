import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import useAppSelector from 'hooks/useAppSelector';
import { UserScopes } from 'types/users';
import { 
  FrontPage,
  ForbiddenPage,
  MapPage,
  ResourcesPage,
  UsersPage,
} from 'screens';
import { 
  BaseTabRoutes, 
  FrontStackRoutes,
  MapStackRoutes,
  ResourceStackRoutes,
  BaseNavigationList,
} from '../routeTypes';
import { HStack } from 'native-base';
import RingsIcon from 'assets/ringicon.svg';
import ProfileNavBaseIcon from 'assets/profile-nav-base.svg';

const BaseTab = createBottomTabNavigator<BaseNavigationList>();
const BaseStack = createStackNavigator<BaseNavigationList>();

const ProtectedRoute = (allowableScopes: UserScopes[]) => {
  const { authenticated, role } = useAppSelector((state) => state.auth);

  return (allowableScopes.includes(role) && authenticated);
};

const FrontNavigator = () => {
  return (
    <BaseStack.Navigator initialRouteName={FrontStackRoutes.FRONT}>
      <BaseStack.Screen
        name={FrontStackRoutes.FRONT}
        component={FrontPage}
        options={{ header: () => null }}
      />
    </BaseStack.Navigator>
  );
};

const MapNavigator = () => {
  return (
    <BaseStack.Navigator initialRouteName={MapStackRoutes.MAP}>
      <BaseStack.Screen
        name={MapStackRoutes.MAP}
        component={MapPage}
        options={{ header: () => null }}
      />
    </BaseStack.Navigator>
  );
};

const ResourceNavigator = () => {
  return (
    <BaseStack.Navigator initialRouteName={ResourceStackRoutes.VIEW_RESOURCES}>
      <BaseStack.Screen
        name={ResourceStackRoutes.VIEW_RESOURCES}
        component={ResourcesPage}
        options={{ header: () => null }}
      />
      <BaseStack.Screen
        name={ResourceStackRoutes.VIEW_USERS}
        component={UsersPage}
        options={{ header: () => null }}
      />
    </BaseStack.Navigator>
  );
};

const BaseNavigation = () => {
  return (
    <NavigationContainer>
      <BaseTab.Navigator
        screenOptions={{
          header: () => null,
          tabBarStyle: {
            backgroundColor: 'rgba(147,111,209,0.25)',
            bottom: 15,
            width: '90%',
            alignSelf: 'center',
            borderRadius: 15,
            borderTopWidth: 0,
            position: 'absolute',
            left: '5%',
            height: 60,
          },
          tabBarShowLabel: false,
          tabBarIconStyle: {
            marginTop: 50,
          },
        }}
        initialRouteName={BaseTabRoutes.FRONT_NAV}
      >
        <BaseTab.Screen
          name={BaseTabRoutes.MAP_NAV}
          component={
            ProtectedRoute([UserScopes.User, UserScopes.Admin])
              ? MapNavigator
              : ForbiddenPage
          }
          options={{ tabBarIcon: () => (
            <HStack width={35} height={35} alignItems='center' justifyContent='center'>
              <ProfileNavBaseIcon style={{ position: 'absolute' }} />
            </HStack>
          ) }}
        />
        <BaseTab.Screen
          name={BaseTabRoutes.FRONT_NAV}
          component={FrontNavigator}
          options={{ tabBarIcon: () => <RingsIcon /> }}
        />
        <BaseTab.Screen
          name={BaseTabRoutes.VIEW_RESOURCES_NAV}
          component={
            ProtectedRoute([UserScopes.User, UserScopes.Admin])
              ? ResourceNavigator
              : ForbiddenPage
          }
          options={{ tabBarIcon: () => (
            <HStack width={35} height={35} alignItems='center' justifyContent='center'>
              <ProfileNavBaseIcon style={{ position: 'absolute' }} />
            </HStack>
          ) }}
        />
      </BaseTab.Navigator>
    </NavigationContainer>
  );
};

export default BaseNavigation;