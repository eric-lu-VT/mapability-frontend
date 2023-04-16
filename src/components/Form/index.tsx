import React, { useState } from "react";
import { TextInput, Text, View } from "react-native";
import { Input, Stack, FormControl, Radio, Checkbox } from "native-base";
import { Resource } from "screens/AddLocationPage";
import { ScrollView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

type FormProps = {
  resource: Resource;
  setResource: React.Dispatch<React.SetStateAction<Resource>>;
};

export const Form: React.FC<FormProps> = ({ resource, setResource }) => {
  return (
    <ScrollView>
      <FormControl style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.texty}>Is this location accessible?</Text>
          <Checkbox
            style={styles.check}
            value="your mom"
            isChecked={resource.isAccessible}
            onChange={() => {
              setResource({
                ...resource,
                isAccessible: !resource.isAccessible,
              });
            }}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.texty}>Name: </Text>
          <TextInput
            style={{width: 300, fontSize: 18}}
            placeholder="Name"
            maxLength={20}
            value={resource.name}
            onChangeText={(newText) =>
              setResource({ ...resource, name: newText })
            }
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.texty}>Description: </Text>
          <TextInput
            style={{width: 250, fontSize: 18}}
            placeholder="Description"
            maxLength={20}
            value={resource.description}
            onChangeText={(newText) =>
              setResource({ ...resource, description: newText })
            }
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.texty}>Gender Neutral? </Text>
          <Checkbox
            style={styles.check}
            value="your mom"
            isChecked={resource.unisex}
            onChange={() => {
              setResource({ ...resource, unisex: !resource.unisex });
            }}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.texty}>
            Is this location elevator accessible?
          </Text>
          <Checkbox
            style={styles.check}
            value="your mummy"
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
          <Text style={styles.texty}>Is this bathroom single use?</Text>
          <Checkbox
            style={styles.check}
            value="tomara ma"
            isChecked={resource.isSingleUse}
            onChange={() => {
              setResource({ ...resource, isSingleUse: !resource.isSingleUse });
            }}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.texty}>Is the building ramp accessible?</Text>
          <Checkbox
            style={styles.check}
            value="aapki ummi"
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
          <Text style={styles.texty}>
            Does this bathroom have a changing table?
          </Text>
          <Checkbox
            style={styles.check}
            value="teri maa"
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
          <Text style={styles.texty}>
            Does this bathroom have an accessible door?
          </Text>
          <Checkbox
            style={styles.check}
            value="your mum"
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
          <Text style={styles.texty}>
            Does this bathroom have menstrual products?
          </Text>
          <Checkbox
            style={styles.check}
            value="your mother"
            isChecked={resource.hasMentstrualProducts}
            onChange={() => {
              setResource({
                ...resource,
                hasMentstrualProducts: !resource.hasMentstrualProducts,
              });
            }}
          />
        </View>
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
    flexDirection: "row",
    justifyContent: "space-between",
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
