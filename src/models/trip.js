export default class Trip {
  constructor() {
    this._points = [];
  }

  getPoints() {
    return this._tasks;
  }

  setPoints(tasks) {
    this._tasks = Array.from(tasks);
  }
}