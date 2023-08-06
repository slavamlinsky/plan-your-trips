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
  {
    id: "t3",
    city: "Barcelona",
    start: "09.08.2023",
    end: "18.08.2023",
    image: "barcelona.jpg",
    // image: "https://www.civitatis.com/f/espana/barcelona/visita-guiada-sagrada-familia-589x392.jpg",
  },
  {
    id: "t4",
    city: "Odesa",
    start: "17.08.2023",
    end: "22.08.2023",
    image: "odesa.jpg",
    // image: "https://media.istockphoto.com/id/1145422105/photo/eiffel-tower-aerial-view-paris.jpg?s=612x612&w=0&k=20&c=sFn6FwTJR0TpX3rP_W4VHrbkTB__6l5kr-lkkqdYrtE=",
  },
  {
    id: "t5",
    city: "Venice",
    start: "08.08.2023",
    end: "12.08.2023",
    image: "venice.jpg",
    // image: "https://venicelover.com/images/venice.jpg",
  },
];

function Forecast() {
  const [currentTripId, setCurrentTripId] = useState(tripsData[0].id);
  const [loading, setLoading] = useState(true);

  // тут скорее всего будет чтение данных из файла...
  useEffect(() => {
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
        <TripPanel trips={tripsData} chooseTrip={setCurrentTripId} />
        <TripWeather tripId={currentTripId} />
      </div>
      <Right tripId={currentTripId} />
    </div>
  );
}

export default Forecast;
