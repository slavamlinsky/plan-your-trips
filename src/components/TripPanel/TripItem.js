import styles from "./TripPanel.module.css";
function TripItem({ trip, onClick }) {
  return (
    <li
      className={styles.tripinfo}
      onClick={() => {
        onClick(trip);
      }}
    >
      <div className={styles.tripinfo__image}>
        <img
          src={require(`../../assets/images/city/${trip.image}`)}
          alt={trip.city}
        />
      </div>
      <div className={styles.tripinfo__text}>
        <h4 className={styles.tripinfo__city}>{trip.city}</h4>
        <p className={styles.tripinfo__dates}>
          {trip.start} - {trip.end}
        </p>
      </div>
    </li>
  );
}

export default TripItem;
