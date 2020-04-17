import dateFormat from "../utils/date-format.js";

const buildTripTitle = (trip) => {
  return trip.days.reduce((tripTitle, tripDay) => {
    tripTitle = `${tripTitle}${tripTitle.length > 0 ? ` — ` : ``}`;

    return tripTitle + tripDay.points.reduce((dayTitle, tripPoint) => {
      dayTitle = `${dayTitle}${dayTitle.length > 0 ? ` — ` : ``}`;

      return dayTitle + tripPoint.destination.city;
    }, ``);
  }, ``);
};

const createTripInfoTemplate = (trip) => {
  const title = buildTripTitle(trip);
  const startDate = trip.days[0].date;
  const endDate = trip.days[trip.days.length - 1].date;
  const isSameMonth = startDate.getMonth() === endDate.getMonth();
  const dates = `${dateFormat.formatDate(startDate)} - ${isSameMonth ? endDate.getMonth() : dateFormat.formatDate(endDate)}`;
  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">${title}</h1>

      <p class="trip-info__dates">${dates}</p>
    </div>`
  );
};

export default createTripInfoTemplate;

