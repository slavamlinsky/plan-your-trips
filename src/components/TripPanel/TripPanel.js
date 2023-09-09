import { useState } from "react";
import TripList from "./TripList";
import { FindSeacrhIcon } from "../../assets/icons/svg/find-search";
import AddTripModal from "../AddTripModal/AddTripModal";
import { sortByDate } from "../../utils/array";
import styles from "./TripPanel.module.css";

function TripPanel({ trips, chooseTrip }) {
  const [searchTrip, setSearchtrip] = useState("");
  const [filteredTrips, setFilteredTrips] = useState(trips);
  const [showModal, setShowModal] = useState(false);

  function searchChangeHandler(e) {
    setSearchtrip(e.target.value);

    if (e.target.value !== "") {
      const filtered = trips.filter((trip) =>
        trip.city.toLowerCase().startsWith(e.target.value.toLowerCase())
      );
      setFilteredTrips(filtered);
    } else {
      setFilteredTrips(trips);
    }
  }

  function showModalHandler() {
    setShowModal((prev) => !prev);
  }

  function addNewTrip(newTrip) {
    newTrip = { id: "tt" + (filteredTrips.length + 1), ...newTrip };
    filteredTrips.push(newTrip);

    const sortedData = sortByDate(filteredTrips);
    setFilteredTrips(sortedData);
    localStorage.setItem("my_trips", JSON.stringify(sortedData));
  }

  return (
    <div className={styles.trippanel}>
      <AddTripModal
        isOpen={showModal}
        onClose={showModalHandler}
        addNewTrip={addNewTrip}
      />
      <div className={styles.tripfilter}>
        <input
          value={searchTrip}
          onChange={(e) => searchChangeHandler(e)}
          placeholder="Search your trip..."
        />
        <FindSeacrhIcon />
      </div>
      <div className={styles.mainpanel}>
        <TripList
          trips={filteredTrips}
          chooseTrip={chooseTrip}
          show={showModal}
        />
        <div className={styles.addnewtrip}>
          <button
            className={styles.addtrip__btn}
            onClick={() => showModalHandler()}
          >
            +<br />
            Add trip
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripPanel;
