import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, useDisclose, HStack, VStack, Actionsheet, Center } from 'native-base';
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
import { getBathroomsByLocationRange, setSelectedBathroom } from 'redux/slices/bathroomsSlice';
import { setLatLng } from 'redux/slices/connectionSlice';
import AppButton from 'components/AppButton';
import Colors from 'utils/Colors';
import {
  DDPoint,
  Haversine,
} from 'haversine-ts';
import MapMode from './MapMode';
import AddLocationMode from './AddLocationMode';

export type MapPageMode =
  | 'MainMap'
  | 'AddLocation'
  | 'LocationSelected';

const MapPage = () => {
  const {
    isOpen,
    onOpen,
    onClose,
  } = useDisclose();

  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavType>();
  const mapRef = useRef<MapView>(null);
  const [locationPermissionStatus, setLocationPermissionStatus] =
    useState<PermissionStatus>();
  
  const { latitude, longitude } = useAppSelector((state) => state.connection);
  const selectedBathroomId = useAppSelector((state) => state.bathrooms.selectedBathroomId);
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
        dispatch(setLatLng({
          latitude: coords.latitude,
          longitude: coords.longitude,
        }));
        await dispatch(getBathroomsByLocationRange({ latitude: coords.latitude, longitude: coords.longitude }));
        mapRef?.current?.animateToRegion({
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const allBathrooms = useAppSelector((state) => state.bathrooms.all);
  const [pageMode, setPageMode] = useState<MapPageMode>('MainMap');

  const googleInfo = useAppSelector((state) => state.google);

  return (
    <>
      <MapView
        style={styles.map}
        userInterfaceStyle='light'
        ref={mapRef}
        mapType={'standard'}
        showsCompass={true}
        showsScale={true}
        followsUserLocation={true}
        onMapReady={async () => {
          if (locationPermissionStatus === PermissionStatus.GRANTED) {
            await getCurrentLocation();
          }
        }}
      >
        {
          pageMode == 'MainMap' && Object.keys(allBathrooms)
            .map((bathroomId: string, index: number) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: allBathrooms[bathroomId].location.coordinates[1],
                    longitude: allBathrooms[bathroomId].location.coordinates[0],
                  }}
                  onPress={() => {
                    dispatch(setSelectedBathroom(bathroomId));
                    onOpen();
                  }}
                  style={{
                    alignItems: 'center',
                  }}
                >
                  <Text color='white' fontSize={8} fontFamily={fonts.regular}>
                    {allBathrooms[bathroomId].name}
                  </Text>
                  <Image
                    source={require('../../../../assets/Vector.png')}
                    style={{
                      paddingBottom: 10,
                    }}
                  />
                </Marker>
              );
            })
        }
        <Marker
          key={'Your Pos'}
          coordinate={{ latitude, longitude }}
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
          >
            {/* <VectorSVG style={{ paddingbottom : 10 }}/> */}      
          </View> 
        </Marker>
      </MapView>
      <AppButton
        title="____"
        disabled={false}
        style={{
          position: 'absolute',
          top: '6.5%',
          left: '5%',
          backgroundColor: '#00B4C5',
          borderRadius: 0,
          height: 70,
          width: 70,
        }}
        onPress={() => {

        }}
      />
      {
        pageMode == 'MainMap' ?
          <MapMode setPageMode={setPageMode} />
          : pageMode == 'AddLocation' ?
            <AddLocationMode setPageMode={setPageMode} /> :
            <>
            </>
      }
      <Actionsheet isOpen={isOpen} onClose={() => {
        dispatch(setSelectedBathroom(''));
        onClose();
      }}>
        <Actionsheet.Content style={styles.actionSheetModal}>
          {
            selectedBathroomId &&
            <VStack
              style={{
                alignItems: 'center',
              }}
            >
              <Text>
                {allBathrooms[selectedBathroomId].name}
              </Text>
              <Text>
                {
                  (
                    new Haversine(2).getDistance(
                      new DDPoint(latitude, longitude),
                      new DDPoint(allBathrooms[selectedBathroomId]?.location?.coordinates[1], allBathrooms[selectedBathroomId]?.location?.coordinates[0])).toFixed(2)
                  ) + ' miles away'
                }
              </Text>
              {
                allBathrooms[selectedBathroomId].hasElevatorAccess ?
                  <Text>
                    Is elevator accessible
                  </Text>
                  :
                  <Text>
                    Not elevator accessible
                  </Text>
              }
            </VStack>
          }
          <Actionsheet.Item onPress={() => console.log('hi')}>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
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
  actionSheetModal: {
    minHeight: 200,
  },
});

export default MapPage;
