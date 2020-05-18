import dateFormat from "../utils/date-format.js";

const compareStartDate = (firstPoint, secondPoint) => {
  return dateFormat.getDateNumberForGrouping(firstPoint.start) - dateFormat.getDateNumberForGrouping(secondPoint.start);
};

export default class TripModel {
  constructor(points) {
    this._points = points;
    this._currentFilter = ``;
  }

  getPoints() {
    return this._points.sort(compareStartDate);
  }

  setPoints(points) {
    this._points = Array.from(points);
  }

  updatePoint(id, point) {
    const index = this._points.indexOf((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), point, this._points.slice(index + 1));

    return true;
  }

  setFilter(filter) {
    this._currentFilter = filter;
  }
}
