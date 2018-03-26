import startApplication from './startApplication';
import { reaction } from 'mobx';
import app  from './stores/app';
import { registerScreens,registerScreenVisibilityListener } from './screens';
import {
  Platform
} from 'react-native';
import {setCustomText,setCustomTextInput} from 'react-native-global-props';


registerScreens();
registerScreenVisibilityListener();
export default class App {
 constructor() {
  const customTextProps = {
    style: {
      fontFamily: Platform.OS === 'android' ?'DBHelvethaicaX':'DBHelvethaicaX-Reg',
    }
  }
  setCustomText(customTextProps);
  setCustomTextInput(customTextProps);
  
  reaction(() => app.root, () => this.startApp(app.root));
    app.appInitialized();
  }
  startApp(root) {
    startApplication(root);
  }
  
}