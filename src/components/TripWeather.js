import { useEffect, useState } from "react";
import { tripsData } from "./Forecast";
import DailyForecast from "./DailyForecast";
import Loader from "./Loader";

function TripWeather(props) {
  const [loading, setLoading] = useState(true);
  const trip = tripsData.find((trip) => trip.id === props.tripId);
  const cityName = trip.city;
  const tripStartDay = trip.start.split(".").reverse().join("-");
  const tripEndDay = trip.end.split(".").reverse().join("-");
  const [daysData, setDaysData] = useState([]);

  useEffect(() => {
    if (tripStartDay !== "" && tripEndDay !== "") {
      try {
        fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/${tripStartDay}/${tripEndDay}?unitGroup=metric&include=days&key=P5UC3JS9UQS3H5UMQ2CEPZPSH&contentType=json`
        )
          .then((response) => response.json())
          .then((data) => {
            setDaysData(data.days);
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }, [cityName, tripStartDay, tripEndDay]);

  if (loading) {
    return <Loader />;
  }

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
