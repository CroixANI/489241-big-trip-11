import {filterPoints, sortPoints} from "../utils/filter.js";

export default class TripModel {
  constructor() {
    this._points = [];
    this._currentFilter = ``;
    this._onFilterChangeHandler = [];
    this._dataChangeHandlers = [];
    this._isInitialized = false;
  }

  getPoints() {
    return filterPoints(this._points, this._currentFilter);
  }

  getAllPoints() {
    return this._points;
  }

  getAllPointsSorted() {
    return sortPoints(this._points);
  }

  isInitialized() {
    return this._isInitialized;
  }

  setPoints(points) {
    this._isInitialized = true;
    this._points = Array.from(points);
    this._callHandlers(this._dataChangeHandlers);
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

  getFilter() {
    return this._currentFilter;
  }

  addPoint(point) {
    this._points = [].concat(this._points, point);
    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  setFilter(filter, isSilent = false) {
    if (filter !== this._currentFilter && !isSilent) {
      this._currentFilter = filter;
      this._callHandlers(this._onFilterChangeHandler);
    }
  }

  setOnFilterChangedHandler(handler) {
    this._onFilterChangeHandler.push(handler);
  }

  setOnDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  resetState() {
    this._currentFilter = ``;
    this._callHandlers(this._onFilterChangeHandler);
  }

  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
