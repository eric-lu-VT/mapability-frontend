import { useState } from 'react';
import { StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from 'utils/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { genStyles } from '../styles';
import { BackButton } from 'components/NavButtons';
import useAppSelector from 'hooks/useAppSelector';
import useAppDispatch from 'hooks/useAppDispatch';
import { useNavigation } from '@react-navigation/native';
import NavType from 'utils/NavType';
import { StackRoutes } from 'nav/routeTypes';
import { RootStackParamList } from 'utils/NavType';
import { View, HStack, Text, VStack } from 'native-base';
import FormatStyle from 'utils/FormatStyle';
import BaseView from 'components/BaseView';
import { fonts } from 'utils/constants';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';

type Rating = 'up' | 'down' | 'none';

function InfoPage() {
  const [rating, setRating] = useState<Rating>('none');

  const onTapUp = () => {
    if (rating == 'up') setRating('none');
    else setRating('up');
  };

  const onTapDown = () => {
    if (rating == 'down') setRating('none');
    else setRating('down');
  };

  const allReviews = useAppSelector((state) => state.reviews.all);
  const allBathrooms = useAppSelector((state) => state.bathrooms.all);
  const selectedBathroomId = useAppSelector((state) => state.bathrooms.selectedBathroomId);
  const filteredReviews = Object.values(allReviews)
    .filter((review) => review.bathroomId === selectedBathroomId);

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
          {allBathrooms[selectedBathroomId].name}
        </Text>
        <HStack
          paddingTop={5}
        >
          <View
            maxW={'50%'}
            paddingRight={5}
          >
            <Text color="white" fontSize={18} fontFamily={fonts.medium}>
              Was this bathroom accessible?
            </Text>
          </View>
          <HStack
            maxW={'50%'}
            paddingLeft={5}
          >
            <TouchableOpacity
              onPress={onTapDown}
              style={[
                styles.ratingThumb,
                styles.rateDown,
              ]}
            >
              <FontAwesome name="thumbs-o-down" size={16} color="black" style={{
                transform: [{ scaleX: -1 }],
              }} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onTapUp}
              style={[
                styles.ratingThumb,
                styles.rateUp,
              ]}
            >
              <FontAwesome name="thumbs-o-up" size={16} color="black" />
            </TouchableOpacity>
          </HStack>
        </HStack>
        <VStack>
          <Text color="white" fontSize={18} fontFamily={fonts.medium} paddingTop={5}>
            Elevator access? { allBathrooms[selectedBathroomId].hasElevatorAccess ? 'Yes' : 'No' }
          </Text>
          <Text color="white" fontSize={18} fontFamily={fonts.medium} paddingTop={5}>
            Grab bars? { allBathrooms[selectedBathroomId].hasGrabBars ? 'Yes' : 'No' }
          </Text>
          <Text color="white" fontSize={18} fontFamily={fonts.medium} paddingTop={5}>
            Single use? { allBathrooms[selectedBathroomId].isSingleUse ? 'Yes' : 'No' }
          </Text>
          <Text color="white" fontSize={18} fontFamily={fonts.medium} paddingTop={5}>
            Ramp access? { allBathrooms[selectedBathroomId].buildingRampAccess ? 'Yes' : 'No' }
          </Text>
          <Text color="white" fontSize={18} fontFamily={fonts.medium} paddingTop={5}>
            Changing table? { allBathrooms[selectedBathroomId].changingTable ? 'Yes' : 'No' }
          </Text>
          <Text color="white" fontSize={18} fontFamily={fonts.medium} paddingTop={5}>
            Unisex Stalls? { allBathrooms[selectedBathroomId].unisex ? 'Yes' : 'No' }
          </Text>
          <Text color="white" fontSize={18} fontFamily={fonts.medium} paddingTop={5}>
            Menstrual products? { allBathrooms[selectedBathroomId].hasMenstrualProducts ? 'Yes' : 'No' }
          </Text>
        </VStack>
        <Text color="white" fontSize={24} fontFamily={fonts.medium} paddingTop={5}>
          Reviews
        </Text>
        {
          filteredReviews.length === 0 &&
          <Text color="white" fontSize={18} fontFamily={fonts.medium}>
            No reviews avaiable :(
          </Text>
        }
        <FlatList
          data={filteredReviews}
          renderItem={({ item }) => {
            return (
              <>
                <View
                  style={styles.subContainer}
                >
                  {
                    (item.rating > 0) ?
                      <FontAwesome name="thumbs-o-up" size={60} color="black" />
                      :
                      <FontAwesome name="thumbs-o-down" size={60} color="black" style={{
                        transform: [{ scaleX: -1 }],
                      }} />
                  }
                  <View
                    style={styles.subItemR}
                  >
                    <Text
                      style={{
                        color: Colors.white,
                      }}
                    >
                      {item.comment}
                    </Text>
                  </View>
                </View>
              </>
            );
          }}
          numColumns={1}
        />
      </View>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  accessSubContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  accessText: {
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  ratingThumb: {
    backgroundColor: '#cccccc',
    padding: 20,
  },
  rateUp: {
    borderTopRightRadius: 1000,
    borderBottomRightRadius: 1000,
  },
  rateDown: {
    borderTopLeftRadius: 1000,
    borderBottomLeftRadius: 1000,
  },
  commentHeaderContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  cardContainer: {
    flexDirection: 'column',
    width: '100%',
    backgroundColor: Colors.gray,
    paddingVertical: 10,
    borderRadius: 24,
  },
  subContainer: {
    flex: -1, 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    width: '100%',
    padding: 10,
  },
  subItemL: {
    width: '20%',
  },
  subItemR: {
    width: '80%',
    flexDirecction: 'column',
    paddingLeft: 25,
  },
  horizontalLine: {
    borderBottomColor: Colors.blueBlack,
    borderBottomWidth: 1,
    width: Dimensions.get('window').width * 0.90,
  },
});

export default InfoPage;
