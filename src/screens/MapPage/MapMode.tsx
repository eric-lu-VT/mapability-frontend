import { useNavigation } from '@react-navigation/native';
import AppButton from 'components/AppButton';
import { StackRoutes } from 'nav/routeTypes';
import NavType from 'utils/NavType';
import { MapPageMode } from '.';
import React from 'react';
import { googleReverseGeocode } from 'redux/slices/googleSlice';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';

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
          dispatch(googleReverseGeocode({ 
            latitude,
            longitude,
          }));
          setPageMode('AddLocation');
        }}
      />
    </>
  );
}

export default MapMode;
