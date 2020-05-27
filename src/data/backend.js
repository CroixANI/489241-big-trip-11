import Offer from "./offer.js";
import TripPoint from "./trip-point.js";
import Destination from "./destination.js";

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

export default class Backend {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._fetch(HTTP_METHODS.GET, ENDPOINTS.POINTS, TripPoint.parseTripPoints);
  }

  getOffers() {
    return this._fetch(HTTP_METHODS.GET, ENDPOINTS.OFFERS, Offer.parseOffers);
  }

  getDestinations() {
    return this._fetch(HTTP_METHODS.GET, ENDPOINTS.DESTINATIONS, Destination.parseDestinations);
  }

  _fetch(method, appendUrl, convertData) {
    return fetch(`${this._endPoint}/${appendUrl}`, {
      method,
      headers: {
        'Content-Type': `application/json`,
        'Authorization': this._authorization,
      },
    })
    .then((response) => response.json())
    .then((data) => convertData(data));
  }
}
