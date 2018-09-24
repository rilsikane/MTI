import { Navigation } from 'react-native-navigation';
import Provider from './lib/MobxRnnProvider';
import Store from './stores/store';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { responsiveHeight, responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions';
import store from 'react-native-simple-store';
import {Platform,Dimensions} from 'react-native';
import { ifIphoneX,isIphoneX } from 'react-native-iphone-x-helper'
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from '../assets/fonts/config.json'
const IconTello = createIconSetFromFontello(fontelloConfig);

async function prepareIcons() {
  const icons = await Promise.all([
    IconTello.getImageSource('icontap-01', 35),
    IconTello.getImageSource('icontap-02', 35),
    IconTello.getImageSource('icontap-04', 35),
    IconTello.getImageSource('icontap-05', 35),
    IconTello.getImageSource('icontap-03', 50),
  ]);
  const [home, gift, news,setting,star] = icons;
  return { home, gift,news,setting,star};
}
prepareIcons();
export default async function startApplication(root) {
      const icons = await prepareIcons();
      switch (root) {
      case 'login':
          Navigation.startSingleScreenApp({
            screen: { screen: 'mti.LoginScreen' },
            //screen: {screen: 'mti.PassCodeScreen'},        
            appStyle: {
            orientation: 'portrait',
            navBarBlur: false,
            drawUnderNavBar: true,
            navBarTransparent: true,
            navBarHidden: true ,
            navBarBackgroundColor: 'transparent', 
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
              icon: icons.home,
              title: undefined,
              tabBarText:'Workpool',
              navigatorStyle: {},
             
            },
            {
              label: 'ของขวัญ',
              screen: 'mti.CampaignScreen',
              icon: icons.gift,
              title: undefined,
              navigatorStyle: {},
            },
             {
              label: 'สิทธิพิเศษ',
              icon: Platform.OS ==='ios' ? require('../src/source/images/icon1.png'):icons.star,
              screen: 'mti.PrivilegeScreen',
              title: undefined,
              navigatorStyle: {},
              center:true,
              isIntercept:true,
              iconInsets: Platform.OS=="ios" ? { // add this to change icon position (optional, iOS only).
                top:-13, // optional, default is 0.
                left: 0, // optional, default is 0.
                bottom: 13, // optional, default is 0.
                right: 0 // optional, default is 0.
              }:null,
            },
            
            {
              label: 'กิจกรรม',
              screen: 'mti.ActivityScreen',
              icon: icons.news,
              title: undefined,
              navigatorStyle: {},
              
            },
            {
              label: 'บริการ',
              screen: 'mti.ServiceScreen',
              icon: icons.setting,
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
              tabBarSelectedButtonColor: 'rgb(253, 98, 98)',
              tabBarButtonColor: '#666666',
              tabBarBackgroundColor: '#ffffff', // change the background color of the tab bar
              tabBarLabelColor: '#666666', // iOS only. change the color of tab text
              tabBarSelectedLabelColor: 'rgb(253, 98, 98)', // iOS only. change the color of the selected tab text
              forceTitlesDisplay: true, // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
              tabBarTextFontFamily: 'DBHelvethaicaX-Reg',
              tabFontSize: responsiveFontSize(2),
              selectedTabFontSize: responsiveFontSize(2),
              tabBarTranslucent:true,
              tabBarHideShadow:false
            },
            appStyle: {
            orientation: 'portrait',
            navBarBlur: false,
            drawUnderNavBar: true,
            navBarTransparent: true,
            navBarHidden: true  ,
            navBarBackgroundColor: '#f58020',
            tabBarButtonColor: '#666666', // change the color of the tab icons and text (also unselected)
            tabBarSelectedButtonColor: 'rgb(253, 98, 98)', // change the color of the selected tab icon and text (only selected)
            tabBarBackgroundColor: '#f6f6f6', // change the background color of the tab bar
            tabBarTranslucent: false, // change the translucent of the tab bar to false
            tabBarLabelColor: '#666666', // iOS only. change the color of tab text
            tabBarSelectedLabelColor: 'rgb(253, 98, 98)', // iOS only. change the color of the selected tab text
            forceTitlesDisplay: true, // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
            tabBarTextFontFamily: 'DBHelvethaicaX-Reg',
            
            },
            overlay: {
            screen: 'mti.MiddleButtonScreen',
            position: {
              top: Dimensions.get("window").height,
              left: Dimensions.get("window").width / 2 - 28,
              height: 56,
              width: 56
            }
          },
            animationType: 'fade',
            lazyload:true
        });
        
      
      return;
        // case 'pincode':
        // Navigation.startSingleScreenApp({
        //       screen: { screen: 'mti.PassCodeAuthenScreen' },
        //       appStyle: {
        //       orientation: 'portrait',
        //       navBarBlur: false,
        //       drawUnderNavBar: true,
        //       navBarTransparent: true,
        //       navBarHidden: true , 
        //       }
        //   });
        // return;
        case 'register':
        setTimeout(()=>{
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
        
      },100);
      return;
      case 'first':
        if(Platform.OS==='ios'){
          Navigation.startSingleScreenApp({
            screen: { screen: 'mti.LoginScreen' },
            //screen: {screen: 'mti.PassCodeScreen'},        
            appStyle: {
            orientation: 'portrait',
            navBarBlur: false,
            drawUnderNavBar: true,
            navBarTransparent: true,
            navBarHidden: true , 
            }
          });
        }
      return;
      default:
        console.error('Unknown app root');
    }  
  
}