import React, { useEffect, useState } from "react";
import { timeCounter } from "../../utils/timer";
import styles from "./Right.module.css";

function Countdown(props) {
  const [timer, setTimer] = useState({});

  const trip = props.currentTrip;
  const tripStartDay = trip.start;

  const validStartDate = tripStartDay.split(".").reverse().join("-");

  useEffect(() => {
    const start = new Date(validStartDate);
    const now = new Date();
    const waitTime = timeCounter(start, now);
    setTimer(waitTime);

    const interval = setInterval(() => {
      const now = new Date();
      const waitTime = timeCounter(start, now);
      setTimer(waitTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [validStartDate]);

  return (
    <div className={styles.trip__countdown}>
      <div className={styles.countdown}>
        <div className={styles.countdown__days}>
          <span>{timer.days}</span> days
        </div>
        <div className={styles.countdown__days}>
          <span>{timer.hours}</span> hours
        </div>
        <div className={styles.countdown__days}>
          <span>{timer.minutes}</span> minutes
        </div>
        <div className={styles.countdown__days}>
          <span>{timer.seconds}</span> seconds
        </div>
      </div>
    </div>
  );
}

export default Countdown;
