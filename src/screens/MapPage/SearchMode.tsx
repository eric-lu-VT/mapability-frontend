import React, { useState } from 'react';
import AppButton from 'components/AppButton';
import { MapPageMode } from '.';
import { StackRoutes } from 'nav/routeTypes';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { View, Text } from 'native-base';
import TextStyles from '../../utils/TextStyles';
import { fonts } from '../../utils/constants';
import { AntDesign, Entypo } from '@expo/vector-icons';
import SearchBar from 'components/SearchBar';
import { setLatLng, setTempLatLng } from 'redux/slices/connectionSlice';
import { googleTextSearchLocation, resetGooglePlace  } from 'redux/slices/googleSlice';
import MapView from 'react-native-maps';
import { resetBathroomState, getBathroomsByLocationRange } from 'redux/slices/bathroomsSlice'; 

type SearchModeProps = {
  setPageMode: React.Dispatch<React.SetStateAction<MapPageMode>>,
  mapRef: React.RefObject<MapView>,
};
function SearchMode({ setPageMode, mapRef }: SearchModeProps) {
  const dispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { latitude, longitude, tempLatitude, tempLongitude } = useAppSelector((state) => state.connection);
  
  return (
    <>
      <View
        style={{
          position: 'absolute', top: '6.5%', left: '15%', right: '0%', justifyContent: 'center', alignItems: 'center', maxWidth: '90%',
        }}
      >
        <SearchBar
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
          placeholder='Search Location'
          onPress={async () => {
            const res = await dispatch(googleTextSearchLocation({ search: searchQuery })) as any;
            const geometry = res.payload.result.geometry;
            
            dispatch(setTempLatLng({ tempLatitude: geometry.location.lat, tempLongitude: geometry.location.lng }));
            mapRef?.current?.animateToRegion({
              latitude: geometry.location.lat,
              longitude: geometry.location.lng,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            });
          }}
        />
      </View>
      <AppButton
        title=''
        disabled={false}
        style={{
          position: 'absolute',
          bottom: '6.5%',
          left: '5%',
          backgroundColor: '#ff3333',
          borderRadius: 50,
          height: 70,
          width: 70,
          shadowColor: '#171717',
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        }}
        onPress={() => {
          mapRef?.current?.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
          dispatch(resetGooglePlace());
          setPageMode('MainMap');
        }}
      >
        <Entypo name='cross' size={30} color='black' style={{ paddingTop: 5 }}/>
      </AppButton>
      <AppButton
        title=''
        disabled={false}
        style={{
          position: 'absolute',
          bottom: '6.5%',
          right: '5%',
          backgroundColor: '#00BF7D',
          borderRadius: 50,
          height: 70,
          width: 70,
          shadowColor: '#171717',
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        }}
        onPress={async () => {
          dispatch(setLatLng({ latitude: tempLatitude, longitude: tempLongitude }));
          dispatch(resetGooglePlace());
          dispatch(resetBathroomState());
          await dispatch(getBathroomsByLocationRange({ latitude: tempLatitude, longitude: tempLongitude }));
          setPageMode('MainMap');
        }}
      >
        <AntDesign name='check' size={30} color='black' style={{ paddingTop: 5 }}/>
      </AppButton>
    </>
  );
}

export default SearchMode;