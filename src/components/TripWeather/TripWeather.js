import { useEffect, useState } from "react";
import DailyForecast from "./DailyForecast";

import styles from "./TripWeather.module.css";
import Loader from "../Loader";
import { getWeather } from "../../services/api";

function TripWeather(props) {
  const [loading, setLoading] = useState(true);
  const trip = props.currentTrip;
  const cityName = trip.city;

  const tripStartDay = trip.start.split(".").reverse().join("-");
  const tripEndDay = trip.end.split(".").reverse().join("-");
  const [daysData, setDaysData] = useState([]);

  useEffect(() => {
    if (tripStartDay !== "" && tripEndDay !== "") {
      async function fetchData() {
        try {
          const weatherData = await getWeather(
            cityName,
            tripStartDay,
            tripEndDay
          );
          setDaysData(weatherData);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    }
  }, [cityName, tripStartDay, tripEndDay]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.tripforecast}>
      <h2>Week</h2>
      <DailyForecast days={daysData} />
    </div>
  );
}

export default TripWeather;
