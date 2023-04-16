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
import { MapStackRoutes } from 'navigation/routeTypes';
import { getBathroomsByLocationRange, setSelectedBathroom } from 'redux/slices/bathroomsSlice';
import AppButton from 'components/AppButton';
import { StackRoutes } from 'nav/routeTypes';
import { background } from 'native-base/lib/typescript/theme/styled-system';
import Colors from 'utils/Colors';
import {
  DDPoint,
  Haversine,
  UnitOfDistance,
} from 'haversine-ts';
// import MyIcon from '../../../../assets/Vector.png'

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
  const [userPos, setUserPos] = useState({
    latitude: 43.7348569458618,
    longitude: -72.2519099587406,
  });
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
        setUserPos({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
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
  const [isAddMode, setIsAddMode] = useState<boolean>(false);

  return (
    <>
      <MapView
        style={styles.map}
        userInterfaceStyle='light'
        ref={mapRef}
        mapType={'standard'}
        showsCompass={true}
        showsScale={true}
        followsUserLocation = {true}
        onMapReady={async () => {
          if (locationPermissionStatus === PermissionStatus.GRANTED) {
            await getCurrentLocation();
          }
        }
        
      }
      >
        {
          !isAddMode && Object.keys(allBathrooms)
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
                    source={require('../../../../assets/Vector.svg')}
                    style={{
                      paddingBottom : 10
                    }}
                  />
                </Marker>
              );
            })
        }
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
        !isAddMode && 
        <>
          <AppButton
            //Filters
            title=''
            disabled={false}
            style={{
              position: 'absolute',
              top: '6.5%',
              right: '5%',
              backgroundColor: '#00B4C5',
              borderRadius: 50,
              height: 70,
              width: 70,
            }}
            onPress={() => {
              navigation.navigate(StackRoutes.FILTER);
            }}
          />
          <AppButton
            // Add location
            title='+'
            disabled={false}
            style={{
              position: 'absolute',
              bottom: '6.5%',
              right: '5%',
              backgroundColor: '#00BF7D',
              borderRadius: 50,
              height: 70,
              width: 70,
            }}
            onPress={() => {
              setIsAddMode(!isAddMode);
            }}
          />
        </>
      }
      {
        isAddMode &&
        <>
          <AppButton
            title='Add Here'
            disabled={false}
            style={{
              position: 'absolute',
              bottom: '6.5%',
              left: '5%',
              backgroundColor: '#00BF7D',
              borderRadius: 50,
              height: 70,
              width: 185,
            }}
            onPress={() => {
              setIsAddMode(!isAddMode);
            }}
          />
          <AppButton
            title='-'
            disabled={false}
            style={{
              position: 'absolute',
              bottom: '6.5%',
              right: '5%',
              backgroundColor: '#00BF7D',
              borderRadius: 50,
              height: 70,
              width: 70,
            }}
            onPress={() => {
              setIsAddMode(!isAddMode);
            }}
          />
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
                  { allBathrooms[selectedBathroomId].name }
                </Text> 
                <Text>
                  { 
                    (
                      new Haversine(2).getDistance(
                        new DDPoint(userPos.latitude, userPos.longitude), 
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
