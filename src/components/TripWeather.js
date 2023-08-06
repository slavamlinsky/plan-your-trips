import { useEffect, useState } from "react";
import { tripsData } from "./Forecast";
import DailyForecast from "./DailyForecast";

function TripWeather(props) {
  const trip = tripsData.find((trip) => trip.id === props.tripId);
  const cityName = trip.city;
  const tripStartDay = trip.start.split(".").reverse().join("-");
  const tripEndDay = trip.end.split(".").reverse().join("-");
  const [daysData, setDaysData] = useState([]);

  useEffect(() => {
    if (tripStartDay !== "" && tripEndDay !== "") {
      // нужно везде добавить TRY_CATCH + LOADER

      fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/${tripStartDay}/${tripEndDay}?unitGroup=metric&include=days&key=P5UC3JS9UQS3H5UMQ2CEPZPSH&contentType=json`
      )
        .then((response) => response.json())
        .then((data) => {
          setDaysData(data.days);
        });
    }
  }, [cityName, tripStartDay, tripEndDay]);

  return (
    <div className="tripforecast">
      <h2>
        Week
        {/* / {tripStartDay} / {tripEndDay} */}
      </h2>
      <DailyForecast days={daysData} />
    </div>
  );
}

export default TripWeather;
