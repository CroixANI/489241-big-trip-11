const isOnline = () => {
  return window.navigator.onLine;
};

export default class Provider {
  constructor(backend) {
    this._backend = backend;
  }

  getPoints() {
    if (isOnline()) {
      return this._backend.getPoints();
    }

    return Promise.reject(`not implemented`);
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
