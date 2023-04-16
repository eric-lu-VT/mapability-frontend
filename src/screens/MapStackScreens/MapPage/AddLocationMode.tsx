import AppButton from 'components/AppButton';
import { MapPageMode } from '.';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import { StackRoutes } from 'nav/routeTypes';

type AddLocationModeProps = {
  setPageMode: React.Dispatch<React.SetStateAction<MapPageMode>>,
};
function AddLocationMode({ setPageMode }: AddLocationModeProps) {
  const navigation = useNavigation<NavType>();
  return (
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
          setPageMode('MainMap');
          navigation.navigate(StackRoutes.ADD_LOC);
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
          setPageMode('MainMap');
        }}
      />
    </>
  );
}

export default AddLocationMode;
