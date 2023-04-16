import React, { useState, useEffect } from 'react';
import BaseView from 'components/BaseView';
import { Text, View } from 'native-base';
import { fonts } from 'utils/constants';
import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';
import AppTextInput from 'components/AppTextInput';
import { updateUser } from 'redux/slices/usersSlice';
import AppButton from 'components/AppButton';
import Colors from 'utils/Colors';

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { id, name } = useAppSelector((state) => state.auth);

  const [newName, setNewName] = useState(name);
  const [errors, setErrors] = useState({
    newName: '',
  });

  const handleSubmit = async () => {
    // Send only if all fields filled in
    if (!newName) setErrors((e) => { return { ...e, newName: 'Please enter a new name address.' }; });

    if (newName) {
      await dispatch(updateUser({ id, name: newName }));
    }
  };

  return (
    <BaseView logoText={'temp'}>
      <Text color="white" fontSize={24} fontFamily={fonts.medium}>
        Profile
      </Text>
      <Text fontSize={18} color="white">Name</Text>
      {/* <Text fontSize={18} color="white" alignContent='flex-end' marginLeft='265'>{firstName}</Text> */}
      <View style={{ width: '90%' }}>
        <AppTextInput
          onChangeText={(text) => setNewName(text)}
          value={newName}
          placeholder='Enter new name'
          errorText={errors.newName}
        />
        <AppButton
          onPress={handleSubmit}
          title={'Save Changes'}
          textColor='white'
          backgroundColor={Colors.primary}
          fullWidth
        />
      </View>
    </BaseView>
  );
};

export default ProfilePage;
