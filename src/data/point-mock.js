import constants from "../data/constants.js";
import random from "../utils/random.js";
import lorem from "../utils/lorem.js";

const MIN_OFFERS = 0;
const MAX_OFFERS = 5;

export default () => {
  let firstDate = random.randomDate();
  let secondDate = random.randomDate();

  return {
    type: random.getRandomArrayItem(constants.allPointTypes),
    city: random.getRandomArrayItem(constants.cities),
    offers: random.getRandomArray(constants.offers, MIN_OFFERS, MAX_OFFERS),
    description: lorem(),
    photoUrl: `http://picsum.photos/248/152?r=${Math.random()}`,
    start: Math.min(firstDate, secondDate),
    end: Math.max(firstDate, secondDate),
    price: random.random()
  };
};
