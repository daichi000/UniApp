import { Constants } from 'expo';
import { createStackNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

/* from app */
import SearchScreen from 'app/src/screens/SearchScreen';
import HomeScreen from 'app/src/screens/HomeScreen';
import NotificationScreen from 'app/src/screens/NotificationScreen';
import UserScreen from 'app/src/screens/UserScreen';
import LoginScreen from 'app/src/screens/LoginScreen';
import SignupScreen from 'app/src/screens/SignupScreen';
import DashboardScreen from 'app/src/screens/DashboradScreen';
import I18n from 'app/src/i18n';
import {
  HomeTabIcon,
  SearchTabIcon,
  TakeTabIcon,
  NotificationTabIcon,
  MeTabIcon,
  TabBar,
} from 'app/src/components/Tab';

// StackNavigatorを簡単に作れるようにするための関数です
const createTabStack = (title, screen) => createStackNavigator({
  [title]: { screen },
});

// メインのBottomTabNavigatorです。画面下部のタブ関連の処理(画面遷移等)を司ります。
// export default createBottomTabNavigator(
// static navigationOptions = {
//   header: null
// }
// static navigationOptions = {
//   header: null,
// }

const MainTab = createBottomTabNavigator(
  {
    // ホームタブに関する設定を記述します。
    HomeTab: {
      // ホームタブのアイコンが押されたときに表示するスクリーンを定義します。
      screen: createTabStack('HomeTab', HomeScreen),
      // ホームタブのアイコンを定義します。
      navigationOptions: () => ({
        tabBarIcon: HomeTabIcon,
        headerTitle: I18n.t('TimeTable.title'),
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
    header: null,
    headerMode: 'screen',
    navigationOptions: {
      header: null,
    },
  },

)

const AuthStackNavigator = createStackNavigator(
  {
    Dashboard: DashboardScreen,
    Login: LoginScreen,
    Signup: SignupScreen,
    
  }
)

export default AuthStackNavigator