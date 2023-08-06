import { useEffect, useState } from "react";
import { CelsiusDegreesIcon } from "../ui/icons/celsius-degrees-icon";
import { tripsData } from "./Forecast";
import Countdown from "./Countdown";
import { getDayByDate } from "../utils/dates";
import Loader from "./Loader";

function Right(props) {
  const [loading, setLoading] = useState(true);
  const currentTripId = props.tripId;
  const trip = tripsData.find((trip) => trip.id === currentTripId);
  const cityName = trip.city;

  const [temperature, setTemperature] = useState("");
  const [todayIcon, setTodayIcon] = useState("rain");
  const [todayDay, setTodayDay] = useState("");
  const [todayConditions, setTodayConditions] = useState("");
  const [timezoneOffset, setTimezoneOffset] = useState(0);

  useEffect(() => {
    if (cityName !== "") {
      try {
        fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/today?unitGroup=metric&include=days&key=P5UC3JS9UQS3H5UMQ2CEPZPSH&contentType=json`
        )
          .then((response) => response.json())
          .then((data) => {
            setTemperature(data.days[0].temp);
            setTodayIcon(data.days[0].icon);
            setTodayConditions(data.days[0].conditions);
            setTimezoneOffset(data.tzoffset);

            const validDate = new Date();
            setTodayDay(getDayByDate(validDate));
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, [cityName]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={"right " + todayIcon}>
      <div className="today">
        <p className="today__weekday">{todayDay}</p>
        <p>{todayConditions}</p>
        <div className="today-icon-temp">
          <span className="today-weather-icon">
            <img
              src={require(`../assets/icons/${todayIcon}.png`)}
              alt={todayConditions}
              title={todayConditions}
            />
          </span>
          <div className="today__temperature">
            {temperature}
            <span>
              <CelsiusDegreesIcon />
            </span>
          </div>
        </div>
        <p className="today__city">{cityName}</p>
      </div>
      <Countdown tripId={props.tripId} tzOffset={timezoneOffset} />
    </div>
  );
}

export default Right;
