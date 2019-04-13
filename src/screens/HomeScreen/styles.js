import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

const styles = StyleSheet.create({

  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center' },
  title: { flex: 1, backgroundColor: '#f6f8fa'},
  titleText: { marginRight: 6, textAlign:'right' },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { marginLeft: 5 },
  row: {  flexDirection: 'row' },
  cell: {flex: 2},
  cellFirst: {flex: 2},
});

export default styles;
