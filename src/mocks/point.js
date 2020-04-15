import constants from "../data/constants.js";
import random from "../utils/random.js";
import lorem from "../utils/lorem.js";

const MIN_OFFERS = 0;
const MAX_OFFERS = 5;
const MIN_PRICE = 3;
const MAX_PRICE = 1000;

export default () => {
  let firstDate = random.randomDate();
  let secondDate = random.randomDate();

  return {
    type: random.getRandomArrayItem(constants.ALL_POINT_TYPES),
    city: random.getRandomArrayItem(constants.CITIES),
    offers: random.getRandomArray(constants.OFFERS, MIN_OFFERS, MAX_OFFERS),
    description: lorem(),
    photoUrl: `http://picsum.photos/248/152?r=${Math.random()}`,
    start: new Date(Math.min(firstDate, secondDate)),
    end: new Date(Math.max(firstDate, secondDate)),
    price: random.random(MIN_PRICE, MAX_PRICE)
  };
};
