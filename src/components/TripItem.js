function TripItem({ trip, onClick }) {
  return (
    <div
      className="tripinfo"
      onClick={() => {
        onClick(trip);
      }}
    >
      <div className="tripinfo__image">
        {/* <img src={trip.image} alt={trip.city} /> */}
        <img src={require(`../assets/city/${trip.image}`)} alt={trip.city} />
      </div>
      <div className="tripinfo__text">
        <h4 className="tripinfo__city">{trip.city}</h4>
        <p className="tripinfo__dates">
          {trip.start} - {trip.end}
        </p>
      </div>
    </div>
  );
}

export default TripItem;
