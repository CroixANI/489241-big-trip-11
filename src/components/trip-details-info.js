const appendString = (sourceStr, appendStr) => {
  if (sourceStr.length > 0) {
    return sourceStr + appendStr;
  }

  return sourceStr;
};

const buildTripTitle = (trip) => {
  return trip.days.reduce((tripTitle, tripDay) => {
    tripTitle = appendString(tripTitle, ` — `);

    return tripTitle + tripDay.points.reduce((dayTitle, tripPoint) => {
      dayTitle = appendString(dayTitle, ` — `);

      return dayTitle + tripPoint.destination.city;
    }, ``);
  }, ``);
};

const createTripInfoTemplate = (trip) => {
  const title = buildTripTitle(trip);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>

      <p class="trip-info__dates">${``}</p>
    </div>`
  );
};

export default createTripInfoTemplate;

