import React, {useEffect, useState} from 'react'
import './Countdown.css'
import {calcTime} from "../../utils/timeWorkers";

function Countdown(props: any) {
  const [time, setTime] = useState(new Date())

  const [state, setState] = useState({
    days: 1,
    hours: 1,
    minutes: 1,
    seconds: 1
  })

  useEffect(()=> {
    const interval = setInterval(() => {
      setTime(new Date())
      const { timeTillDate } = props;
      const limit = calcTime(time, timeTillDate)
      setState({
        days: limit.newDay,
        hours: limit.newHours,
        minutes: limit.newMinutes,
        seconds: limit.newSeconds
      })
    }, 1000);

    return () => {
      clearInterval(interval);
    }
  },)

  const { days, hours, minutes, seconds } = state;
  const daysRadius = mapNumber(days, 30, 0, 0, 360);
  const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
  const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
  const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

  const blueWaitColor = '#51ACD8';
  const orangeColor = '#FDAE47';
  const redColor = '#D62F0D';
  const blueColor = '#0062B5'

  if(!seconds) {
    return null;
  }

  return (
    <div>
      {days <= 0 && hours <= 0 && minutes <= 0 ?
        (
          <div className="Block-go">
            <span className="Span-go">ИДЕТ СЕЙЧАС</span>
          </div>
        ) :
        (
          <div className='countdown-wrapper'>
            {days && (
              <div className='countdown-item'>
                <SVGCircle radius={daysRadius} color={blueColor} />
                {days}
                <span>дней</span>
              </div>
            )}
            {hours && (
              <div className='countdown-item'>
                <SVGCircle radius={hoursRadius} color={redColor} />
                {hours}
                <span>часов</span>
              </div>
            )}
            {minutes && (
              <div className='countdown-item'>
                <SVGCircle radius={minutesRadius} color={orangeColor}/>
                {minutes}
                <span>минут</span>
              </div>
            )}
            {seconds && (
              <div className='countdown-item'>
                <SVGCircle radius={secondsRadius} color={blueWaitColor} />
                {seconds}
                <span>секунд</span>
              </div>
            )}
          </div>
        )}

    </div>
  );
}

const SVGCircle = ({ radius, color }: any) => (
  <svg className='countdown-svg'>
    <path fill="none" stroke={color} strokeWidth="10" d={describeArc(60, 60, 55, 0, radius)}/>
  </svg>
);

//@ts-ignore
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  let angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}
//@ts-ignore
function describeArc(x, y, radius, startAngle, endAngle) {

  let start = polarToCartesian(x, y, radius, endAngle);
  let end = polarToCartesian(x, y, radius, startAngle);

  let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  let d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");

  return d;
}
//@ts-ignore
function mapNumber(number, in_min, in_max, out_min, out_max) {
  return (number - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

export default Countdown;
