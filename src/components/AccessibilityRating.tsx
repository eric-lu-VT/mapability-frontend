import { FontAwesome } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type Rating = 'up' | 'down' | 'none';

function AccessibilityRating() {
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
  )
}

const styles = StyleSheet.create({
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
}
})

export default AccessibilityRating;
