const { default: OneDayForecast } = require("./OneDayForecast");

function DailyForecast({ days }) {
  return (
    <div className="daylyforecast">
      {days.map((day, index) => (
        <OneDayForecast key={index} day={day} />
      ))}
    </div>
  );
}

export default DailyForecast;
