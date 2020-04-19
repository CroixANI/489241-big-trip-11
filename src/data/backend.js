import Offer from "./offer.js";
import pointMock from "../mocks/point.js";
import destinationMock from "../mocks/destination.js";
import random from "../utils/random.js";

const MIN_POINTS_MOCKS = 0;
const MAX_POINTS_MOCKS = 20;
const CITIES = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`, `Minsk`];
const OFFERS = [
  new Offer(`luggage`, `Add luggage`, 30),
  new Offer(`comfort`, `Switch to comfort class`, 100),
  new Offer(`meal`, `Add meal`, 15),
  new Offer(`seats`, `Choose seats`, 5),
  new Offer(`train`, `Travel by train`, 40),
  new Offer(`uber`, `Order Uber`, 20)
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
