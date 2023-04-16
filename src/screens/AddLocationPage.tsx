import AppButton from "components/AppButton";
import React, { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, StyleSheet, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavType from "utils/NavType";
import { StackRoutes } from "nav/routeTypes";
import Form from "components/Form";
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from "react-native-gesture-handler";

export type Resource = {
  name: string;
  // TODO: Add location
  description: string;
  unisex: boolean;
  isAccessible: boolean;
  levels: number[];
  hasElevatorAccess: boolean;
  isSingleUse: boolean;
  buildingRampAccess: boolean;
  changingTable: boolean;
  accessibleDoor: boolean;
  hasMentstrualProducts: boolean;
  reviews: string[];
};
const AddLocationPage = () => {
  const [resource, setResource] = useState<Resource>({
    name: "",
    // TODO: Add location
    description: "",
    unisex: false,
    isAccessible: false,
    levels: [],
    hasElevatorAccess: false,
    isSingleUse: false,
    buildingRampAccess: false,
    changingTable: false,
    accessibleDoor: false,
    hasMentstrualProducts: false,
    reviews: [],
  });

  const resourceNames = ["Bathroom", "Elevator", "Ramp", "Parking"];

  const navigation = useNavigation<NavType>();
  return (
    <View style={styles.container}>
      <Pressable
        // Back button
        onPress={() => {
          navigation.navigate(StackRoutes.MAP);
        }}
        style={{
          position: "absolute",
          borderRadius: 20,
          height: 100,
          width: 100,
          top: 0,
          left: 15,
          margin: 0,
        }}
      >
        <Ionicons name="chevron-back" size={24} color="black" />
      </Pressable>

      <View style={styles.row}>
        <Text style={styles.headerText}>Add Location</Text>
      </View>

      <View style={styles.row}>
        <Form resource={resource} setResource={(newResource)=> {
          console.log(newResource.name)
          setResource(newResource);
        }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    padding: 20,
    marginTop: 60,
  },
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%"
  },
  column: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEE",
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EEE",
    height: 80,
    width: 80,
    marginRight: 10,
    borderRadius: 40,
  },
  twoColumns: {
    justifyContent: "space-between",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  resource: {
    position: "absolute",
    borderRadius: 50,
    height: 40,
    width: 40,
  },
});

export default AddLocationPage;
