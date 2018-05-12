
import RegisterStore from './register'
import NaviStore from './naviStore'
import UserStore from './user';
import LoadingStore from './loading';

export default {
    registerStore : new RegisterStore(),
    naviStore:new NaviStore(),
    userStore:new UserStore(),
    loadingStore:new LoadingStore(),
};
