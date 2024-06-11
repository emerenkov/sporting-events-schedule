import {dayArray, monthArray} from "./timeConstants";

export type TEvent = {
  dt_create: string;
  dt_end: string;
  dt_start: string;
  is_main: boolean;
  title: string;
  __typename: string;
}

export function timeStart(arr: TEvent) {
  return arr.dt_start.slice(0, 10).split('-').reverse().join('.');
}

//@ts-ignore
export function formatDay(time) {
  const month = monthArray[time.getMonth()];
  const day = dayArray[time.getDay()];
  const date = time.getDate();

  return `${date} ${month}  ${day}`;
}
//@ts-ignore
export function formatTime(time) {
  const hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
  const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
  const seconds = time.getSeconds();

  return `${hours}:${minutes}`;
}
//@ts-ignore
export function calcTime(time, timeTillDate) {
  const year = timeTillDate.slice(0, 4)
  const month = timeTillDate.slice(5, 7)
  const day = timeTillDate.slice(8, 10)
  let hours = timeTillDate.slice(11, 13)
  let minutes = timeTillDate.slice(14, 16)
  const seconds = timeTillDate.slice(17, 19)

  const nowYear = time.getFullYear()
  const nowMonth = 1 + time.getMonth()
  const nowDay = time.getDate()
  const nowHours = time.getHours()
  const nowMinutes = time.getMinutes()
  const nowSeconds = time.getSeconds()

  let newSeconds = 60 - nowSeconds;
  let newMinutes = nowMinutes - minutes ;
  if (newMinutes <= 0) {
    minutes += 60
    hours -= 1
  }
  let newHours = hours - nowHours;
  let newDay = day - nowDay;
  let newMonth = month - nowMonth

  return { newSeconds, newMinutes, newHours, newDay, newMonth };
}
