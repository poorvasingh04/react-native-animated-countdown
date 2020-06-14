import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Button,
  Alert,
  View
} from 'react-native';

import { Countdown, CountdownState } from './src/views';

function App() {
  const [cdState, setCdState] = useState(CountdownState.STOP);

  const startCountdown = () => {
    setCdState(CountdownState.START);
  }

  const stopCountdown = () => {
    setCdState(CountdownState.STOP);
  }

  const timeout = () => {
    setCdState(CountdownState.STOP);
    Alert.alert("Time out called");
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <Countdown
            countdownState={cdState}
            callbackOnTimeOut={timeout}
          />
          <Button 
            onPress={startCountdown}
            title={"Start"}
            disabled={cdState === CountdownState.START}
          />
          <Button 
            onPress={stopCountdown}
            title={"Stop"}
            disabled={cdState === CountdownState.STOP}
          />
        </View>
        
      </SafeAreaView>
    </>
  );
};

export default App;
