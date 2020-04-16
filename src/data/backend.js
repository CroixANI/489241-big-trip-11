import offer from "../mocks/offer.js";
import pointMock from "../mocks/point.js";
import destinationMock from "../mocks/destination.js";
import random from "../utils/random.js";

const MIN_POINTS_MOCKS = 15;
const MAX_POINTS_MOCKS = 20;
const CITIES = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`, `Minsk`];
const OFFERS = [
  offer(`luggage`, `Add luggage`, 30),
  offer(`comfort`, `Switch to comfort class`, 100),
  offer(`meal`, `Add meal`, 15),
  offer(`seats`, `Choose seats`, 5),
  offer(`train`, `Travel by train`, 40),
  offer(`uber`, `Order Uber`, 20)
];

const getPoints = () => {
  const count = random.random(MIN_POINTS_MOCKS, MAX_POINTS_MOCKS);
  let result = [];

  for (let index = 0; index < count; index++) {
    result.push(pointMock());
  }

  return result;
};

const getOffers = () => OFFERS;

const getDestinations = () => CITIES;

const getDestinationDetails = (city) => destinationMock(city);

export default {
  getPoints,
  getOffers,
  getDestinations,
  getDestinationDetails
};
