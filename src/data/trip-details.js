import dateFormat from "../utils/date-format.js";

const buildTripTitle = (orderedPoints) => {
  return orderedPoints.reduce((dayTitle, tripPoint) => {
    dayTitle = `${dayTitle}${dayTitle.length > 0 ? ` — ` : ``}`;

    return dayTitle + tripPoint.destination.city;
  }, ``);
};

export default class TripDetails {
  constructor(tripModel) {
    const orderedPoints = tripModel.getPoints();
    if (orderedPoints.length === 0) {
      this.title = ``;
      this.totalCost = 0;
      this.period = ``;
    } else {
      this.title = buildTripTitle(orderedPoints);
      this.totalCost = orderedPoints.reduce((totalInDay, tripPoint) => {
        return totalInDay + tripPoint.price;
      }, 0);

      const startDate = orderedPoints[0].start;
      const endDate = orderedPoints[orderedPoints.length - 1].end;
      const isSameMonth = startDate.getMonth() === endDate.getMonth();
      this.period = `${dateFormat.formatDate(startDate)} - ${isSameMonth ? endDate.getMonth() : dateFormat.formatDate(endDate)}`;
    }
  }
}
