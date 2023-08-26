import React, { useState, useRef } from 'react';
import '../App.css';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lapTimes, setLapTimes] = useState([]);

  const timerRef = useRef(null);

  const startStopwatch = () => {
    if (!isRunning) {
      const now = Date.now();
      setStartTime(now - elapsedTime);
      timerRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }
    setIsRunning(!isRunning);
  };

  const lapStopwatch = () => {
    if (isRunning) {
      setLapTimes([...lapTimes, elapsedTime]);
    }
  };

  const resetStopwatch = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setStartTime(0);
    setElapsedTime(0);
    setLapTimes([]);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:
            ${seconds.toString().padStart(2, '0')}:
            ${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="App">
      <h1>Stopwatch</h1>
      <div className="stopwatch">
        <span className="time">{formatTime(elapsedTime)}</span>
        <div className="buttons">
          <button onClick={startStopwatch} className={isRunning ? 'stop' : 'start'}>
            {isRunning ? 'Stop' : 'Start'}
          </button>
          <button onClick={lapStopwatch} disabled={!isRunning} className="lap">
            Lap
          </button>
          <button onClick={resetStopwatch} className="reset">
            Reset
          </button>
        </div>
        <div className="lap-times">
          <h2>Lap Times</h2>
          <ul>
            {lapTimes.map((lapTime, index) => (
              <li key={index}>{formatTime(lapTime)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
