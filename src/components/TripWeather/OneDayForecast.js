import { getDayByDate } from "../../utils/dates";
import styles from "./TripWeather.module.css";

function OneDayForecast({ day }) {
  // checking the day of a week
  const dayOfWeek = getDayByDate(day.datetime);

  return (
    <div className={styles.oneday__forecast}>
      {dayOfWeek}
      <span className={styles.weather__icon}>
        <img
          src={require(`../../assets/icons/${day.icon}.png`)}
          alt={day.conditions}
          title={day.conditions}
        />
      </span>
      <p>
        {Math.round(day.tempmin)}°/{Math.round(day.tempmax)}°
      </p>
    </div>
  );
}

export default OneDayForecast;
