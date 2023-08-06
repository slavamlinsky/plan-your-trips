import { useState } from "react";
import TripList from "./TripList";
import { FindSeacrhIcon } from "../ui/icons/find-search";
import AddTripModal from "./AddTripModal";
import { sortByDate } from "../utils/array";

function TripPanel({ trips, chooseTrip }) {
  const [searchTrip, setSearchtrip] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(false);

  const [filteredTrips, setFilteredTrips] = useState(trips);
  const [showModal, setShowModal] = useState(false);

  // ещё можно добавить сортировку по дате отфильтрованных поездок (проверить)
  function searchChangeHandler(e) {
    setSearchtrip(e.target.value);
    if (searchTimeout !== false) {
      clearTimeout(searchTimeout);
    }
    if (e.target.value !== "") {
      setSearchTimeout(
        setTimeout(
          (value) => {
            const filtered = trips.filter((trip) =>
              trip.city.toLowerCase().startsWith(value.toLowerCase())
            );
            setFilteredTrips(filtered);
          },
          100,
          e.target.value
        )
      );
    } else {
      setFilteredTrips(trips);
    }
  }

  function showModalHandler() {
    setShowModal((prev) => !prev);
  }

  function addNewTrip(newTrip) {
    if (!newTrip.id) {
      newTrip.id = "tt" + (filteredTrips.length + 1);
    }
    filteredTrips.push(newTrip);

    const sortedData = sortByDate(filteredTrips);

    setFilteredTrips(sortedData);
  }

  return (
    <div className="trippanel">
      <AddTripModal
        isOpen={showModal}
        onClose={showModalHandler}
        addNewTrip={addNewTrip}
      />
      <div className="tripfilter">
        <input
          value={searchTrip}
          onChange={(e) => searchChangeHandler(e)}
          placeholder="Search your trip..."
        />
        <FindSeacrhIcon />
      </div>
      <div className="mainpanel">
        <TripList trips={filteredTrips} chooseTrip={chooseTrip} />
        <div className="addnewtrip">
          <button className="addtrip__btn" onClick={() => showModalHandler()}>
            +<br />
            Add trip
          </button>
        </div>
      </div>
    </div>
  );
}

export default TripPanel;
