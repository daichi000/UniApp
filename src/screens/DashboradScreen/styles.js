import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: '100%',
    padding: 24,
    backgroundColor: '#fff',
},
input: {
    backgroundColor: '#eee',
    height: 48,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 8,
},
button: {
    backgroundColor: '#E31676',
    height: 48,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
},
buttonTitle: {
    color: '#fff',
    fontSize: 18,
},
title: {
    fontSize: 28,
    alignSelf: 'center',
    marginBottom: 24,
},
signup: {
    marginTop: 16,
    alignSelf: 'center',
},
signupText: {
    fontSize: 16
}
});

export default styles;
