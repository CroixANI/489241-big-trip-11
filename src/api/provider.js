import TripPoint from "../data/trip-point";
import nanoid from "nanoid";

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
      return this._backend.updatePoint(id, data)
        .then((newPoint) => {
          this._store.setItem(newPoint.id, newPoint.toBackendModel());

          return newPoint;
        });
    }

    const localPoint = TripPoint.clone(Object.assign(data, {id}));
    this._store.setItem(id, localPoint.toBackendModel());

    return Promise.resolve(localPoint);
  }

  createPoint(data) {
    if (isOnline()) {
      return this._backend.createPoint(data)
        .then((newPoint) => {
          this._store.setItem(newPoint.id, newPoint.toBackendModel());

          return newPoint;
        });
    }

    const localNewPointId = nanoid();
    const localNewPoint = TripPoint.clone(Object.assign(data, {id: localNewPointId}));

    this._store.setItem(localNewPoint.id, localNewPoint.toBackendModel());

    return Promise.resolve(localNewPoint);
  }

  deletePoint(id) {
    if (isOnline()) {
      return this._backend.deletePoint(id)
        .then(() => this._store.removeItem(id));
    }

    this._store.removeItem(id);
    return Promise.resolve();
  }
}
