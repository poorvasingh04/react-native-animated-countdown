import Sound from 'react-native-sound';
import { Platform } from 'react-native';

Sound.setCategory('Ambient', true);

const timeoutSoundiOS = new Sound(
  'timeout.mp3', Sound.MAIN_BUNDLE,
  error => console.log("timeout sound error=", error)
);

const timeoutSoundAndroid = new Sound(
  require('../resources/timeout.mp3'),
  error => console.log("timeout sound error=", error)
);

const timeoutSound = () => {
  return Platform.OS === 'ios' ? timeoutSoundiOS: timeoutSoundAndroid;
}

const clockTickSound = new Sound(
  require('../resources/clockTick.mp3'),
  error => console.log("clock tick sound error=", error)
);

export {
  timeoutSound,
  clockTickSound,
};