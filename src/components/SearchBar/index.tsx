import React from 'react';
import { Input, Text } from 'native-base';
import Colors from 'utils/Colors';
import { KeyboardTypeOptions, TextInputIOSProps, GestureResponderEvent, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface SearchBarProps {
  onChangeText: (text: string) => void
  value: string
  placeholder: string
  secureTextEntry?: boolean
  errorText?: string
  textContentType?: TextInputIOSProps['textContentType']
  keyboardType?: KeyboardTypeOptions
  onPress?: (event: GestureResponderEvent) => void
}

const SearchBar = ({ onChangeText, errorText, value, placeholder, secureTextEntry, textContentType, keyboardType, onPress }: SearchBarProps) => (
  <>
    <Input
      onChangeText={(val) => onChangeText(val)}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={Colors.darkGray}
      paddingLeft={5}
      backgroundColor={Colors.midGray}
      color={Colors.blueBlack}
      secureTextEntry={(secureTextEntry === null || secureTextEntry === undefined) ? false : secureTextEntry}
      my={1}
      variant="underlined"
      focusOutlineColor={Colors.primary}
      fontSize={14}
      textContentType={textContentType}
      keyboardType={keyboardType}
      borderRadius={15}
      rightElement={
        <TouchableOpacity
          onPress={onPress}
        >
          <AntDesign 
            name={'search1'} 
            size={15} 
            color={Colors.darkGray}
            style={{
              paddingRight: 15,
            }}
          />
        </TouchableOpacity>
      }
    />
    <Text color="red.500" fontSize={14}>{errorText || ' '}</Text>
  </>
);

export default SearchBar;