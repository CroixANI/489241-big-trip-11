import random from "../utils/random.js";
import Destination from "../data/destination.js";

const MIN_PHOTOS = 0;
const MAX_PHOTOS = 5;

const createDestinationMock = (backend, cityName) => {
  let photos = [];
  if (!cityName) {
    cityName = random.getRandomArrayItem(backend.getDestinations());
  }
  const count = random.random(MIN_PHOTOS, MAX_PHOTOS);
  for (let index = 0; index < count; index++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return new Destination(cityName, random.lorem(), photos);
};

export default createDestinationMock;

