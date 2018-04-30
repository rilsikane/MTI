import startApplication from './startApplication';
import { reaction } from 'mobx';
import app  from './stores/app';
import { registerScreens,registerScreenVisibilityListener } from './screens';
import {
  Platform
} from 'react-native';
import {setCustomText,setCustomTextInput,setCustomStatusBar} from 'react-native-global-props';
import {Text,TextInput} from 'react-native';


registerScreens();
registerScreenVisibilityListener();
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

  setCustomText(customTextProps);
  setCustomTextInput(customTextProps);
  setCustomStatusBar(customStatusBar)

  reaction(() => app.root, () => this.startApp(app.root));
    app.appInitialized();
  }
  startApp(root) {
    startApplication(root);
  }
  
}