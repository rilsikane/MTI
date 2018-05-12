/* @flow */

import { observable } from 'mobx';


export default class RegisterStore {
  @observable register={};
  @observable contact;
  @observable otp = {};
  @observable user={};
}
