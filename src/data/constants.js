const TRANSFER_POINT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const ACTIVITY_POINT_TYPES = [`Check-in`, `Sightseeing`, `Restaurant`];
const ALL_POINT_TYPES = TRANSFER_POINT_TYPES.concat(ACTIVITY_POINT_TYPES);
const CITIES = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`, `Minsk`];
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
  "Restaurant": `Restaurant in`,
};

const createOffer = (type, name, price) => {
  return {type, name, price};
};

const OFFERS = [
  createOffer(`luggage`, `Add luggage`, 30),
  createOffer(`comfort`, `Switch to comfort class`, 100),
  createOffer(`meal`, `Add meal`, 15),
  createOffer(`seats`, `Choose seats`, 5),
  createOffer(`train`, `Travel by train`, 40),
  createOffer(`uber`, `Order Uber`, 20)
];

const MONTH_SHORT_NAMES = [
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
  ALL_POINT_TYPES,
  TRANSFER_POINT_TYPES,
  ACTIVITY_POINT_TYPES,
  CITIES,
  OFFERS,
  MONTH_SHORT_NAMES,
  getActivityLabel
};
