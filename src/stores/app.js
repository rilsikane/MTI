import { observable } from 'mobx';
import store from 'react-native-simple-store';
class AppStore {
  @observable root = undefined; // 'login' / 'after-login'
  @observable isLoading = false; // 'login' / 'after-login'
  constructor() {
   
  }

  async appInitialized() {
    
    let userData = await store.get("user");
    if (userData == null) {
      this.root = 'login';
    }else{
      this.root = 'login';
    }
  }

  login() {
    this.root = 'after-login';
  }
  logout() {
    this.root = 'login';
  }
 
}

export default new AppStore();