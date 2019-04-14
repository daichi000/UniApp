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
import { withNavigationFocus, NavigationActions, StackActions } from 'react-navigation';
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

export default class LoginScreen extends React.Component {
  static navigationOptions = () => ({
    headerTitle: I18n.t('Login.title'),
  })

  state = {
    email: 'user1@example.com',
    password: 'password',
  }

  handlesubmit(){
      
      // this.props.navigation.navigate('Home')
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
          .then((user) => {
              console.log('success', user);

              const resetAction = StackActions.reset({
                  index: 0,
                  actions: [
                      NavigationActions.navigate({ routeName: 'Dashboard' })
                  ],
              });
              this.props.navigation.dispatch(resetAction);
          })
          .catch((error) => {
              console.log(error);
          })
      // Log in()
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
          <TouchableHighlight style={styles.button} onPress={() => { this.handlesubmit(); }} underlayColor="#C70F66">
              <Text style={styles.buttonTitle}>ログインする</Text>
          </TouchableHighlight>

          <TouchableOpacity style={styles.signup} onPress={this.handlePress.bind(this)}>
              <Text style={styles.signupText}>メンバー登録する</Text>
          </TouchableOpacity>
      </View>
  );
  }
}
