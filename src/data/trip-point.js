import Destination from "./destination.js";

export default class TripPoint {
  constructor(type, destination, offers, start, end, price, isFavorite) {
    this.id = String(new Date() + Math.random());
    this.type = type || ``;
    this.destination = destination || new Destination();
    this.offers = offers || [];
    this.start = start || new Date();
    this.end = end || new Date();
    this.price = price === undefined ? 0 : price;
    this.isFavorite = isFavorite === undefined ? false : isFavorite;
    this.isNew = type === undefined ? true : false;
  }
}
