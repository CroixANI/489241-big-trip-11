import backend from "../data/backend.js";
import lorem from "../utils/lorem.js";
import random from "../utils/random.js";
import createDestination from "../data/destination.js";

const MIN_PHOTOS = 0;
const MAX_PHOTOS = 5;

const createDestinationMock = () => {
  let photos = [];
  const count = random.random(MIN_PHOTOS, MAX_PHOTOS);
  for (let index = 0; index < count; index++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return createDestination(random.getRandomArrayItem(backend.getDestinations()), lorem(), photos);
};

export default createDestinationMock;

