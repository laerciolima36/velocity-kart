import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const CountdownCircle = ({ totalSeconds }) => {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  useEffect(() => {
    if (secondsLeft <= 0) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  const percentage = (secondsLeft / totalSeconds) * 100;

  return (
    <div style={{ width: 150, height: 150 }}>
      <CircularProgressbar
        value={percentage}
        text={`${secondsLeft}s`}
        styles={buildStyles({
          textColor: "#333",
          pathColor: "#4caf50",
          trailColor: "#d6d6d6"
        })}
      />
    </div>
  );
};

export default CountdownCircle;
