import { useEffect, useRef, useState } from "react";
import TripItem from "./TripItem";
import Loader from "./Loader";
import { sortByDate } from "../utils/array";

function TripList({ trips, chooseTrip }) {
  const [loading, setLoading] = useState(true);
  const alltripsRef = useRef();
  const wrapperRef = useRef();

  const [isNavShow, setIsNavShow] = useState(true);

  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  const [sortedTrips, setSortedTrips] = useState([]);

  function prevTrip() {
    setNextDisabled(false);
    alltripsRef.current.scrollLeft -= 320;

    if (alltripsRef.current.scrollLeft === 0) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
  }

  function nextTrip() {
    setPrevDisabled(false);
    alltripsRef.current.scrollLeft += 320;

    if (
      alltripsRef.current.scrollLeft >
      wrapperRef.current.getBoundingClientRect().width -
        alltripsRef.current.getBoundingClientRect().width -
        320
    ) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
  }

  useEffect(() => {
    setIsNavShow(
      alltripsRef.current.getBoundingClientRect().width <=
        wrapperRef.current.getBoundingClientRect().width
    );
  }, [sortedTrips]);

  useEffect(() => {
    if (trips.length > 0) {
      const sortedTripsData = sortByDate(trips);
      setSortedTrips(sortedTripsData);
      setLoading(false);
    }

    setLoading(false);
  }, [trips]);

  return (
    <div className="triplist">
      {loading && <Loader />}
      <div className="alltrips" ref={alltripsRef}>
        <div className="trips__wrapper" ref={wrapperRef}>
          {trips.length === 0 && (
            <h3 style={{ marginLeft: "2em", opacity: 0.7 }}>
              No suitable trips found ...
            </h3>
          )}
          {sortedTrips.map((trip) => {
            return <TripItem key={trip.id} trip={trip} onClick={chooseTrip} />;
          })}
        </div>
      </div>
      {isNavShow && (
        <div className="trip__navigation">
          <button
            className="tripnav__btn tripnav__prev"
            type="button"
            onClick={prevTrip}
            title="Slide to previous trip"
            disabled={prevDisabled}
          >
            prev
          </button>
          <button
            className="tripnav__btn tripnav__next"
            type="button"
            onClick={nextTrip}
            title="Slide to next trip"
            disabled={nextDisabled}
          >
            next
          </button>
        </div>
      )}
    </div>
  );
}

export default TripList;
