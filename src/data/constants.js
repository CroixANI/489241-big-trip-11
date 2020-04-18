const TRANSFER_POINT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];
const ACTIVITY_POINT_TYPES = [`Check-in`, `Sightseeing`, `Restaurant`];
const ALL_POINT_TYPES = TRANSFER_POINT_TYPES.concat(ACTIVITY_POINT_TYPES);

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

const MONTH_SHORT_NAMES = [
  `Jan`,
  `Feb`,
  `Mar`,
  `Apr`,
  `May`,
  `Jun`,
  `Jul`,
  `Aug`,
  `Sep`,
  `Oct`,
  `Nov`,
  `Dec`,
];

const getActivityLabel = (activity) => activityToLabel[activity];

const RENDER_POSITIONS = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`
};

export default {
  ALL_POINT_TYPES,
  TRANSFER_POINT_TYPES,
  ACTIVITY_POINT_TYPES,
  MONTH_SHORT_NAMES,
  RENDER_POSITIONS,
  getActivityLabel
};
