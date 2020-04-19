export default class TripPoint {
  constructor(type, destination, offers, start, end, price, isFavorite) {
    this.type = type;
    this.destination = destination;
    this.offers = offers;
    this.start = start;
    this.end = end;
    this.price = price;
    this.isFavorite = isFavorite;
  }
}
