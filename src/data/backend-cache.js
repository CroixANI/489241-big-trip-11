export default class BackendCache {
  constructor() {
    this._destinations = [];
    this._offers = [];
  }

  static setDestinations(destinations) {
    BackendCache._destinations = destinations;
  }

  static getDestinations() {
    return BackendCache._destinations;
  }

  static getDestinationDetails(city) {
    return BackendCache.getDestinations().find((item) => item.city === city);
  }

  static setOffers(offers) {
    BackendCache._offers = offers;
  }

  static getOffersByPointType(type) {
    return BackendCache._offers.has(type) ? BackendCache._offers.get(type) : [];
  }
}
