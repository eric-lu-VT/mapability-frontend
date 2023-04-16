import AppButton from 'components/AppButton';
import { MapPageMode } from '.';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import { StackRoutes } from 'nav/routeTypes';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { resetGooglePlace } from 'redux/slices/googleSlice';
import { View, Text } from 'native-base';
import TextStyles from '../../utils/TextStyles';
import { fonts } from '../../utils/constants';

type AddLocationModeProps = {
  setPageMode: React.Dispatch<React.SetStateAction<MapPageMode>>,
};
function AddLocationMode({ setPageMode }: AddLocationModeProps) {
  const navigation = useNavigation<NavType>();
  const dispatch = useAppDispatch();
  const googleInfo = useAppSelector((state) => state.google);
  return (
    <>
      <View
        style={{
          position: 'absolute', top: '6.5%', left: 0, right: 0, justifyContent: 'center', alignItems: 'center',
        }}
      >
        <View
          style={{
            borderRadius: 15,
            paddingVertical: 15,
            paddingHorizontal: 20,
            marginTop: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            width: 350,
            backgroundColor: '#D9D9D9',
          }}
        >
          <Text
            style={{
              ...TextStyles.subTitle,
              alignSelf: 'center',
              fontFamily: fonts.semiBold,
              fontSize: 18,
            }}
            numberOfLines={1}
          >
            {googleInfo.name}
          </Text>
        </View>
      </View>
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
          dispatch(resetGooglePlace());
          setPageMode('MainMap');
        }}
      />
    </>
  );
}

export default AddLocationMode;
