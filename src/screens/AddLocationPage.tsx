import AppButton from 'components/AppButton';
import React, { useState, useEffect, useRef } from 'react';
import { FlatList, StyleSheet, Image, Pressable, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import { StackRoutes } from 'nav/routeTypes';
import Form from 'components/Form';
import { Ionicons } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { BackButton } from 'components/NavButtons';
import FormatStyle from 'utils/FormatStyle';
import { IBathroom } from 'types/bathrooms';
import { genStyles } from 'styles';
import BaseView from 'components/BaseView';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { View, HStack, Text, VStack } from 'native-base';
import { fonts } from 'utils/constants';

const AddLocationPage = () => {
  const [resource, setResource] = useState<Omit<IBathroom, 'id' | 'location'>>({
    name: ' ',
    // TODO: Add location
    description: ' ',
    unisex: false,
    levels: [],
    hasElevatorAccess: false,
    hasGrabBars: false,
    isSingleUse: false,
    buildingRampAccess: false,
    changingTable: false,
    accessibleDoor: false,
    hasMenstrualProducts: false,
  });

  const RESOURCE_NAMES = ['Bathroom', 'Elevator', 'Ramp', 'Parking'];

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
          Add Location
        </Text>
        <Form resource={resource} setResource={(newResource)=> {
          setResource(newResource);
        }} />
      </View>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 20,
    marginTop: 60,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
  column: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEE',
    height: 80,
    width: 80,
    marginRight: 10,
    borderRadius: 40,
  },
  twoColumns: {
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
  },
  resource: {
    position: 'absolute',
    borderRadius: 50,
    height: 40,
    width: 40,
  },
});

export default AddLocationPage;
