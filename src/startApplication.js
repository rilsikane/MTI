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
       
         Navigation.startSingleScreenApp({
            screen: { 
              screen: 'mti.DashboardScreen'
            },
            drawer: {
              // optional, add this if you want a side menu drawer in your app
              left: {
                // optional, define if you want a drawer from the left
                screen: 'mti.MenuScreen', // unique ID registered with Navigation.registerScreen
                passProps: {}, // simple serializable object that will pass as props to all top screens (optional)
                disableOpenGesture: false, // can the drawer be opened with a swipe instead of button (optional, Android only)
                fixedWidth: 700 // a fixed width you want your left drawer to have (optional)
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
            appStyle: {
            orientation: 'portrait',
            navBarBlur: false,
            drawUnderNavBar: true,
            navBarTransparent: true,
            navBarHidden: true  ,
            navBarBackgroundColor: '#f58020', 
            }
        });
        return;
       
      default:
        console.error('Unknown app root');
    }  
  
}