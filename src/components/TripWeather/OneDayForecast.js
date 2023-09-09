import { getDayByDate } from "../../utils/dates";
import styles from "./TripWeather.module.css";

function OneDayForecast({ day }) {
  // checking the day of a week
  const dayOfWeek = getDayByDate(day.datetime);

  return (
    <li className={styles.oneday__forecast}>
      {dayOfWeek}
      <span className={styles.weather__icon}>
        <img
          src={require(`../../assets/icons/weather/${day.icon}.png`)}
          alt={day.conditions}
          title={day.conditions}
        />
      </span>
      <p>
        {Math.round(day.tempmin)}°/{Math.round(day.tempmax)}°
      </p>
    </li>
  );
}

export default OneDayForecast;
