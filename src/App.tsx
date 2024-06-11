import React, {useState} from 'react';
import './App.css';
import {useQuery} from "@apollo/client";
import {GET_ALL_EVENTS} from "./query/events";
import DigitalClock from "./components/DigitalClock/DigitalClock";
import Countdown from './components/Countdown/Countdown'
import {TEvent, timeStart} from './utils/timeWorkers';
import {moc} from './utils/mocData'

function App() {
  const {data, loading, error} = useQuery(GET_ALL_EVENTS, {variables: {"videostand_id":"6"}})

  if(loading) {
    return (
      <div className="App App-clean">
        <DigitalClock type="clean"/>
      </div>
    )
  }
  // Строка с МОК данными
  // const event: TEvent[] = moc.videostandEvents.current_and_upcoming;

  // Строка с данными от сервера
  const event: TEvent[] = data.videostandEvents.current_and_upcoming;

  if (!event.length) {
    return (
      <div className="App App-clean">
        <DigitalClock type="clean"/>
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <DigitalClock type="body"/>
      </header>
      <main className="App-main">
        <div className="App-block">
          <span className="App-date">{timeStart(event[0])}</span>
          <span className="App-title">{event[0].title}</span>
        </div>
        <Countdown
          timeTillDate={event[0].dt_start}
        />
      </main>
      <footer className="App-footer">
        <span className="Footer-date">{event[1] && timeStart(event[1])}</span>
        <span className="Footer-title">{event[1] && event[1].title}</span>
      </footer>
    </div>
  );
}

export default App;
