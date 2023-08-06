import { useEffect, useState } from "react";
import Right from "./Right";
import TripPanel from "./TripPanel";
import TripWeather from "./TripWeather";
import Loader from "./Loader";

export const tripsData = [
  {
    id: "t1",
    city: "Berlin",
    start: "12.08.2023",
    end: "17.08.2023",
    image: "berlin.jpg",
    // image: "https://s0.tchkcdn.com/g-xnwJf0icf718GvgbCYvx4w/17/272512/660x480/f/0/bae_florian_wehde_ufgi0_ycie0_unsplash.jpg",
  },
  {
    id: "t2",
    city: "Tokyo",
    start: "11.08.2023",
    end: "15.08.2023",
    image: "tokyo.jpg",
    // image: "https://www.theinvisibletourist.com/wp-content/uploads/2022/08/featured_231.jpg",
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
