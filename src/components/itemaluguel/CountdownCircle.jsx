import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const CountdownCircle = ({ remainingSeconds, totalSeconds }) => {
  const percentage = (remainingSeconds / totalSeconds) * 100;

  // Formata MM:SS
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    console.log(minutes);
    console.log(seconds);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2,'0')}`;
  }

  return (
    <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar
        value={percentage}
        text={formatTime(remainingSeconds)}
        styles={buildStyles({
          textColor: "#ffffffff",
          pathColor: "#a609b8ff",
          trailColor: "#949292ff",
          textSize: '20px',
        })}
      />
    </div>
  );
};

export default CountdownCircle;