import { useEffect, useState } from "react";
import { CelsiusDegreesIcon } from "../../ui/icons/celsius-degrees-icon";
import Countdown from "./Countdown";
import { getDayByDate } from "../../utils/dates";
import Loader from "../Loader";
import styles from "./Right.module.css";

function Right(props) {
  const [loading, setLoading] = useState(true);
  const currentTrip = props.currentTrip;
  const cityName = currentTrip.city;

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
    <div className={`${styles.right} ${styles[todayIcon]}`}>
      <div className={styles.today}>
        <p className={styles.today__weekday}>{todayDay}</p>
        <p>{todayConditions}</p>
        <div className={styles.today__icon__temp}>
          <span className={styles.today__weather__icon}>
            <img
              src={require(`../../assets/icons/${todayIcon}.png`)}
              alt={todayConditions}
              title={todayConditions}
            />
          </span>
          <div className={styles.today__temperature}>
            {temperature}
            <span>
              <CelsiusDegreesIcon />
            </span>
          </div>
        </div>
        <p className={styles.today__city}>{cityName}</p>
      </div>
      <Countdown currentTrip={props.currentTrip} tzOffset={timezoneOffset} />
    </div>
  );
}

export default Right;
