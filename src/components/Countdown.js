import React, { useEffect, useState } from "react";
import { tripsData } from "./Forecast";
import { timeCounter } from "../utils/timer";

function Countdown(props) {
  const [timer, setTimer] = useState({});

  const trip = tripsData.find((trip) => trip.id === props.tripId);
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
    <div className="trip__countdown">
      {/* <h1 style={{ textAlign: "center" }}>Trip Start Date</h1>
      <h2 style={{ textAlign: "center" }}>{tripStartDay}</h2> */}
      <div className="countdown">
        <div className="countdown__days">
          <span>{timer.days}</span> days
        </div>
        <div className="countdown__days">
          <span>{timer.hours}</span> hours
        </div>
        <div className="countdown__days">
          <span>{timer.minutes}</span> minutes
        </div>
        <div className="countdown__days">
          <span>{timer.seconds}</span> seconds
        </div>
      </div>
    </div>
  );
}

export default Countdown;
