import React, { useState, useEffect, useRef } from "react";

const Timer = () => {
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, time]);

  const handleStart = () => {
    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    setTime(totalSeconds);
    setIsRunning(true);
  };

  const handlePauseResume = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setTime(parseInt(minutes) * 60 + parseInt(seconds));
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleInputChange = (e, setter) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setter(value);
    }
  };

  const formattedTime = `${String(Math.floor(time / 60)).padStart(
    2,
    "0"
  )}:${String(time % 60).padStart(2, "0")}`;

  return (
    <div className="timer-box">
      <div>
        <input
          type="text"
          value={minutes}
          onChange={(e) => handleInputChange(e, setMinutes)}
          placeholder="Minutes"
        />
        <input
          type="text"
          value={seconds}
          onChange={(e) => handleInputChange(e, setSeconds)}
          placeholder="Seconds"
        />
      </div>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePauseResume}>
          {isRunning ? "Pause" : "Resume"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <h1>{formattedTime}</h1>
      </div>
    </div>
  );
};

export default Timer;
