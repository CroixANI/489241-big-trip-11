import constants from "../data/constants.js";
import random from "../utils/random.js";
import lorem from "../utils/lorem.js";

const MIN_FEATURES = 1;
const MAX_FEATURES = 5;

export default () => {
  let firstDate = random.randomDate();
  let secondDate = random.randomDate();

  return {
    type: random.getRandomArrayItem(constants.allPointTypes),
    city: random.getRandomArrayItem(constants.cities),
    features: random.getRandomArray(constants.features, MIN_FEATURES, MAX_FEATURES),
    description: lorem(),
    photoUrl: `http://picsum.photos/248/152?r=${Math.random()}`,
    start: Math.min(firstDate, secondDate),
    end: Math.max(firstDate, secondDate),
    price: random.random()
  };
};
