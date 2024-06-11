import React, {useEffect, useState} from 'react';
import './DigitalClock.css'
import {formatDay, formatTime} from "../../utils/timeWorkers";

export interface ITimeProps {
  type?: 'clean' | 'body' ;
}

function DigitalClock({type}: ITimeProps) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <div className={type === 'clean' ? 'Block-clock' : 'Body-clock'}>
      <span className={type === 'clean' ? 'Time' : 'Body-time'}>{formatTime(time)}</span>
      <span className={type === 'clean' ? 'Date' : 'Body-date'}>{formatDay(time)}</span>
    </div>
  )
}

export default DigitalClock;
