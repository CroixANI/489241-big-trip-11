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

  static parse(data) {
    return new Offer(data.title.toLowerCase().replace(/\s/g, `-`), data.title, data.price);
  }

  static parseOffers(data) {
    return data.reduce((map, group) => {
      if (!map.has(group.type)) {
        map.set(group.type, group.offers.map((item) => Offer.parse(item)));
      }

      return map;
    }, new Map());
  }
}
