import { observable } from 'mobx';
import store from 'react-native-simple-store';
import storeMobx from '../stores/store'
class AppStore {
  @observable root = undefined; // 'login' / 'after-login'
  @observable isLoading = false; // 'login' / 'after-login'
  @observable fontSize = 1;
  @observable badge = 0;

  constructor() {
    
  }

  async appInitialized() {
    
    let userData = await store.get("user");
    if (userData == null) {
      this.root = 'login';
    }else{
      // if(userData.pinCode){
      //   this.root = 'pincode';
      // }else{
      //   this.root = 'after-login';
      // }
      this.root = 'after-login';
    }
  }

  login() {
    this.root = 'after-login';
  }
  register() {
    this.root = 'register';
  }
  first() {
    
    setTimeout(()=>{
      storeMobx.naviStore.navigation.resetTo({
        screen: 'mti.LoginScreen', // unique ID registered with Navigation.registerScreen
        title: undefined, // navigation bar title of the pushed screen (optional)
        passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
        animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
        animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
        navigatorStyle : { tabBarHidden: true }, // override the navigator style for the pushed screen (optional)
        navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
      });
      // setTimeout(()=>{
        
      },150);
    this.root = 'first';
  }

  async logout() {
    let userData = await store.get("user");
    store.delete("user");
    store.delete("policy");
    store.delete("token");
    store.delete("privilegeGroup");
    store.delete("badge");
    // if(userData && userData.pinCode){
    //   this.root = 'pincode';
    // }else{
    //   if(userData){
    //     store.delete("user");
    //   }
    //   this.root = 'login';
    // }
    storeMobx.naviStore.navigation.toggleDrawer({
      side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
      animated: true, // does the toggle have transition animation or does it happen immediately (optional)
      to: 'closed' // optional, 'open' = open the drawer, 'closed' = close it, missing = the opposite of current state
    });
    setTimeout(()=>{
    storeMobx.naviStore.navigation.resetTo({
      screen: 'mti.LoginScreen', // unique ID registered with Navigation.registerScreen
      title: undefined, // navigation bar title of the pushed screen (optional)
      passProps: {}, // simple serializable object that will pass as props to the pushed screen (optional)
      animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
      animationType: 'fade', // 'fade' (for both) / 'slide-horizontal' (for android) does the resetTo have different transition animation (optional)
      navigatorStyle : { tabBarHidden: true }, // override the navigator style for the pushed screen (optional)
      navigatorButtons: {} // override the nav buttons for the pushed screen (optional)
    });
    // setTimeout(()=>{
      
    },150)
    this.root = 'first';
  }
 
}

export default new AppStore();