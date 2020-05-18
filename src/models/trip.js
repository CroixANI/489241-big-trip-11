import {filterPoints} from "../utils/filter.js";

export default class TripModel {
  constructor(points) {
    this._points = points;
    this._currentFilter = ``;
    this._onFilterChangeHandler = null;
  }

  getPoints() {
    return filterPoints(this._points, this._currentFilter);
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
    if (this._onFilterChangeHandler) {
      this._onFilterChangeHandler();
    }
  }

  setOnFilterChangeHandler(handler) {
    this._onFilterChangeHandler = handler;
  }
}
