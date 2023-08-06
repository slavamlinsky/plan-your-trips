export function getDayByDate(date) {
  const weekdayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const validDate = new Date(date);

  return weekdayNames[validDate.getDay()];
}
