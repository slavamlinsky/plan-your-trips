import OneDayForecast from "./OneDayForecast";
import styles from "./TripWeather.module.css";

function DailyForecast({ days }) {
  return (
    <ul className={styles.daylyforecast}>
      {days.map((day, index) => (
        <OneDayForecast key={index} day={day} />
      ))}
    </ul>
  );
}

export default DailyForecast;
