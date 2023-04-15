import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'native-base';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import * as Location from 'expo-location';
import { PermissionStatus } from 'expo-modules-core';
import MapView, {
  Marker,
  Polygon,
  Region,
  LatLng,
  Polyline,
} from 'react-native-maps';
import { fonts } from 'utils/constants';
import { MapStackRoutes } from 'navigation/routeTypes';

const MapPage = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavType>();
  const mapRef = useRef<MapView>(null);
  const [locationPermissionStatus, setLocationPermissionStatus] =
    useState<PermissionStatus>();
  const [userPos, setUserPos] = useState({
    latitude: 43.7348569458618,
    longitude: -72.2519099587406,
  });
  useEffect(() => {
    (async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === PermissionStatus.UNDETERMINED) {
        setLocationPermissionStatus(
          (await Location.requestForegroundPermissionsAsync()).status,
        );
      } else {
        setLocationPermissionStatus(status);
      }
    })();
  }, []);
  const getCurrentLocation = async () => {
    Location.getCurrentPositionAsync()
      .then(async ({ coords }) => {
        setUserPos({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <MapView
        style={styles.map}
        userInterfaceStyle='dark'
        ref={mapRef}
        mapType={'standard'}
        showsCompass={true}
        showsScale={true}
        onMapReady={async () => {
          if (locationPermissionStatus === PermissionStatus.GRANTED) {
            await getCurrentLocation();
          }
        }}
      >
        <Marker
          key={'Your Pos'}
          coordinate={userPos}
          style={{
            alignItems: 'center',
          }}
        >
          <Text color='white' fontSize={8} fontFamily={fonts.regular}>
            Your position
          </Text>
          <View
            style={{
              width: 10,
              height: 10,
              borderRadius: 10 / 2,
              backgroundColor: 'red',
            }}
          />
        </Marker>
      </MapView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapPage;
