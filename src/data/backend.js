import Offer from "./offer.js";
import TripPoint from "./trip-point.js";
import Destination from "./destination.js";
import dateFormat from "../utils/date-format.js";

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

const convertOffer = (json) =>
  new Offer(``, json.title, json.price);

const convertOffers = (json) => {
  return json.offers.map((offer) => {
    return new Offer(json.type, offer.title, offer.price);
  });
};

const convertDestination = (json) => {
  return new Destination(json.name, json.description, json.pictures.map((picture) => {
    return {
      url: picture.src,
      title: picture.description
    };
  }));
};

const convertTripPoint = (json) => {
  return new TripPoint(
      json.id,
      json.type,
      convertDestination(json.destination),
      json.offers.map((offer) => convertOffer(offer)),
      dateFormat.parseDateISO8601(json.date_from),
      dateFormat.parseDateISO8601(json.date_to),
      json.base_price,
      Boolean(json.is_favorite));
};

export default class Backend {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getPoints() {
    return this._fetch(HTTP_METHODS.GET, ENDPOINTS.POINTS, convertTripPoint);
  }

  getOffers() {
    return this._fetch(HTTP_METHODS.GET, ENDPOINTS.OFFERS, convertOffers);
  }

  getDestinations() {
    return this._fetch(HTTP_METHODS.GET, ENDPOINTS.DESTINATIONS, convertDestination);
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
    .then((data) => data.map((dataItem) => {
      return convertData(dataItem);
    }));
  }
}
