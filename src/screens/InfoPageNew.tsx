import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from 'utils/Colors';
import { FontAwesome } from '@expo/vector-icons';

type CommentProps = {
  text: string,
};
function Comment({ text }: CommentProps) {
  return (
    <View style={comStyle.commentContainer}>
      <View style={oldStyles.icon}>
        <Text style={oldStyles.text}>Thumbs Icon</Text>
      </View>
      <Text style={comStyle.commentText}>{text}</Text>
    </View>
  );
}

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

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Info</Text>

      <View style={styles.sectionContainer}>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.accessSubContainer}>
          <Text style={styles.accessText}>Was this bathroom accessible?</Text>

          <View style={styles.ratingContainer}>
            <TouchableOpacity
              onPress={onTapDown}
              style={[
                styles.ratingThumb,
                styles.rateDown,
              ]}
            >
              <FontAwesome name="thumbs-o-down" size={32} color="black" style={{
                transform: [{ scaleX: -1 }],
              }} />
            </TouchableOpacity>

            <View
              style={{
                height: '100%',
                width: 4,
              }}
            />

            <TouchableOpacity
              onPress={onTapUp}
              style={[
                styles.ratingThumb,
                styles.rateUp,
              ]}
            >
              <FontAwesome name="thumbs-o-up" size={32} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.sectionContainer}>
        <Text style={styles.subsectionHeader}>Details</Text>
      </View>

      <View style={styles.sectionContainer}>
        <View style={styles.commentHeaderContainer}>
          <Text style={styles.subsectionHeader}>Comments</Text>
          <Text>Add Comment</Text>
        </View>

        <View style={styles.cardContainer}>
          <Comment text='Beep' />
          <Comment text='Boop' />
          <Comment text='This is a really long comment. See how it looks' />
          <Comment text='This is an even longer comment. It might spill over into the next line.' />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 32,
    paddingTop: 64,
  },
  sectionContainer: {
    marginVertical: 24,
  },
  header: {
    fontSize: 32,
    width: '100%',
    textAlign: 'center',
  },
  subsectionHeader: {
    fontSize: 24,
    marginBottom: 16,
  },
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
});

const comStyle = StyleSheet.create({
  commentContainer: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  commentText: {
    right: 0,
    minWidth: 230,
    flexShrink: 1,
    fontSize: 14,
  },
});

const oldStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '10%',
    paddingTop: '20%',
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
  },
  row: {
    flexDirection: 'row',
    marginBottom: '40%',
  },
  header: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
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
  commentSectionHeader: {
    width: '100%',
    justifyContent: 'space-between',
  },
  commentCard: {
    width: '100%',
  },
  commentText: {
    flexGrow: 5,
  },
  rightJustify: {
    textAlign: 'right',
  },
});

export default InfoPage;
