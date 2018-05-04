import { observable } from 'mobx';
import store from 'react-native-simple-store';
class AppStore {
  @observable root = undefined; // 'login' / 'after-login'
  @observable isLoading = false; // 'login' / 'after-login'
  @observable fontSize = 1;

  constructor() {
   
  }

  async appInitialized() {
    
    let userData = await store.get("user");
    let setting = await store.get("setting");
    if (userData == null) {
      this.root = 'login';
    }else{
      this.root = 'pincode';
    }
    this.fontSize = 'large'==setting.fontSize ? 2 :1;
  }

  login() {
    this.root = 'after-login';
  }

  async logout() {
    let userData = await store.get("user");
    //store.delete("user");
    store.delete("policy");
    store.delete("token");
    if(userData.pinCode){
      this.root = 'pincode';
    }else{
      this.root = 'login';
    }

  }
 
}

export default new AppStore();