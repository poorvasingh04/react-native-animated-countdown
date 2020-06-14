import React from 'react';

declare module "react-native-animated-countdown" {
 
  /**
   * Defines actions for Countdown
   * Two actions supported are - start and stop
   *
   * @export
   * @interface CountdownAction
   */
  export interface CountdownAction {
    START: string;
    STOP: string;
  }

   /**
   * Defines type of Coundown
   * It can be 'time' or 'number'
   * default value is 'number'
   *
   * @export
   * @interface CountdownType
   */
  export interface CountdownType {
    TIME: string;
    NUMBER: string;
  }

  /**
   * Defines display type of timer value
   * Applies only if 'type' of countdown is 'time'
   *
   * @export
   * @interface TimerDisplay
   */
  export interface TimerDisplay {
    HHMMSS: string;
    MMSS: string;
  }

  /**
   * Defines props supported by Countdown component
   *
   * @export
   * @type CountdownProps
   */
  export type CountdownProps = {
    /** accepts supported action for countdown - defaults to CountdownAction.STOP */
    action: CountdownAction;

    /** accepts a callback action called after timeout */
    callbackOnTimeOut: function;

    /** 
     * plays sound on value change and timeout if set to true
     * defaults to true
     */
    shouldPlaySound: Boolean;

    /** 
     * accepts Countdown type as 'time' or 'number'
     * defaults to 'number'
     */
    type: CountdownType;

    /** 
     * accepts a number for duration of countdown
     * defaults to 10
     */
    duration: Number 

    /** 
     * accepts a display value for countdown if type is 'time' 
     * defaults to mmss
     */
    timerDisplay: TimerDisplay;
  };

  /**
   * export Countdown which accepts props of type CountdownProps
   *
   * @export
   * @param {CountdownProps} props
   */
  export const Countdown: (props: CountdownProps) => React.SFC<CountdownProps>
}