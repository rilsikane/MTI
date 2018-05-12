import { Navigation } from 'react-native-navigation';
import Provider from './lib/MobxRnnProvider';
import Store from './stores/store';
import Icon from 'react-native-vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import store from 'react-native-simple-store';

async function prepareIcons() {
  const icons = await Promise.all([
    Icon.getImageSource('clone', 25),
    Icon.getImageSource('arrow-to-bottom', 25),
  ]);
  const [home, inbox] = icons;
  return { home, inbox};
}
prepareIcons();
export default async function startApplication(root) {
      const icons = await prepareIcons();
      switch (root) {
      case 'login':
        Navigation.startSingleScreenApp({
              screen: { screen: 'mti.LoginScreen' },
              //screen: {screen: 'mti.ActivityScreen'},        
              appStyle: {
              orientation: 'portrait',
              navBarBlur: false,
              drawUnderNavBar: true,
              navBarTransparent: true,
              navBarHidden: true , 
              }
          });
        return;
       
        case 'after-login':
       
        Navigation.startTabBasedApp({
          tabs: [
            {
              label: 'หน้าหลัก',
              //screen: 'staffio.Overview',
              screen: 'mti.DashboardScreen',
              icon: require('../src/source/images/default_11.png'),
              title: undefined,
              tabBarText:'Workpool',
              navigatorStyle: {},
            },
             {
              label: 'สิทธิพิเศษ',
              screen: 'mti.PrivilegeScreen',
              icon: require('../src/source/images/default_13.png'),
              title: undefined,
              navigatorStyle: {},
            },
            {
              label: 'บริการ',
              screen: 'mti.ServiceScreen',
              icon: require('../src/source/images/default_17.png'),
              title: undefined,
              navigatorStyle: {},
            },
          ],
            drawer: {
              // optional, add this if you want a side menu drawer in your app
              left: {
                // optional, define if you want a drawer from the left
                screen: 'mti.MenuScreen', // unique ID registered with Navigation.registerScreen
                passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
                disableOpenGesture: false, // can the drawer be opened with a swipe instead of button (optional, Android only)
                fixedWidth: "60%" // a fixed width you want your left drawer to have (optional)
              },
              style: {
                // ( iOS only )
                drawerShadow: true, // optional, add this if you want a side menu drawer shadow
                contentOverlayColor: 'rgba(0,0,0,0.25)', // optional, add this if you want a overlay color when drawer is open
                leftDrawerWidth: 70, // optional, add this if you want a define left drawer width (50=percent)
              },
              type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
              animationType: 'slide-and-scale', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
              // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
              disableOpenGesture: true // optional, can the drawer, both right and left, be opened with a swipe instead of button
            },
            tabsStyle:{
              tabBarButtonColor: '#9B9B9B', // change the color of the tab icons and text (also unselected)
              tabBarSelectedButtonColor: 'rgb(253, 98, 98)', // change the color of the selected tab icon and text (only selected)
              tabBarBackgroundColor: '#ffffff', // change the background color of the tab bar
              tabBarTranslucent: true, // change the translucent of the tab bar to false
              tabBarLabelColor: '#333333', // iOS only. change the color of tab text
              tabBarSelectedLabelColor: 'rgb(253, 98, 98)', // iOS only. change the color of the selected tab text
              forceTitlesDisplay: true, // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
              tabBarTextFontFamily: 'DBHelvethaicaX-Reg',
              tabFontSize: responsiveFontSize(5),
              selectedTabFontSize: responsiveFontSize(5),
            },
            appStyle: {
            orientation: 'portrait',
            navBarBlur: false,
            drawUnderNavBar: true,
            navBarTransparent: true,
            navBarHidden: true  ,
            navBarBackgroundColor: '#f58020',
            tabBarButtonColor: '#9B9B9B', // change the color of the tab icons and text (also unselected)
            tabBarSelectedButtonColor: 'rgb(253, 98, 98)', // change the color of the selected tab icon and text (only selected)
            tabBarBackgroundColor: '#ffffff', // change the background color of the tab bar
            tabBarTranslucent: true, // change the translucent of the tab bar to false
            tabBarLabelColor: '#333333', // iOS only. change the color of tab text
            tabBarSelectedLabelColor: 'rgb(253, 98, 98)', // iOS only. change the color of the selected tab text
            forceTitlesDisplay: true, // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
            tabBarTextFontFamily: 'DBHelvethaicaX-Reg',
            },
            animationType: 'fade',
            lazyload:true
        });
        return;
        case 'pincode':
        Navigation.startSingleScreenApp({
              screen: { screen: 'mti.PassCodeAuthenScreen' },
              appStyle: {
              orientation: 'portrait',
              navBarBlur: false,
              drawUnderNavBar: true,
              navBarTransparent: true,
              navBarHidden: true , 
              }
          });
        return;
        case 'register':
        Navigation.startSingleScreenApp({
              screen: { screen: 'mti.RegisterScreen' },
              appStyle: {
              orientation: 'portrait',
              navBarBlur: false,
              drawUnderNavBar: true,
              navBarTransparent: true,
              navBarHidden: true , 
              }
          });
        return;
      default:
        console.error('Unknown app root');
    }  
  
}