export function sortByDate(tripsData, sort = "asc") {
  let sortedData;

  if (sort === "desc") {
    sortedData = tripsData.sort(function (a, b) {
      var c = new Date(a.start.split(".").reverse().join("-"));
      var d = new Date(b.start.split(".").reverse().join("-"));

      return d - c;
    });
  } else {
    sortedData = tripsData.sort(function (a, b) {
      var c = new Date(a.start.split(".").reverse().join("-"));
      var d = new Date(b.start.split(".").reverse().join("-"));

      return c - d;
    });
  }

  return sortedData;
}
