import React, { useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

const CountdownCircle = ({ remainingSeconds, totalSeconds, pausado }) => {
  const percentage = (remainingSeconds / totalSeconds) * 100;
  const [color, setColor] = React.useState("#a609b8ff");

  useEffect(() => {
    if (pausado) {
      setColor("#fbff00ff");
    } else if (remainingSeconds < 60) {
      setColor("#ff0000ff");
    } else {
      setColor("#ff00fbff");
    }
  }, [remainingSeconds, pausado]);

  // Formata MM:SS
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return (
    <div style={{ width: 80, height: 80 }}>
      <CircularProgressbar
        value={percentage}
        text={formatTime(remainingSeconds)}
        styles={buildStyles({
          textColor: "#ffffffff",
          pathColor: color,
          trailColor: "#949292ff",
          textSize: '20px',
        })}
      />
    </div>
  );
};

export default CountdownCircle;