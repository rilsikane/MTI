import {Navigation,ScreenVisibilityListener} from 'react-native-navigation';
import Provider from '../lib/MobxRnnProvider';
import Store from '../stores/store';
import LoginScreen from './LoginScreen';
import LifeStyleScreen from './LifeStyleScreen';
import RegisterScreen from './RegisterScreen';
import WelcomeScreen from './WelcomeScreen';
import DashboardScreen from './DashboardScreen';
import MenuScreen from './MenuScreen';
import ProfileScreen from './UserProfileScreen';
import UserInsuranceListScreen from './UserInsuranceListScreen';
import InsuranceDetailScreen from './InsuranceDetailScreen';
import ServicePolicyScreen from './ServicePolicyScreen';
import NotificationScreen from './NotificationScreen';
import MyCardScreen from './MyCardScreen';
import PrivilegeScreen from './PrivilegeScreen';
import PrivilegeDetailScreen from './PrivilegeDetailScreen';
import NoRegisterDataScreen from './NoRegisterDataScreen';
import RequestMoreInfoScreen from './RequestMoreInfoScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import NewPasswordScreen from './NewPasswordScreen';
import PrivilegeAgreementScreen from './PrivilegeAgreementScreen';
import PrivilegeQrCodeScreen from './PrivilegeQrCodeScreen';
import PrivilegeForMemberScreen from './PrivilegeForMemberScreen';
import QAndAScreen from './QAndAScreen';
import UsageHistoryScreen from './UsageHistoryScreen';
import FavoriteScreen from './FavoriteScreen';

import app from '../stores/app';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('mti.LoginScreen', () => LoginScreen, Store, Provider);
  Navigation.registerComponent('mti.LifeStyleScreen', () => LifeStyleScreen, Store, Provider);
  Navigation.registerComponent('mti.RegisterScreen', () => RegisterScreen, Store, Provider);
  Navigation.registerComponent('mti.WelcomeScreen', () => WelcomeScreen, Store, Provider);
  Navigation.registerComponent('mti.DashboardScreen', () => DashboardScreen, Store, Provider);
  Navigation.registerComponent('mti.MenuScreen', () => MenuScreen, Store, Provider);
  Navigation.registerComponent('mti.ProfileScreen', () => ProfileScreen, Store, Provider);
  Navigation.registerComponent('mti.UserInsuranceListScreen', () => UserInsuranceListScreen, Store, Provider);
  Navigation.registerComponent('mti.InsuranceDetailScreen', () => InsuranceDetailScreen, Store, Provider);
  Navigation.registerComponent('mti.ServicePolicyScreen', () => ServicePolicyScreen, Store, Provider);
  Navigation.registerComponent('mti.NotificationScreen', () => NotificationScreen, Store, Provider);
  Navigation.registerComponent('mti.MyCardScreen', () => MyCardScreen, Store, Provider);
  Navigation.registerComponent('mti.PrivilegeScreen', () => PrivilegeScreen, Store, Provider);
  Navigation.registerComponent('mti.PrivilegeDetailScreen', () => PrivilegeDetailScreen, Store, Provider);
  Navigation.registerComponent('mti.NoRegisterDataScreen', () => NoRegisterDataScreen, Store, Provider);
  Navigation.registerComponent('mti.RequestMoreInfoScreen', () => RequestMoreInfoScreen, Store, Provider);
  Navigation.registerComponent('mti.ForgotPasswordScreen', () => ForgotPasswordScreen, Store, Provider);
  Navigation.registerComponent('mti.NewPasswordScreen', () => NewPasswordScreen, Store, Provider);
  Navigation.registerComponent('mti.PrivilegeAgreementScreen', () => PrivilegeAgreementScreen, Store, Provider);
  Navigation.registerComponent('mti.PrivilegeQrCodeScreen', () => PrivilegeQrCodeScreen, Store, Provider);
  Navigation.registerComponent('mti.PrivilegeForMemberScreen', () => PrivilegeForMemberScreen, Store, Provider);
  Navigation.registerComponent('mti.QAndAScreen', () => QAndAScreen, Store, Provider);
  Navigation.registerComponent('mti.UsageHistoryScreen', () => UsageHistoryScreen, Store, Provider);
  Navigation.registerComponent('mti.FavoriteScreen', () => FavoriteScreen, Store, Provider);
}
export function registerScreenVisibilityListener() {
  new ScreenVisibilityListener({
    willAppear: ({screen}) =>{ 
      console.log(`Displaying screen ${screen}`)
    },
    didAppear: ({screen, startTime, endTime, commandType}) => {
      console.log('screenVisibility', `Screen ${screen} displayed in ${endTime - startTime} millis [${commandType}]`)
    },
    willDisappear: ({screen}) => {
      console.log(`Screen will disappear ${screen}`)
    },
    didDisappear: ({screen}) => {
      console.log(`Screen disappeared ${screen}`)
    }
  }).register();
}
