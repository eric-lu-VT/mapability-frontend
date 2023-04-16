import { StyleSheet } from 'react-native';

const genStyles = StyleSheet.create({
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
});

export {
  genStyles,
};
