import { useNavigation } from '@react-navigation/native';
import AppButton from 'components/AppButton';
import { StackRoutes } from 'nav/routeTypes';
import NavType from 'utils/NavType';
import { MapPageMode } from '.';
import React from 'react';

type MapModeProps = {
  setPageMode: React.Dispatch<React.SetStateAction<MapPageMode>>,
};
function MapMode({ setPageMode }: MapModeProps) {
  const navigation = useNavigation<NavType>();
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
          setPageMode('AddLocation');
        }}
      />
    </>
  );
}

export default MapMode;
