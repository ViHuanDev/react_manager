import { AppRegistry, UIManager,AsyncStorage } from 'react-native';
import Main from './src/main';
UIManager.setLayoutAnimationEnabledExperimental && 
UIManager.setLayoutAnimationEnabledExperimental(true);

AppRegistry.registerComponent ('manager', ()=> Main );
