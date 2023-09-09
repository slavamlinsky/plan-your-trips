export async function getTodayWeather(cityName) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/today?unitGroup=metric&include=days&key=P5UC3JS9UQS3H5UMQ2CEPZPSH&contentType=json`
  );
  const result = await response.json();
  return result;
}

export async function getWeather(cityName, tripStartDay, tripEndDay) {
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}/${tripStartDay}/${tripEndDay}?unitGroup=metric&include=days&key=P5UC3JS9UQS3H5UMQ2CEPZPSH&contentType=json`
  );

  const result = await response.json();
  return result.days;
}
