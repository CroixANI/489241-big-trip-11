export default class Destination {
  constructor(city, description, photos) {
    this.city = city || ``;
    this.description = description || ``;
    this.photos = photos || [];
  }

  toBackendModel() {
    return {
      name: this.city,
      description: this.description,
      pictures: this.photos.map((photo) => {
        return {
          src: photo.url,
          description: photo.title
        };
      })
    };
  }

  static parseDestination(data) {
    return new Destination(data.name, data.description, data.pictures.map((picture) => {
      return {
        url: picture.src,
        title: picture.description
      };
    }));
  }

  static parseDestinations(data) {
    return data.map((item) => {
      return Destination.parseDestination(item);
    });
  }
}
