import backend from "../data/backend.js";
import lorem from "../utils/lorem.js";
import random from "../utils/random.js";
import createDestination from "../data/destination.js";

const createDestinationMock = () => createDestination(
    random.getRandomArrayItem(backend.getDestinations()),
    lorem(),
    `http://picsum.photos/248/152?r=${Math.random()}`);

export default createDestinationMock;

