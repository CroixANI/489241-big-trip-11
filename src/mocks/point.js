import constants from "../data/constants.js";
import TripPoint from "../data/trip-point.js";
import createDestinationMock from "../mocks/destination.js";
import random from "../utils/random.js";

const MIN_PRICE = 3;
const MAX_PRICE = 1000;

const createTripPointMock = (backend) => {
  let firstDate = random.randomDate();
  let secondDate = random.randomDate();
  let type = random.getRandomArrayItem(constants.ALL_POINT_TYPES);
  let destination = createDestinationMock(backend);
  let offers = backend.getOffersByType(type);
  let start = new Date(Math.min(firstDate, secondDate));
  let end = new Date(Math.max(firstDate, secondDate));
  let price = random.random(MIN_PRICE, MAX_PRICE);
  let isFavorite = random.random(0, 1) === 1;

  return new TripPoint(type, destination, offers, start, end, price, isFavorite);
};

export default createTripPointMock;

