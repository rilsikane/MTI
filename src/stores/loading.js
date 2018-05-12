/* @flow */

import { observable } from 'mobx';


export default class LoadingStore {
  @observable isLoading = false;

  isVisible(){
      return this.isLoading;
  }
  setVisible(visible){
    this.isLoading = visible;
  }
}
