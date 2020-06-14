import React, { useEffect, useState } from 'react';
import {
  View, Image, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import AppConstants from '../../common/AppConstants';
import style from './style';
import { timeoutSound, clockTickSound } from '../../common/Sounds';
import CountdownAction from './CountdownAction';
import CountdownState from './CountdownState';
import CountdownType from './CountdownType';
import TimerDisplay from './TimerDisplay';

const timeoutGif = require('../../resources/timeout.gif');

const TIMER_INTERVAL = AppConstants.TIMER_INTERVAL;

const {
  gifStyle,
} = style;

function Countdown({
  action,
  callbackOnTimeOut,
  shouldPlaySound,
  type, 
  duration, 
  timerDisplay,
}) {

  const [timer, setTimer] = useState(null);
  const [counter, setCounter] = useState(CountdownState.DEFAULT);

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
  }, [action]);

  const handleCountdownState = () => {
    const { START, STOP } = CountdownAction; 
    switch(action) {
      case START: 
        setCounter(counter < 0 ? duration : counter);
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
        if (count === CountdownState.TIMEOUT) {

          if (shouldPlaySound) {
            const audio = timeoutSound();
            audio.play();
          }
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
    if (timerDisplay === TimerDisplay.MMSS) return mm+":"+ss;
    return hh+":"+mm+":"+ss;
  }

  if (counter === CountdownState.DEFAULT) return null;

  const countdownTextView = () => {
    if (counter <= CountdownState.SHOULD_TIMEOUT) return null;
    const displayValue = type === CountdownType.NUMBER
                            ? counter
                            : toTimeString(counter);
    return (
      <Text>
        {displayValue}
      </Text>
    );
  } 
 
  return (
    <View>
      { counter === CountdownState.SHOULD_TIMEOUT && shouldPlaySound ? (
        <Image
          source={timeoutGif}
          style={gifStyle}
        />
      ) : countdownTextView()}
    </View>
  );
}

export default Countdown;

Countdown.propTypes = {
  action: PropTypes.string,
  callbackOnTimeOut: PropTypes.func,
  shouldPlaySound: PropTypes.bool,
  type: PropTypes.string,
  duration: PropTypes.number,
  timerDisplay: PropTypes.string,
};

Countdown.defaultProps = {
  action: CountdownAction.STOP,
  callbackOnTimeOut: null,
  shouldPlaySound: true,
  type: CountdownType.NUMBER,
  duration: AppConstants.TIMER_MAX,
  timerDisplay: TimerDisplay.HHMMSS,
};