
import RegisterStore from './register'
import NaviStore from './naviStore'
import UserStore from './user';

export default {
    registerStore : new RegisterStore(),
    naviStore:new NaviStore(),
    userStore:new UserStore()
};
