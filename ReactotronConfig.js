import {Platform} from 'react-native';
import Reactotron from 'reactotron-react-native';

// Only configure Reactotron for non-web platforms
if (__DEV__ && Platform.OS !== 'web') {
  const reactotron = Reactotron.configure({host: '192.168.1.10'}) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from // controls connection & communication settings
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!

  // Make Reactotron available globally for debugging
  console.tron = reactotron;
} else {
  // For web or production builds, provide a no-op console.tron
  console.tron = {
    log: () => {},
    warn: () => {},
    error: () => {},
    display: () => {},
    image: () => {},
  };
}
