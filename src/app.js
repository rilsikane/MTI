import startApplication from './startApplication';
import { reaction } from 'mobx';
import app  from './stores/app';
import naviStore  from './stores/naviStore';
import { registerScreens,registerScreenVisibilityListener } from './screens';
import {
  Platform
} from 'react-native';
import {setCustomText,setCustomTextInput,setCustomStatusBar} from 'react-native-global-props';
import {Text,TextInput,PushNotificationIOS} from 'react-native';
import firebase from 'react-native-firebase';
import store from 'react-native-simple-store';
registerScreens();
//registerScreenVisibilityListener();
export default class App {
 constructor() {
  Text.defaultProps.allowFontScaling=false
  TextInput.defaultProps.allowFontScaling=false
  const customTextProps = {
    style: {
      fontFamily: Platform.OS === 'android' ?'DBHelvethaicaX':'DBHelvethaicaX-Reg',
    }
  }
  const customStatusBar = {
    backgroundColor: 'transparent',
    translucent: true
  }
  
  //localStorage.getAllFromLocalStorage();
  setCustomText(customTextProps);
  setCustomTextInput(customTextProps);
  setCustomStatusBar(customStatusBar)


  this.messageListener = firebase.messaging().onMessage(message => {
    // Process your message as required
    console.log(message)
  });
  // const channel = new firebase.notifications.Android.Channel('staffio', 'staffio', firebase.notifications.Android.Importance.Max).setDescription('staffio');
  // firebase.notifications().android.createChannel(channel);
  firebase.messaging().requestPermission().then(() => {
    firebase.messaging().getToken().then(async fcmToken => {
      if (fcmToken) {
        store.save("device_id",fcmToken);
      } else {
      // user doesn't have a device token yet
      } 
    });
    }).catch(error => {
    console.log(error);
    });
  this.notificationListener = firebase.notifications().onNotification(async (notification) => {
    // Process your notification as required
    console.log(notification);
    let badge = await store.get("badge");
    if(Platform.OS === 'ios'){
     
      PushNotificationIOS.setApplicationIconBadgeNumber(badge+1);
      app.badge = badge+1;
      PushNotificationIOS.presentLocalNotification({
        alertBody: notification._body,
        alertTitle: notification._title,
          silent: false,
      });
    }else{
      // notification.android.setChannelId('staffio')
      // firebase.notifications().displayNotification(notification);

      const localNotification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: true,
        show_in_background: true,
      })
      .setNotificationId(notification.notificationId)
      .setTitle(notification.title)
      .setSubtitle(notification.subtitle)
      .setBody(notification.body)
      .setData(notification.data)
      .android.setChannelId('mti') 
      .android.setSmallIcon('ic_launcher')
      .android.setPriority(firebase.notifications.Android.Priority.High);

      firebase.notifications()
        .displayNotification(localNotification)
        .catch(err => console.error(err));
      }
    });

  reaction(() => app.root, () => this.startApp(app.root));
    app.appInitialized();
  }
  startApp(root) {
    startApplication(root);
  }
  
}