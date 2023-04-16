import { Ionicons } from '@expo/vector-icons';
import AppButton from 'components/AppButton';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { FilterState, setFilter } from 'redux/slices/filterSlice';

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
      <Text>{name}</Text>
    </View>
  );
}

function FilterPage() {
  const dispatch = useAppDispatch();

  const filter = useAppSelector((state) => state.filter);
  const updateFilter = (newFilterState: Partial<FilterState>) => dispatch(setFilter({ filter, newFilterState }));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Filter</Text>

      <View style={styles.sectionContainer}>
        <Text style={styles.subsectionHeader}>Resources</Text>
        <View style={styles.resourceSelectContainer}>
          {
            ResourceTypes.map((resource: string) => <ResourceSelect name={resource} />)
          }
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.subsectionHeader}>Accessibility Score</Text>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.subsectionHeader}>Location</Text>

        <View style={styles.locationInputContainer}>
          <Text style={styles.locationSectionItem}>Within</Text>
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
          <Text style={styles.locationSectionItem}>of</Text>
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
        </View>
      </View>
    </View >
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
