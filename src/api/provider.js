import TripPoint from "../data/trip-point";

const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(backend, store) {
    this._backend = backend;
    this._store = store;
  }

  getPoints() {
    if (isOnline()) {
      return this._backend.getPoints()
        .then((points) => {
          points.forEach((point) => this._store.setItem(point.id, point.toBackendModel()));

          return points;
        });
    }

    const points = Object.values(this._store.getItems());
    return Promise.resolve(TripPoint.parsePoints(points));
  }

  getOffers() {
    if (isOnline()) {
      return this._backend.getOffers();
    }

    return Promise.reject(`not implemented`);
  }

  getDestinations() {
    if (isOnline()) {
      return this._backend.getDestinations();
    }

    return Promise.reject(`not implemented`);
  }

  updatePoint(id, data) {
    if (isOnline()) {
      return this._backend.updatePoint(id, data);
    }

    return Promise.reject(`not implemented`);
  }

  createPoint(data) {
    if (isOnline()) {
      return this._backend.createPoint(data);
    }

    return Promise.reject(`not implemented`);
  }

  deletePoint(id) {
    if (isOnline()) {
      return this._backend.deletePoint(id);
    }

    return Promise.reject(`not implemented`);
  }
}
