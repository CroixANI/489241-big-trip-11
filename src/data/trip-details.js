import dateFormat from "../utils/date-format.js";

const buildTripTitle = (orderedPoints) => {
  if (orderedPoints.length <= 3) {
    return orderedPoints.reduce((dayTitle, tripPoint) => {
      dayTitle = `${dayTitle}${dayTitle.length > 0 ? ` — ` : ``}`;

      return dayTitle + tripPoint.destination.city;
    }, ``);
  } else if (orderedPoints.length > 0) {
    const first = orderedPoints[0];
    const last = orderedPoints[orderedPoints.length - 1];
    return `${first.destination.city} — ... — ${last.destination.city}`;
  }

  return ``;
};

export default class TripDetails {
  constructor(tripModel) {
    const orderedPoints = tripModel.getAllPointsSorted();
    if (orderedPoints.length === 0) {
      this.title = ``;
      this.totalCost = 0;
      this.period = ``;
    } else {
      this.title = buildTripTitle(orderedPoints);
      this.totalCost = orderedPoints.reduce((totalInDay, tripPoint) => {
        return totalInDay + tripPoint.price + tripPoint.offers.reduce((totalInPoint, offer) => {
          return totalInPoint + offer.price;
        }, 0);
      }, 0);

      const startDate = orderedPoints[0].start;
      const endDate = orderedPoints[orderedPoints.length - 1].end;
      const isSameMonth = startDate.getMonth() === endDate.getMonth();
      this.period = `${dateFormat.formatDate(startDate)} - ${isSameMonth ? endDate.getMonth() : dateFormat.formatDate(endDate)}`;
    }
  }
}
