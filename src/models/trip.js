import {filterPoints} from "../utils/filter.js";

export default class TripModel {
  constructor(points) {
    this._points = points;
    this._currentFilter = ``;
    this._onFilterChangeHandler = null;
    this._dataChangeHandlers = [];
  }

  getPoints() {
    return filterPoints(this._points, this._currentFilter);
  }

  setPoints(points) {
    this._points = Array.from(points);
  }

  updatePoint(id, point) {
    const index = this._points.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), point, this._points.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  removePoint(id) {
    const index = this._points.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    this._points = [].concat(this._points.slice(0, index), this._points.slice(index + 1));
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addPoint(point) {
    this._points = [].concat(this._points, point);
    this._callHandlers(this._dataChangeHandlers);
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

  setOnDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
