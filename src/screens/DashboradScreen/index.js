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
import { withNavigationFocus, createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Constants } from 'expo';
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
import SearchScreen from 'app/src/screens/SearchScreen';
import HomeScreen from 'app/src/screens/HomeScreen';
import NotificationScreen from 'app/src/screens/NotificationScreen';
import UserScreen from 'app/src/screens/UserScreen';
import {
  HomeTabIcon,
  SearchTabIcon,
  TakeTabIcon,
  NotificationTabIcon,
  MeTabIcon,
  TabBar,
} from 'app/src/components/Tab';

// @withNavigationFocus
// @connect(state => ({
//   currentScreen: state.screen,
// }))

export default class DashboardScreen extends React.Component {
  //headerが二段にならないようにする
  static navigationOptions = () => ({
    header: null,
  })

  // state = {
  //   email: 'user1@example.com',
  //   password: 'password',
  // }

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
      <AppTabNavigator />
  );
  }
}

// const AppTabNavigator = createBootomTabNavigator({

// })
// StackNavigatorを簡単に作れるようにするための関数です
const createTabStack = (title, screen) => createStackNavigator({
  [title]: { screen },
});

const AppTabNavigator = createBottomTabNavigator(
  {
    // ホームタブに関する設定を記述します。
    HomeTab: {
      // ホームタブのアイコンが押されたときに表示するスクリーンを定義します。
      screen: createTabStack('HomeTab', HomeScreen),
      // ホームタブのアイコンを定義します。
      navigationOptions: () => ({
        tabBarIcon: HomeTabIcon,
        // headerTitle: I18n.t('Signup.title'),
        // headerTitle: "aaa",
        header: null,
      }),
    },
    SearchTab: {
      screen: createTabStack('SearchTab', SearchScreen),
      navigationOptions: () => ({
        tabBarIcon: SearchTabIcon,
      }),
    },
    TakeTab: {
      screen: () => null,
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: TakeTabIcon,
        tabBarOnPress: () => { // アイコンタップ時にTakeModalスクリーンを開きます。
          navigation.push('TakeModal');
        },
      }),
    },
    NotificationTab: {
      screen: createTabStack('NotificationTab', NotificationScreen),
      navigationOptions: () => ({
        tabBarIcon: NotificationTabIcon,
      }),
    },
    MeTab: {
      screen: createTabStack('MeTab', UserScreen),
      navigationOptions: () => ({
        tabBarIcon: MeTabIcon,
      }),
    },
  },
  // タブナビゲーション全体に関する設定値を記述します。
  {
    tabBarOptions: {
      showLabel: false, // タブのアイコンの下にラベルを表示しないようにします
      activeTintColor: '#333', // アクティブなタブの色を指定します。
      inactiveTintColor: '#bbb', // アクティブではないタブの色を指定します。
      style: { // タブの背景色を設定します。
        backgroundColor: Constants.manifest.extra.backgroundColor,
      },
    },
    tabBarComponent: TabBar, // タブ部分のコンポーネントを指定します。
    tabBarPosition: 'bottom', // タブバーの位置を指定します。
    animationEnabled: false, // アニメーションを無効にします。
    swipeEnabled: false, // スワイプによる画面遷移を無効にします。
  },
)