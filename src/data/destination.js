export default class Destination {
  constructor(city, description, photos) {
    this.city = city || ``;
    this.description = description || ``;
    this.photos = photos || [];
  }
}
