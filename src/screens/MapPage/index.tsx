import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, useDisclose, VStack, HStack, Actionsheet, TextArea } from 'native-base';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import * as Location from 'expo-location';
import { PermissionStatus } from 'expo-modules-core';
import MapView, {
  Marker,
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
import SearchMode from './SearchMode';
import VectorIcon from '../../assets/VectorIcon.svg';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import { StackRoutes } from '../../nav/routeTypes';
import { BackButton } from 'components/NavButtons';
import { createReview } from 'redux/slices/reviewsSlice';

export type MapPageMode =
  | 'MainMap'
  | 'AddLocation'
  | 'LocationSelected'
  | 'Search';

function MapPage() {
  const navigation = useNavigation<NavType>();
  const {
    isOpen,
    onOpen,
    onClose,
  } = useDisclose();

  const dispatch = useAppDispatch();
  const mapRef = useRef<MapView>(null);
  const [locationPermissionStatus, setLocationPermissionStatus] =
    useState<PermissionStatus>();

  const filter = useAppSelector((state) => state.filter);
  const { latitude, longitude, tempLatitude, tempLongitude } = useAppSelector((state) => state.connection);
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

  const [isSatelliteMode, setIsSatelliteMode] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(' ');

  return (
    <>
      <MapView
        style={styles.map}
        userInterfaceStyle='light'
        ref={mapRef}
        mapType={isSatelliteMode ? 'satellite' : 'standard'}
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
                  <Text color={(isSatelliteMode) ? 'white' : 'black'} fontSize={8} fontFamily={fonts.regular}>
                    {allBathrooms[bathroomId].name}
                  </Text>
                  <VectorIcon width={20} height={20} />
                </Marker>
              );
            })
        }
        {
          pageMode !== 'Search' ?
            <Marker
              key={'Your Pos'}
              coordinate={{ latitude, longitude }}
              style={{
                alignItems: 'center',
              }}
            >
              <Text color={(isSatelliteMode) ? 'white' : 'black'} fontSize={8} fontFamily={fonts.regular}>
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
            :
            <Marker
              key={'Your New Pos'}
              coordinate={{ latitude: tempLatitude, longitude: tempLongitude }}
              style={{
                alignItems: 'center',
              }}
              draggable={true}
            >
              <Text color={(isSatelliteMode) ? 'white' : 'black'} fontSize={8} fontFamily={fonts.regular}>
                Your new position
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
        }
      </MapView>
      {
        pageMode == 'MainMap' ?
          <MapMode setPageMode={setPageMode} />
          : pageMode == 'AddLocation' ?
            <AddLocationMode setPageMode={setPageMode} /> :
            <>
            </>
      }
      {
        pageMode == 'MainMap' &&
        <AppButton
          //Filters
          title=''
          disabled={false}
          style={{
            position: 'absolute',
            top: '6.5%',
            left: '5%',
            backgroundColor: '#7657E2',
            borderRadius: 50,
            height: 70,
            width: 70,
            shadowColor: '#171717',
            shadowOffset: { width: -2, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
          }}
          onPress={() => { setIsSatelliteMode(!isSatelliteMode); }}
        >
          {
            isSatelliteMode ?
              <Feather name='map' size={30} color='black' style={{ paddingTop: 5 }} />
              :
              <FontAwesome5 name='satellite-dish' size={30} color={'black'} style={{ paddingTop: 5 }} />
          }
        </AppButton>
      }
      {
        pageMode === 'Search' &&
        <SearchMode setPageMode={setPageMode} mapRef={mapRef} />
      }
      <Actionsheet isOpen={isOpen} onClose={() => {
        dispatch(setSelectedBathroom(''));
        onClose();
      }}>
        <Actionsheet.Content style={styles.actionSheetModal}>
          {
            selectedBathroomId &&
            <TextArea
              value={textAreaValue} 
              onChangeText={e => {
                setTextAreaValue(e);
              }}
              h={20} 
              placeholder="Write your comment here" 
              w="90%" 
              maxW="300"
              autoCompleteType={''} 
            />
          }
          <Actionsheet.Item
            style={{ alignItems: 'center' }}
            onPress={() => {
              onClose();
              console.log(textAreaValue);
              dispatch(createReview({ bathroomId: selectedBathroomId, rating: 1, comment: textAreaValue }));
            }}
          >
            <Text style={{ color: '#00B4C5', fontFamily: fonts.semiBold, fontSize: 16 }}>Add Comment</Text>
          </Actionsheet.Item>
          <Actionsheet.Item
            style={{ alignItems: 'center' }}
            onPress={() => {
              onClose();
              navigation.navigate(StackRoutes.MORE_INFO, { selectedBathroomId });
            }}
          >
            <Text style={{ color: '#00B4C5', fontFamily: fonts.semiBold, fontSize: 16 }}>See More Info</Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionSheetModal: {
    minHeight: 550,
  },
});

export default MapPage;
