export function timeCounter(start, now) {
  const milliseconds =
    Date.parse(start) - (Date.parse(now) - now.getTimezoneOffset() * 60 * 1000);

  const days = Math.floor(milliseconds / 1000 / (60 * 60 * 24));
  const hours = Math.floor(milliseconds / 1000 / (60 * 60) - days * 24);
  const minutes = Math.floor(
    milliseconds / 1000 / 60 - days * 24 * 60 - hours * 60
  );
  const seconds = Math.floor(
    milliseconds / 1000 - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60
  );

  const timer = {
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };

  return timer;
}
