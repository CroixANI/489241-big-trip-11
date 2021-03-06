const TRANSFER_POINT_TYPES = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`];
const ACTIVITY_POINT_TYPES = [`check-in`, `sightseeing`, `restaurant`];
const ALL_POINT_TYPES = TRANSFER_POINT_TYPES.concat(ACTIVITY_POINT_TYPES);
const VISUALLY_HIDDEN_CLASS = `visually-hidden`;

const activityToLabel = {
  "taxi": `Taxi to`,
  "bus": `Bus to`,
  "train": `Train to`,
  "ship": `Ship to`,
  "transport": `Transport to`,
  "drive": `Drive to`,
  "flight": `Flight to`,
  "check-in": `Check-in in`,
  "sightseeing": `Sightseeing in`,
  "restaurant": `Restaurant in`,
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

const getActivityLabel = (activity) => activityToLabel[activity.toLowerCase()];

const RENDER_POSITIONS = {
  AFTER_BEGIN: `afterbegin`,
  BEFORE_END: `beforeend`,
  AFTER_END: `afterend`
};

const FilterType = {
  EVERYTHING: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`
};

const CONTROLS_DATE_FORMAT = `DD/MM/YYYY HH:mm`;

export default {
  ALL_POINT_TYPES,
  TRANSFER_POINT_TYPES,
  ACTIVITY_POINT_TYPES,
  MONTH_SHORT_NAMES,
  RENDER_POSITIONS,
  getActivityLabel,
  FilterType,
  CONTROLS_DATE_FORMAT,
  VISUALLY_HIDDEN_CLASS
};
