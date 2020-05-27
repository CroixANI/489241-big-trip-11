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
    this.price = price === undefined ? 0 : price;
    this.isFavorite = isFavorite === undefined ? false : isFavorite;
    this.isNew = type === undefined ? true : false;
  }

  static parseTripPoint(data) {
    return new TripPoint(
        data.id,
        data.type,
        Destination.parseDestination(data.destination),
        data.offers.map((offer) => Offer.parseOffer(offer)),
        dateFormat.parseDateISO8601(data.date_from),
        dateFormat.parseDateISO8601(data.date_to),
        data.base_price,
        Boolean(data.is_favorite));
  }

  static parseTripPoints(data) {
    return data.map((item) => {
      return TripPoint.parseTripPoint(item);
    });
  }
}
