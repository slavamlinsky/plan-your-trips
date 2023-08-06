import { getDayByDate } from "../utils/dates";

function OneDayForecast({ day }) {
  // checking the day of a week
  const dayOfWeek = getDayByDate(day.datetime);

  return (
    <div className="oneday_forecast">
      {dayOfWeek}
      <span className="weather-icon">
        <img
          src={require(`../assets/icons/${day.icon}.png`)}
          alt={day.conditions}
          title={day.conditions}
        />
      </span>
      <p>
        {day.tempmin}°/{day.tempmax}°
      </p>
    </div>
  );
}

export default OneDayForecast;
