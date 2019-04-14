import React, {Component} from 'react';
import {
  View,
  ScrollView,
  RefreshControl,
  Share,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { WebBrowser } from 'expo';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

/* from app */
import FlatList from 'app/src/components/FlatList';
import Item from 'app/src/components/Item';
import Text from 'app/src/components/Text';
// import firebase from 'app/src/firebase';
import firebase from 'firebase';
import GA from 'app/src/analytics';
import I18n from 'app/src/i18n';
import styles from './styles';
import MainTab from 'app/src/navigation/MainTabNavigator';

// @withNavigationFocus
// @connect(state => ({
//   currentScreen: state.screen,
// }))

export default class SignupScreen extends React.Component {
  static navigationOptions = () => ({
    headerTitle: I18n.t('Signup.title'),
  })

  state = {
    email: 'user1@example.com',
    password: 'password',
  }

  handleSubmit(){
    // SignUp
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(() => {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home' })
                ],
            });
            this.props.navigation.dispatch(resetAction);
        })
        .catch((error) => {
            console.log(error);
        });
  }

  handlePress() {
      this.props.navigation.navigate('Signup');
  }

  render() {
    return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={this.state.email}
                onChangeText={(text) => {this.setState({email: text}); }}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Email Address"
            />
            <TextInput
                style={styles.input}
                value={this.state.password}
                onChangeText={(text) => {this.setState({password: text}); }}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Password"
                secureTextEntry
            />
            <TouchableHighlight style={styles.button} onPress={this.handleSubmit.bind(this)} underlayColor="#C70F66">
                <Text style={styles.buttonTitle}>送信する</Text>
            </TouchableHighlight>
        </View>
  );
  }
}
