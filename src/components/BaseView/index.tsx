import React from 'react';
import { View, StyleSheet, Dimensions, StyleProp, ViewStyle, Pressable } from 'react-native';
import { Text, useDisclose, Actionsheet } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { Overlay } from 'react-native-elements';
import useIsLoading from 'hooks/useIsLoading';
import FormatStyle from 'utils/FormatStyle';
import { fonts } from 'utils/constants';
import Colors from 'utils/Colors';
import TextStyles from 'utils/TextStyles';
import { Ionicons } from '@expo/vector-icons';
import useAppDispatch from 'hooks/useAppDispatch';
import { logout } from 'redux/slices/authSlice';

const BaseView = ({ 
  children, 
  style,
  showTopRightIcon,
}: { children: React.ReactNode, style?: StyleProp<ViewStyle>, showTopRightIcon?: boolean }) => {

  const dispatch = useAppDispatch();
  const {
    isOpen,
    onOpen,
    onClose,
  } = useDisclose();

  return (
    <View style={[FormatStyle.container, style]}>
      <LinearGradient colors={['#00BF7D', '#00B4C5', '#0073E6', '#2546F0']} style={styles.imageBackground}>
        {showTopRightIcon && (
          <Pressable style={{ position: 'absolute', top: 60, right: 20, zIndex: 200 }} onPress={onOpen}>
            <Ionicons name="ellipsis-vertical-outline" size={20} color="white" />
          </Pressable>
        )}
        {children}
      </LinearGradient>
      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item onPress={() => dispatch(logout({}))}>
            <Text style={{ color: Colors.primary, fontFamily: fonts.semiBold, fontSize: 16 }}>Log out</Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  logo: {
    position: 'absolute',
    top: 60,
  },
  rings: {
    position: 'absolute',
    bottom: Dimensions.get('screen').height * 0.2,
  },
});

export default BaseView;
