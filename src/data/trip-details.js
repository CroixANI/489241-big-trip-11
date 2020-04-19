import dateFormat from "../utils/date-format.js";

const buildTripTitle = (orderedPoints) => {
  return orderedPoints.reduce((dayTitle, tripPoint) => {
    dayTitle = `${dayTitle}${dayTitle.length > 0 ? ` — ` : ``}`;

    return dayTitle + tripPoint.destination.city;
  }, ``);
};

const createTripDetails = (orderedPoints) => {
  const title = buildTripTitle(orderedPoints);
  const startDate = orderedPoints[0].start;
  const endDate = orderedPoints[orderedPoints.length - 1].end;
  const isSameMonth = startDate.getMonth() === endDate.getMonth();
  const period = `${dateFormat.formatDate(startDate)} - ${isSameMonth ? endDate.getMonth() : dateFormat.formatDate(endDate)}`;
  const totalCost = orderedPoints.reduce((totalInDay, tripPoint) => {
    return totalInDay + tripPoint.price;
  }, 0);

  return {
    title,
    totalCost,
    period
  };
};

export default createTripDetails;
