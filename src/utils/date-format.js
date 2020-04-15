import constants from "../data/constants.js";

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());
  return `${hours}:${minutes}`;
};

const formatDate = (date) => {
  return `${date.getDate()} ${constants.monthShortNames[date.getMonth()]}`;
};

const toIsoString = (date) => date.toISOString();

export default {
  formatTime,
  formatDate,
  toIsoString
};
