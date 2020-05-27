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
    return this._get(ENDPOINTS.POINTS, TripPoint.parseTripPoints);
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
    .then((response) => response.json())
    .then((responseData) => TripPoint.parseTripPoint(responseData));
  }

  _get(appendUrl, convertData) {
    return fetch(`${this._endPoint}/${appendUrl}`, {
      method: HTTP_METHODS.GET,
      headers: {
        'Content-Type': `application/json`,
        'Authorization': this._authorization,
      },
    })
    .then((response) => response.json())
    .then((data) => convertData(data));
  }
}
