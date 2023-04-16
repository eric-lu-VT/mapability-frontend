import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { Text, Input, Stack, FormControl, Radio, Checkbox } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import AppButton from 'components/AppButton';
import { IBathroom } from 'types/bathrooms';
import { createBathroom } from 'redux/slices/bathroomsSlice';
import { fonts } from 'utils/constants';

type FormProps = {
  resource: Omit<IBathroom, 'id' | 'location'>;
  setResource: React.Dispatch<React.SetStateAction<Omit<IBathroom, 'id' | 'location'>>>;
};

export const Form: React.FC<FormProps> = ({ resource, setResource }) => {
  const dispatch = useAppDispatch();
  const { latitude, longitude } = useAppSelector((state) => state.connection);

  const handleSubmit = () => {
    dispatch(createBathroom({
      ...resource,
      location: {
        type: 'Point',
        coordinates: [longitude, latitude],
      },
    }));
  };

  return (
    <ScrollView
      style={{
        width: '100%',
      }}
    >
      <FormControl style={styles.container}>
        <View style={styles.row}>
          <Text color="white" fontSize={18} fontFamily={fonts.medium}>
            Name: 
          </Text>
          <TextInput
            style={{ width: 300, fontSize: 18, marginLeft: 10, color: 'white' }}
            placeholder='Name'
            maxLength={20}
            value={resource.name}
            onChangeText={(newText) =>
              setResource({ ...resource, name: newText })
            }
          />
        </View>
        <View style={styles.row}>
          <Text color="white" fontSize={18} fontFamily={fonts.medium}>
            Description: 
          </Text>
          <TextInput
            style={{ width: 250, fontSize: 18, marginLeft: 10 }}
            placeholder='Description'
            maxLength={20}
            value={resource.description}
            onChangeText={(newText) =>
              setResource({ ...resource, description: newText })
            }
          />
        </View>
        <View style={styles.row}>
          <Text color="white" fontSize={18} fontFamily={fonts.medium}>Gender Neutral? </Text>
          <Checkbox
            style={styles.check}
            value=''
            isChecked={resource.unisex}
            onChange={() => {
              setResource({ ...resource, unisex: !resource.unisex });
            }}
          />
        </View>

        <View style={styles.row}>
          <Text color="white" fontSize={18} fontFamily={fonts.medium}>
            Is this location elevator accessible?
          </Text>
          <Checkbox
            style={styles.check}
            value=''
            isChecked={resource.hasElevatorAccess}
            onChange={() => {
              setResource({
                ...resource,
                hasElevatorAccess: !resource.hasElevatorAccess,
              });
            }}
          />
        </View>

        <View style={styles.row}>
          <Text color="white" fontSize={18} fontFamily={fonts.medium}>Is this bathroom single use?</Text>
          <Checkbox
            style={styles.check}
            value=''
            isChecked={resource.isSingleUse}
            onChange={() => {
              setResource({ ...resource, isSingleUse: !resource.isSingleUse });
            }}
          />
        </View>

        <View style={styles.row}>
          <Text color="white" fontSize={18} fontFamily={fonts.medium}>Is the building ramp accessible?</Text>
          <Checkbox
            style={styles.check}
            value=''
            isChecked={resource.buildingRampAccess}
            onChange={() => {
              setResource({
                ...resource,
                buildingRampAccess: !resource.buildingRampAccess,
              });
            }}
          />
        </View>

        <View style={styles.row}>
          <Text color="white" fontSize={18} fontFamily={fonts.medium}>
            Does this bathroom have a changing table?
          </Text>
          <Checkbox
            style={styles.check}
            value=''
            isChecked={resource.changingTable}
            onChange={() => {
              setResource({
                ...resource,
                changingTable: !resource.changingTable,
              });
            }}
          />
        </View>

        <View style={styles.row}>
          <Text color="white" fontSize={18} fontFamily={fonts.medium}>
            Does this bathroom have an accessible door?
          </Text>
          <Checkbox
            style={styles.check}
            value=''
            isChecked={resource.accessibleDoor}
            onChange={() => {
              setResource({
                ...resource,
                accessibleDoor: !resource.accessibleDoor,
              });
            }}
          />
        </View>

        <View style={styles.row}>
          <Text color="white" fontSize={18} fontFamily={fonts.medium}>
            Does this bathroom have menstrual products?
          </Text>
          <Checkbox
            style={styles.check}
            value=''
            isChecked={resource.hasMenstrualProducts}
            onChange={() => {
              setResource({
                ...resource,
                hasMenstrualProducts: !resource.hasMenstrualProducts,
              });
            }}
          />
        </View>
        <AppButton
          onPress={() => handleSubmit()}
          title={'Add Location'}
          textColor='black'
          fullWidth
        />
      </FormControl>
    </ScrollView>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 100,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 50,
  },
  texty: {
    fontSize: 18,
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
