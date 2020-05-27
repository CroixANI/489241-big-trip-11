export default class Offer {
  constructor(type, name, price, pointType) {
    this.type = type;
    this.name = name;
    this.price = price;
    this.pointType = pointType;
  }

  toBackendModel() {
    return {
      title: this.name,
      price: this.price
    };
  }

  static parseOffer(data, pointType) {
    return new Offer(data.title.toLowerCase().replace(/\s/g, `-`), data.title, data.price, pointType);
  }

  static parseOffers(data) {
    return data.reduce((map, group) => {
      if (!map.has(group.type)) {
        map.set(group.type, group.offers.map((item) => Offer.parseOffer(item, group.type)));
      }

      return map;
    }, new Map());
  }
}
