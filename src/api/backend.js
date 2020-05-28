import Offer from "../data/offer.js";
import TripPoint from "../data/trip-point.js";
import Destination from "../data/destination.js";

const HTTP_METHODS = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const ENDPOINTS = {
  POINTS: `points`,
  DESTINATIONS: `destinations`,
  OFFERS: `offers`
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

export default class Backend {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._get(ENDPOINTS.POINTS, TripPoint.parsePoints);
  }

  getOffers() {
    return this._get(ENDPOINTS.OFFERS, Offer.parseOffers);
  }

  getDestinations() {
    return this._get(ENDPOINTS.DESTINATIONS, Destination.parseDestinations);
  }

  updatePoint(id, data) {
    return fetch(`${this._endPoint}/${ENDPOINTS.POINTS}/${id}`, {
      method: HTTP_METHODS.PUT,
      headers: {
        'Content-Type': `application/json`,
        'Authorization': this._authorization,
      },
      body: JSON.stringify(data.toBackendModel())
    })
    .then(checkStatus)
    .then((response) => response.json())
    .then((responseData) => TripPoint.parse(responseData))
    .catch((err) => {
      throw err;
    });
  }

  createPoint(data) {
    return fetch(`${this._endPoint}/${ENDPOINTS.POINTS}`, {
      method: HTTP_METHODS.POST,
      headers: {
        'Content-Type': `application/json`,
        'Authorization': this._authorization,
      },
      body: JSON.stringify(data.toBackendModel())
    })
    .then(checkStatus)
    .then((response) => response.json())
    .then((responseData) => TripPoint.parse(responseData))
    .catch((err) => {
      throw err;
    });
  }

  deletePoint(id) {
    return fetch(`${this._endPoint}/${ENDPOINTS.POINTS}/${id}`, {
      method: HTTP_METHODS.DELETE,
      headers: {
        'Content-Type': `application/json`,
        'Authorization': this._authorization,
      }
    })
    .then(checkStatus)
    .catch((err) => {
      throw err;
    });
  }

  _get(appendUrl, convertData) {
    return fetch(`${this._endPoint}/${appendUrl}`, {
      method: HTTP_METHODS.GET,
      headers: {
        'Content-Type': `application/json`,
        'Authorization': this._authorization,
      },
    })
    .then(checkStatus)
    .then((response) => response.json())
    .then((data) => convertData(data))
    .catch((err) => {
      throw err;
    });
  }
}
