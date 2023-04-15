import React, { useState } from 'react';
import { Button, Dimensions, ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Box, Text, VStack } from 'native-base';
import useAppSelector from '../../../hooks/useAppSelector';
import useAppDispatch from '../../../hooks/useAppDispatch';
import {
  getAllResources,
  createResource,
  updateResource,
  deleteResource,
} from '../../../redux/slices/resourcesSlice';
import { IResource } from 'types/resources';
import Accordion from '../../../components/Accordion';
import AppTextInput from '../../../components/AppTextInput';
import AppButton from '../../../components/AppButton';
import FormatStyle from '../../../utils/FormatStyle';
import TextStyles from '../../../utils/TextStyles';
import BaseView from 'components/BaseView';
import { fonts } from 'utils/constants';

const ResourcesPage = () => {
  const { loading, all } = useAppSelector((state) => state.resources);
  const dispatch = useAppDispatch();

  const [createTitle, setCreateTitle] = useState<string>('');
  const [createDescription, setCreateDescription] = useState<string>('');
  const [createValue, setCreateValue] = useState<string>('');
  const handleCreateResourceSubmit = () => {
    // Send only if all fields filled in
    if (!createTitle) alert('Please enter a title!');
    else if (!createDescription) alert('Please enter a description!');
    else if (!createValue) alert('Please enter a value!');
    else {
      dispatch(createResource({ title: createTitle, description: createDescription, value: parseFloat(createValue) }));
    }
  };

  const [updateId, setUpdateId] = useState<string>('');
  const [updateTitle, setUpdateTitle] = useState<string>('');
  const [updateDescription, setUpdateDescription] = useState<string>('');
  const [updateValue, setUpdateValue] = useState<string>('');
  const handleUpdateResourceSubmit = () => {
    if (!updateId) alert('Please enter a id!');
    if (!updateTitle) alert('Please enter a title!');
    else if (!updateDescription) alert('Please enter a description!');
    else if (!updateValue) alert('Please enter a value!');
    else {
      dispatch(updateResource({ id: updateId, title: updateTitle, description: updateDescription, value: parseFloat(updateValue) }));
    }
  };

  const [deleteId, setDeleteId] = useState<string>('');
  const handleDeleteResourceSubmit = () => {
    if (!deleteId) alert('Please enter a id!');
    else {
      dispatch(deleteResource({ id: deleteId }));
    }
  };

  return (
    <BaseView smallLogo showTopRightIcon logoText={'temp'}>
      <VStack height='100%' pt={150}>
        <Text color='white' fontSize={24} fontFamily={fonts.medium}>
          Resources
        </Text>
        <ScrollView contentContainerStyle={{ maxWidth: '100%', width: '100%' }}>
          { loading
            ? <Text>Loading...</Text>
            : (
              <>
                <Accordion
                  title='All Resources'
                >
                  <View style={FormatStyle.innerContainer}>
                    <AppButton
                      onPress={() => dispatch(getAllResources({}))}
                      title={'Get All Resources'}
                    />
                    {
                      Object.values(all).map((r: IResource) => <Text key={r.id} style={TextStyles.regular}>{r.id}, {r.title}, {r.description}, {r.value}</Text>)
                    }
                  </View>
                </Accordion>
                <Accordion
                  title='Create Resource'
                >
                  <View style={FormatStyle.innerContainer}>
                    <AppTextInput
                      onChangeText={(text) => setCreateTitle(text)}
                      value={createTitle}
                      placeholder='Title...'
                    />
                    <AppTextInput
                      onChangeText={(text) => setCreateDescription(text)}
                      value={createDescription}
                      placeholder='Description...'
                    />
                    <AppTextInput
                      onChangeText={(text) => setCreateValue(text)}
                      value={createValue}
                      placeholder='Value...'
                    />
                    <AppButton
                      onPress={handleCreateResourceSubmit}
                      title={'Create Resource'}
                    />
                  </View>
                </Accordion>
                <Accordion
                  title='Update Resource'
                >
                  <View style={FormatStyle.innerContainer}>
                    <AppTextInput
                      onChangeText={(text) => setUpdateId(text)}
                      value={updateId}
                      placeholder='id...'
                    />
                    <AppTextInput
                      onChangeText={(text) => setUpdateTitle(text)}
                      value={updateTitle}
                      placeholder='Title...'
                    />
                    <AppTextInput
                      onChangeText={(text) => setUpdateDescription(text)}
                      value={updateDescription}
                      placeholder='Value...'
                    />
                    <AppTextInput
                      onChangeText={(text) => setUpdateValue(text)}
                      value={updateValue}
                      placeholder='Description...'
                    />
                    <AppButton
                      onPress={handleUpdateResourceSubmit}
                      title={'Update Resource'}
                    />
                  </View>
                </Accordion>
                <Accordion
                  title='Delete Resource'
                >
                  <View style={FormatStyle.innerContainer}>
                    <AppTextInput
                      onChangeText={(text) => setDeleteId(text)}
                      value={deleteId}
                      placeholder='id...'
                    />
                    <AppButton
                      onPress={handleDeleteResourceSubmit}
                      title={'Delete Resource'}
                    />
                  </View>
                </Accordion>
              </>
            )
          }
        </ScrollView>
      </VStack>
    </BaseView>
  );
};

export default ResourcesPage;
