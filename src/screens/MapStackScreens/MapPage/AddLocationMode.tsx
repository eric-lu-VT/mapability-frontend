import AppButton from 'components/AppButton';
import { MapPageMode } from '.';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import { StackRoutes } from 'nav/routeTypes';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';

type AddLocationModeProps = {
  setPageMode: React.Dispatch<React.SetStateAction<MapPageMode>>,
};
function AddLocationMode({ setPageMode }: AddLocationModeProps) {
  const navigation = useNavigation<NavType>();
  const googleInfo = useAppSelector((state) => state.google);
  return (
    <>
      <AppButton
        //Filters
        title={googleInfo.name}
        disabled={true}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '7.5%',
          backgroundColor: '#D9D9D9',
          borderRadius: 50,
          height: 70,
          width: 350,
        }}
        onPress={() => {}}
      />
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
          navigation.navigate(StackRoutes.ADD_LOC);
        }}
      />
    </>
  );
}

export default AddLocationMode;
