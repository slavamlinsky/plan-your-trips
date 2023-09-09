import { useEffect, useState } from "react";
import { CrossIcon } from "../../assets/icons/svg/cross-icon";
import { cities } from "../../data/cities";
import { CalendarIcon } from "../../assets/icons/svg/calendar-icon";
import { SelectArrowIcon } from "../../assets/icons/svg/select-arrow-icon";
import styles from "./AddTripModal.module.css";
import {
  MAXIMUM_CALENDAR_PERIOD,
  MILISECONDS_IN_DAY,
  MILISECONDS_IN_HOUR,
  TIMEZONE_OFFSET,
} from "../../utils/consts";

function AddTripModal({ isOpen, onClose, addNewTrip }) {
  const [cityError, setCityError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");

  const [tripCity, setTripCity] = useState(0);
  const [tripStart, setTripStart] = useState("");
  const [tripEnd, setTripEnd] = useState("");

  useEffect(() => {
    setTripStart("");
  }, []);

  function changeStartDate(value) {
    setTripStart(value);
    const start = new Date(value);
    const today = new Date();
    const parsedStart = Date.parse(start);
    const parsedToday =
      Date.parse(today) + TIMEZONE_OFFSET * MILISECONDS_IN_HOUR;

    if (parsedStart < parsedToday) {
      setStartDateError(
        "Event should be in future. Please, choose another start date."
      );
    } else if (parsedStart > parsedToday + 15 * MILISECONDS_IN_DAY) {
      setStartDateError("The start date should be within the next 15 days!");
    } else {
      setStartDateError();
    }
  }

  function changeEndDate(value) {
    setTripEnd(value);
    const end = new Date(value);
    const today = new Date();
    const parsedEnd = Date.parse(end);
    const parsedToday =
      Date.parse(today) + TIMEZONE_OFFSET * MILISECONDS_IN_HOUR;

    if (parsedEnd < parsedToday) {
      setEndDateError(
        "Event should be in future. Please, choose another end date."
      );
    } else if (parsedEnd > parsedToday + 15 * MILISECONDS_IN_DAY) {
      setEndDateError("The end date should be within the next 15 days!");
    } else {
      setEndDateError();
    }
  }
  function resetForm() {
    setTripStart("");
    setTripEnd("");
    setTripCity(0);
    setCityError("");
    setStartDateError("");
    setEndDateError("");
  }

  function submitFormHandler(e) {
    e.preventDefault();

    // check start & end dates to be selected - but input field is required now

    if (!tripCity) {
      setCityError("Please, select the destination.");
      return;
    }
    if (!tripStart) {
      setStartDateError("Event should have a start date. Please, select it.");
      return;
    }

    if (!tripEnd) {
      setStartDateError("Event should have an end date. Please, select it.");
      return;
    }

    const start = new Date(tripStart);
    const end = new Date(tripEnd);
    const parsedStart = Date.parse(start);
    const parsedEnd = Date.parse(end);

    if (parsedStart >= parsedEnd) {
      setEndDateError(
        "The end date should be after a start date. Please, correct!"
      );
      return;
    }

    const selectedCity = cities.find((city) => city.name === tripCity);

    const newTrip = {
      city: tripCity,
      start: tripStart.split("-").reverse().join("."),
      end: tripEnd.split("-").reverse().join("."),
      image: selectedCity.image,
    };

    // adding a new trip to the array and to the file and/or database
    addNewTrip(newTrip);

    // reset form controls & hide this modal window
    resetForm();
    onClose();
  }
  function cancelClick() {
    resetForm();
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
  const today = new Date();
  const minDate =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    today.getDate().toString().padStart(2, "0");

  const finish = new Date();
  finish.setDate(today.getDate() + MAXIMUM_CALENDAR_PERIOD);
  const maxDate =
    finish.getFullYear() +
    "-" +
    (finish.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    finish.getDate().toString().padStart(2, "0");

  return (
    <div className={styles.modal__bg} onClick={handleClick}>
      <div className={styles.modal__box} data-id="modalbox">
        <form onSubmit={submitFormHandler}>
          <div className={styles.modal__header}>
            <p>Create trip</p>
            {isOpen}
            <button className={styles.modal__close} onClick={onClose}>
              <CrossIcon />
            </button>
          </div>
          <div className={styles.modal__body}>
            <label htmlFor="city">
              <span>*</span> City
            </label>
            <div className={styles.input__select}>
              <select
                id="city"
                value={tripCity}
                onChange={(e) => {
                  setCityError("");
                  setTripCity(e.target.value);
                }}
              >
                <option value={0} disabled>
                  Please select a city
                </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
              <SelectArrowIcon />
            </div>
            {cityError && <div className={styles.date__error}>{cityError}</div>}

            <label htmlFor="startDate">
              <span>*</span> Start date
            </label>
            <div className={styles.input__date}>
              <input
                value={tripStart}
                required
                id="startDate"
                type="date"
                min={minDate}
                max={maxDate}
                onChange={(e) => changeStartDate(e.target.value)}
              />
              <CalendarIcon />
            </div>
            {startDateError && (
              <div className={styles.date__error}>{startDateError}</div>
            )}

            <label htmlFor="endDate">
              <span>*</span> End date
            </label>
            <div className={styles.input__date}>
              <input
                value={tripEnd}
                required
                id="endDate"
                type="date"
                min={minDate}
                max={maxDate}
                onChange={(e) => changeEndDate(e.target.value)}
              />
              <CalendarIcon />
            </div>
            {endDateError && (
              <div className={styles.date__error}>{endDateError}</div>
            )}
          </div>
          <div className={styles.modal__footer}>
            <button
              type="button"
              className={`${styles.modal__btn} ${styles.modal__cancel}`}
              onClick={cancelClick}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${styles.modal__btn} ${styles.modal__save}`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTripModal;
