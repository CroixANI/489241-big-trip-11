const transferPointTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const activityPointTypes = [`Check-in`, `Sightseeing`, `Restaurant`];
const allPointTypes = transferPointTypes.concat(activityPointTypes);
const cities = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`, `Minsk`];
const activityToLabel = {
  "Taxi": `Taxi to`,
  "Bus": `Bus to`,
  "Train": `Train to`,
  "Ship": `Ship to`,
  "Transport": `Transport to`,
  "Drive": `Drive to`,
  "Flight": `Flight to`,
  "Check-in": `Check-in in`,
  "Sightseeing": `Sightseeing in`,
  "Restaurant": `Restaurant at`,
};

const createOffer = (type, name, price) => {
  return {type, name, price};
};

const offers = [
  createOffer(`luggage`, `Add luggage`, 30),
  createOffer(`comfort`, `Switch to comfort class`, 100),
  createOffer(`meal`, `Add meal`, 15),
  createOffer(`seats`, `Choose seats`, 5),
  createOffer(`train`, `Travel by train`, 40),
  createOffer(`uber`, `Order Uber`, 20)
];

const monthShortNames = [
  `JAN`,
  `FEB`,
  `MAR`,
  `APR`,
  `MAY`,
  `JUN`,
  `JUL`,
  `AUG`,
  `SEP`,
  `OCT`,
  `NOV`,
  `DEC`,
];

const getActivityLabel = (activity) => activityToLabel[activity];

export default {
  allPointTypes,
  transferPointTypes,
  activityPointTypes,
  cities,
  offers,
  monthShortNames,
  getActivityLabel
};
