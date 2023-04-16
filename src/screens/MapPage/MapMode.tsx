import { useNavigation } from '@react-navigation/native';
import AppButton from 'components/AppButton';
import { StackRoutes } from 'nav/routeTypes';
import NavType from 'utils/NavType';
import { MapPageMode } from '.';
import React from 'react';
import { googleReverseGeocode } from 'redux/slices/googleSlice';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { IconButton } from 'native-base';
import { Ionicons, Entypo } from '@expo/vector-icons';

type MapModeProps = {
  setPageMode: React.Dispatch<React.SetStateAction<MapPageMode>>,
};
function MapMode({ setPageMode }: MapModeProps) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavType>();
  const { latitude, longitude } = useAppSelector((state) => state.connection);

  return (
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
          shadowColor: '#171717',
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        }}
        onPress={() => {
          navigation.navigate(StackRoutes.FILTER);
        }}
      >
        <Ionicons name='filter-sharp' size={35} color='black' style={{ paddingTop: 5 }}/>
      </AppButton>
      <AppButton
        // Add location
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
        onPress={() => {
          dispatch(googleReverseGeocode({ 
            latitude,
            longitude,
          }));
          setPageMode('AddLocation');
        }}
      >
        <Entypo name='plus' size={30} color='black' style={{ paddingTop: 5 }}/>
      </AppButton>
    </>
  );
}

export default MapMode;
