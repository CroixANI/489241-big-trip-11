import Offer from "./offer.js";
import Destination from "./destination.js";
import dateFormat from "../utils/date-format.js";

export default class TripPoint {
  constructor(id, type, destination, offers, start, end, price, isFavorite) {
    this.id = id;
    this.type = type || ``;
    this.destination = destination || new Destination();
    this.offers = offers || [];
    this.start = start || new Date();
    this.end = end || new Date();
    this.price = !price ? 0 : price;
    this.isFavorite = !!isFavorite;
    this.isNew = !type;
  }

  toBackendModel() {
    return {
      "id": this.id,
      "base_price": this.price,
      "date_from": this.start.toISOString(),
      "date_to": this.end.toISOString(),
      "is_favorite": this.isFavorite,
      "type": this.type,
      "destination": this.destination.toBackendModel(),
      "offers": this.offers.map((item) => item.toBackendModel())
    };
  }

  static parse(data) {
    return new TripPoint(
        data.id,
        data.type,
        Destination.parse(data.destination),
        data.offers.map((offer) => Offer.parse(offer)),
        dateFormat.parseDateISO8601(data.date_from),
        dateFormat.parseDateISO8601(data.date_to),
        data.base_price,
        Boolean(data.is_favorite));
  }

  static parsePoints(data) {
    return data.map((item) => {
      return TripPoint.parse(item);
    });
  }

  static clone(data) {
    return TripPoint.parse(data.toBackendModel());
  }
}
