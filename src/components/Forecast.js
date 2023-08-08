import { useEffect, useState } from "react";
import Right from "./Right/Right";
import TripPanel from "./TripPanel/TripPanel";
import TripWeather from "./TripWeather/TripWeather";
import Loader from "./Loader";

export const tripsData = [
  {
    id: "t1",
    city: "Berlin",
    start: "18.08.2023",
    end: "20.08.2023",
    image: "berlin.jpg",
  },
  {
    id: "t2",
    city: "Tokyo",
    start: "22.08.2023",
    end: "24.08.2023",
    image: "tokyo.jpg",
  },
];

function Forecast() {
  const [currentTrip, setCurrentTrip] = useState(tripsData[0]);
  const [loading, setLoading] = useState(true);
  const [myTrips, setMyTrips] = useState(tripsData);

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("my_trips")) {
      setMyTrips(JSON.parse(localStorage.getItem("my_trips")));
    } else {
      localStorage.setItem("my_trips", JSON.stringify(tripsData));
      setMyTrips(tripsData);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="main">
      <div className="forecast">
        <h1 className="title">
          <span>Weather</span> Forecast
        </h1>
        <TripPanel trips={myTrips} chooseTrip={setCurrentTrip} />
        <TripWeather currentTrip={currentTrip} />
      </div>
      <Right currentTrip={currentTrip} />
    </div>
  );
}

export default Forecast;
