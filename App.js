import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  Button,
  Alert,
  View
} from 'react-native';

import { Countdown, CountdownAction } from './src/views';
import CountdownType from './src/views/countdown/CountdownType';

function App() {
  const [cdState, setCdState] = useState(CountdownAction.STOP);

  const startCountdown = () => {
    setCdState(CountdownAction.START);
  }

  const stopCountdown = () => {
    setCdState(CountdownAction.STOP);
  }

  const timeout = () => {
    setCdState(CountdownAction.STOP);
    Alert.alert("Time out called");
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <Countdown
            action={cdState}
            callbackOnTimeOut={timeout}
            duration={3600}
            type={CountdownType.TIME}
          />
          <Button 
            onPress={startCountdown}
            title={"Start"}
            disabled={cdState === CountdownAction.START}
          />
          <Button 
            onPress={stopCountdown}
            title={"Stop"}
            disabled={cdState === CountdownAction.STOP}
          />
        </View>
        
      </SafeAreaView>
    </>
  );
};

export default App;
