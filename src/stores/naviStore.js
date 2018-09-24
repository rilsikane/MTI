/* @flow */

import { observable } from 'mobx';


export default class NaviStore {
  @observable navigation;
  @observable hotdata =undefined;
  @observable isPrivillege="false";
  @observable isActivity="false";
  @observable badge=0;
  @observable isBack = false;
}
