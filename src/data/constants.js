const transferPointTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const activityPointTypes = [`Check-in`, `Sightseeing`, `Restaurant`];
const allPointTypes = transferPointTypes.concat(activityPointTypes);
const cities = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`, `Minsk`];

const createFeature = (type, name, price) => {
  return {type, name, price};
};

const features = [
  createFeature(`luggage`, `Add luggage`, 30),
  createFeature(`comfort`, `Switch to comfort class`, 100),
  createFeature(`meal`, `Add meal`, 15),
  createFeature(`seats`, `Choose seats`, 5),
  createFeature(`train`, `Travel by train`, 40),
];

export default {
  allPointTypes,
  transferPointTypes,
  activityPointTypes,
  cities,
  features
};
