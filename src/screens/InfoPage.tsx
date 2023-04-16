import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

type CommentProps = {
  text: string,
};
function Comment({ text }: CommentProps) {
  return (
    <View style={{
      width: '100%',
      flexDirection: 'row',
      paddingVertical: 10,
      alignItems: 'center',
    }}>
      <View style={styles.icon}>
        <Text style={styles.text}>Thumbs Icon</Text>
      </View>
      <View style={{
        width: 'auto',
      }}>
        <Text style={{
          right: 0,
          backgroundColor: '#000000',
        }}>{text}</Text>
      </View>
    </View>
  );
}

function InfoPage() {
  return (
    <View style={styles.container}>
      <Text style={[styles.headerText, {
        width: '100%',
        textAlign: 'center',
      }]}>
        Info
      </Text>

      <View style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around',
      }}>
        <View style={styles.column}>
          <View style={styles.icon}>
            <Text style={styles.text}>Bathroom Icon</Text>
          </View>
          <Text style={styles.text}>Bathroom</Text>
        </View>
        <View style={styles.column}>
          <View style={styles.icon}>
            <Text style={styles.text}>Score Icon</Text>
          </View>
          <Text style={styles.text}>Accessibility Score</Text>
        </View>
      </View>

      <View style={{
        position: 'relative',
        width: '100%',
      }}>
        <Text style={{
          position: 'absolute',
          left: 0,
          right: '50%',
          textAlign: 'right',
        }}>Was this bathroom accessible?</Text>
        <View style={{
          position: 'absolute',
          left: '50%',
          right: 0,
          flexDirection: 'row',
        }}>
          <View style={styles.icon}>
            <Text style={styles.text}>Thumbs Icon</Text>
          </View>
          <View style={styles.icon}>
            <Text style={styles.text}>Thumbs Icon</Text>
          </View>
        </View>
      </View>

      <View style={[styles.row, styles.twoColumns]}>
        <Text style={styles.text}>Row 3, Column 1</Text>
        <Text style={styles.text}>Row 3, Column 2</Text>
      </View>

      <View style={[styles.row, styles.commentSectionHeader]}>
        <Text style={styles.text}> Comments </Text>
        <Text style={[styles.text, styles.icon]}>Add Comment Icon</Text>
      </View>

      <Comment text='beepboop' />
      <Comment text='beepboop' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: '10%',
    paddingTop: '20%',
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
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
