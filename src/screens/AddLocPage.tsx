import AppButton from 'components/AppButton';
import { Checkbox } from 'native-base';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { genStyles } from 'styles';

const ResourceTypes = ['Bathroom', 'Parking Lot', 'Elevator', 'Ramp'];
type ResourceType = 'bathroom' | 'parking' | 'elevator' | 'ramp';

type ResourceSelectProps = {
  name: string,
  selectResource: (item: ResourceType) => void,
};
const ResourceSelect = ({ name, selectResource }: ResourceSelectProps) => {
  return (
    <View style={{
      width: '35%',
      alignItems: 'center',
    }}>
      <AppButton
        title=''
        onPress={() => {
          selectResource(name as ResourceType);
        }}
        style={{
          width: 100,
          height: 100,
          margin: 0,
          borderRadius: 100,
        }}
      >
      </AppButton>
      <Text>{name}</Text>
    </View>
  );
};

type FormRowProps = {
  text: string,
  val: boolean,
  setVal: React.Dispatch<React.SetStateAction<boolean>>,
};
const FormRow = ({ text, val, setVal }: FormRowProps) => {
  return <View style={styles.row}>
    <Text style={styles.fieldTitle}>{text}</Text>
    <Checkbox
      style={styles.check}
      value=''
      isChecked={val}
      onChange={() => {
        setVal((a) => !a);
      }}
    />
  </View>;
};

function AddLocPage() {
  const [selectedResource, setSelectResource] = useState<ResourceType | undefined>();

  const [isUnisex, setUnisex] = useState<boolean>(false);
  const [hasElevator, setHasElevator] = useState<boolean>(false);
  const [hasGrabBars, setHasGrabBars] = useState<boolean>(false);
  const [isSingleUse, setIsSingleUse] = useState<boolean>(false);
  const [hasRamp, setHasRamp] = useState<boolean>(false);
  const [hasChangingTable, setHasChangingTable] = useState<boolean>(false);
  const [hasDoor, setHasDoor] = useState<boolean>(false);
  const [hasMenstrual, setHasMenstrual] = useState<boolean>(false);

  const selectResource = (item: ResourceType) => setSelectResource(item);

  return <ScrollView style={genStyles.container}>
    <Text style={genStyles.header}>Add Location</Text>
    <ScrollView
      style={{
        flexDirection: 'row',
      }}
      horizontal={true}
    >
      {
        ResourceTypes.map((item) => <ResourceSelect name={item} selectResource={selectResource} key={item} />)
      }
    </ScrollView>

    <FormRow text='Gender neutral?' val={isUnisex} setVal={setUnisex} />
    <FormRow text='Elevator accessible?' val={hasElevator} setVal={setHasElevator} />
    <FormRow text='Has grab bars?' val={hasGrabBars} setVal={setHasGrabBars} />
    <FormRow text='Single use?' val={isSingleUse} setVal={setIsSingleUse} />
    <FormRow text='Ramp accessible?' val={hasRamp} setVal={setHasRamp} />
    <FormRow text='Changing table?' val={hasChangingTable} setVal={setHasChangingTable} />
    <FormRow text='Accessible door?' val={hasDoor} setVal={setHasDoor} />
    <FormRow text='Has menstrual products?' val={hasMenstrual} setVal={setHasMenstrual} />
  </ScrollView>;
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 24,
  },
  fieldTitle: {
    fontSize: 14,
    maxWidth: 300,
  },
  check: {
    width: 30,
    height: 30,
  },
  inputs: {
    width: 250,
  },
});

export default AddLocPage;
