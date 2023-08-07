import OneDayForecast from "./OneDayForecast";
import styles from "./TripWeather.module.css";

function DailyForecast({ days }) {
  return (
    <div className={styles.daylyforecast}>
      {days.map((day, index) => (
        <OneDayForecast key={index} day={day} />
      ))}
    </div>
  );
}

export default DailyForecast;
