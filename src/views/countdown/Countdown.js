import React, { useEffect, useState } from 'react';
import {
  View, Image, Text,
} from 'react-native';
import AppConstants from '../../common/AppConstants';
import style from './style';
import { timeoutSound, clockTickSound } from '../../common/Sounds';
import CountdownState from './CountdownState';

const timeoutGif = require('../../resources/timeout.gif');

const TIMER_MAX = AppConstants.TIMER_MAX;
const TIMER_INTERVAL = AppConstants.TIMER_INTERVAL;

const {
  gifStyle,
} = style;

function Countdown({
  countdownState = CountdownState.STOP,
  callbackOnTimeOut,
  shouldPlaySound = true,
}) {

  const [timer, setTimer] = useState(null);
  const [counter, setCounter] = useState(-2);

  useEffect(() => {
    let cancel = false;
    const runEffect = async () => {      
      if (cancel) {
        return;
      }

      handleCountdownState();
      
    };
    runEffect();
  
    return () => {
      cancel = true;
    }
  }, [countdownState]);

  const handleCountdownState = () => {
    const { START, STOP } = CountdownState; 
    switch(countdownState) {
      case START: 
        setCounter(counter < 0 ? TIMER_MAX : counter);
        beginCountdown();
        return;
      case STOP:
        endCountdown();
        return;
    }
  }

  const beginCountdown = () => {
    const timer = (setInterval(() => {
      setCounter(count => {
        if (count === 0) {
          if (shouldPlaySound) {
            const audio = timeoutSound();
            audio.play();
          }
          return count - 1;

        } else if (count === -1) {

          if (callbackOnTimeOut) callbackOnTimeOut();

          clearInterval(timer);

          return count - 1;
        }

        if (shouldPlaySound) {
          clockTickSound.play();
        }
        return count - 1;
      });
      
    }, TIMER_INTERVAL));

    setTimer(timer);
  }

  const endCountdown = () => {
    clearInterval(timer);
    setTimer(null);
  }

  const toTimeString = (seconds) => {
    var date = new Date(seconds * 1000);
    var hh = date.getUTCHours();
    var mm = date.getUTCMinutes();
    var ss = date.getSeconds();
    if (hh < 10) {hh = "0"+hh;}
    if (mm < 10) {mm = "0"+mm;}
    if (ss < 10) {ss = "0"+ss;}
    return mm+":"+ss;
  }

  if (counter === -2) return null;

  const countdownTextView = () => {
    if (counter <= -1) return null;
    return (
      <Text>
        {toTimeString(counter)}
      </Text>
    );
  } 
 
  return (
    <View>
      { counter === -1 && shouldPlaySound ? (
        <Image
          source={timeoutGif}
          style={gifStyle}
        />
      ) : countdownTextView()}
    </View>
  );
}

export default Countdown;