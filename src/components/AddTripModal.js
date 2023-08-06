import { useRef, useState } from "react";
import { CrossIcon } from "../ui/icons/cross-icon";
import { cities } from "../data/cities";
import { CalendarIcon } from "../ui/icons/calendar-icon";
import { SelectArrowIcon } from "../ui/icons/select-arrow-icon";

function AddTripModal({ isOpen, onClose, addNewTrip }) {
  const [startDateError, setStartDateError] = useState();
  const [endDateError, setEndDateError] = useState();

  const selectCityRef = useRef();
  const inputStartRef = useRef();
  const inputEndRef = useRef();

  function changeStartDate(value) {
    const start = new Date(value);
    const today = new Date();
    const parsedStart = Date.parse(start);
    const parsedToday = Date.parse(today) + +3 * 60 * 60 * 1000;

    // 1296000000 = 15 дней = 15 * 24 * 60 * 60 * 1000 дней

    if (parsedStart < parsedToday) {
      setStartDateError(
        "Event should be in future. Please, choose another start date."
      );
    } else if (parsedStart > parsedToday + 1296000000) {
      setStartDateError("The start date should be within the next 15 days!");
    } else {
      setStartDateError();
    }
  }

  function changeEndDate(value) {
    const end = new Date(value);
    const today = new Date();
    const parsedEnd = Date.parse(end);
    const parsedToday = Date.parse(today) + 3 * 60 * 60 * 1000;

    if (parsedEnd < parsedToday) {
      setEndDateError(
        "Event should be in future. Please, choose another end date."
      );
    } else if (parsedEnd > parsedToday + 1296000000) {
      setEndDateError("The end date should be within the next 15 days!");
    } else {
      setEndDateError();
    }
  }

  function submitFormHandler(e) {
    e.preventDefault();
    // check start & end dates to be selected - but input field is required now
    if (!inputStartRef.current.value) {
      setStartDateError("Event should have a start date. Please, select it.");
      return;
    }
    if (!inputEndRef.current.value) {
      setStartDateError("Event should have an end date. Please, select it.");
      return;
    }

    // check that start date is earlier than the end date
    const start = new Date(inputStartRef.current.value);
    const end = new Date(inputEndRef.current.value);
    const parsedStart = Date.parse(start);
    const parsedEnd = Date.parse(end);

    if (parsedStart >= parsedEnd) {
      setEndDateError(
        "The end date should be after a start date. Please, correct!"
      );
      return;
    }

    const selectedCity = cities.find(
      (city) => city.name === selectCityRef.current.value
    );

    const newTrip = {
      // id: "t6",
      city: selectCityRef.current.value,
      start: inputStartRef.current.value.split("-").reverse().join("."),
      end: inputEndRef.current.value.split("-").reverse().join("."),
      image: selectedCity.image,
    };

    // adding a new trip to the array and to the file and/or database
    addNewTrip(newTrip);

    // hide this modal window
    onClose();
  }

  function handleClick(e) {
    const insideModal = e.target.closest("[data-id=modalbox]");
    if (insideModal) return;
    onClose();
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal__bg" onClick={handleClick}>
      <div className="modal__box" data-id="modalbox">
        <form onSubmit={submitFormHandler}>
          <div className="modal__header">
            <p>Create Trip</p>
            {isOpen}
            <button className="modal__close" onClick={onClose}>
              <CrossIcon />
            </button>
          </div>
          <div className="modal__body">
            <label htmlFor="city">
              <span>*</span> City
            </label>
            <div className="input__select">
              <select id="city" ref={selectCityRef}>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              <SelectArrowIcon />
            </div>

            <label htmlFor="startDate">
              <span>*</span> Start date
            </label>
            <div className="input__date">
              <input
                required
                id="startDate"
                type="date"
                onChange={(e) => changeStartDate(e.target.value)}
                ref={inputStartRef}
              />
              <CalendarIcon />
            </div>
            {startDateError && (
              <div className="date__error">{startDateError}</div>
            )}

            <label htmlFor="endDate">
              <span>*</span> End date
            </label>
            <div className="input__date">
              <input
                required
                id="endDate"
                type="date"
                onChange={(e) => changeEndDate(e.target.value)}
                ref={inputEndRef}
              />
              <CalendarIcon />
            </div>
            {endDateError && <div className="date__error">{endDateError}</div>}
          </div>
          <div className="modal__footer">
            <button
              type="button"
              className="modal__btn modal__cancel"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="modal__btn modal__save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTripModal;
