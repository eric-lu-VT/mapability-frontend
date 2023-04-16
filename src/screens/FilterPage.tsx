import { Ionicons } from '@expo/vector-icons';
import AppButton from 'components/AppButton';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { useState } from 'react';
import { StyleSheet, TextInput, Dimensions } from 'react-native';
import { FilterState, setFilter } from 'redux/slices/filterSlice';
import { BackButton } from 'components/NavButtons';
import BaseView from 'components/BaseView';
import { fonts } from 'utils/constants';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, HStack, Text, VStack } from 'native-base';

const ResourceTypes = ['Bathroom', 'Parking Lot', 'Elevator', 'Ramp'];

type ResourceSelectProps = {
  name: string,
};
function ResourceSelect({ name }: ResourceSelectProps) {
  const [isOn, setIsOn] = useState<boolean>(false);
  return (
    <View style={{
      width: '35%',
      alignItems: 'center',
    }}>
      <AppButton
        title=''
        onPress={() => {
          setIsOn((state) => !state);
        }}
        style={{
          width: '65%',
          height: '41%',
          margin: 0,
          borderRadius: 100,
        }}
      >
      </AppButton>
      <Text color="white" fontSize={12} fontFamily={fonts.medium} marginRight={3}>{name}</Text>
    </View>
  );
}

function FilterPage() {
  const dispatch = useAppDispatch();

  const filter = useAppSelector((state) => state.filter);
  const updateFilter = (newFilterState: Partial<FilterState>) => dispatch(setFilter({ filter, newFilterState }));

  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  return (
    <BaseView>
      <View style={{ position: 'absolute', top: 50, left: 20, zIndex: 100 }}>
        <TouchableHighlight onPress={goBack}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <AntDesign name='left' size={15} color='white' />
            <Text style={{
              color: 'white',
              fontFamily: 'Montserrat_400Regular',
              marginLeft: 3,
            }}>
              Back
            </Text>
          </View>
        </TouchableHighlight>
      </View>
      <View
        style={{
          height: '80%',
          width: Dimensions.get('window').width * 0.90,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
        <Text color="white" fontSize={24} fontFamily={fonts.medium}>
          Set Filters
        </Text>
        <Text color="white" fontSize={22} fontFamily={fonts.medium}>
          Resources
        </Text>
        <HStack>
          <ResourceSelect name={ResourceTypes[0]} />
          <ResourceSelect name={ResourceTypes[1]} />
          <ResourceSelect name={ResourceTypes[2]} />
        </HStack>
        <Text color="white" fontSize={22} fontFamily={fonts.medium}>
          Accessibility Score
        </Text>
        <HStack>
          <Text color="white" fontSize={18} fontFamily={fonts.medium} marginRight={3}>Location within</Text>
          <TextInput
            keyboardType='number-pad'
            style={[
              styles.locationSectionItem,
              styles.locationInputItem,
            ]}
            onChangeText={(text: string) => updateFilter({
              locationDist: parseInt(text),
            })}
          >
            300
          </TextInput>
          <Text color="white" fontSize={18} fontFamily={fonts.medium} marginRight={3}>of</Text>
          <TextInput
            style={[
              styles.locationSectionItem,
              styles.locationInputItem,
            ]}
            onChangeText={(text: string) => updateFilter({
              locationCoordinates: [-72, -45],
            })}
          >
            Your Location
          </TextInput>
        </HStack>
      </View>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 32,
    paddingTop: 64,
  },
  sectionContainer: {
    marginVertical: 24,
  },
  header: {
    fontSize: 32,
    width: '100%',
    textAlign: 'center',
  },
  subsectionHeader: {
    fontSize: 24,
    marginBottom: 16,
  },
  resourceSelectContainer: {
    flexDirection: 'row',
  },
  locationInputContainer: {
    flexDirection: 'row',
  },
  locationSectionItem: {
    marginEnd: 10,
  },
  locationInputItem: {
    borderBottomColor: '#333333',
    borderBottomWidth: 2,
  },
});

export default FilterPage;
