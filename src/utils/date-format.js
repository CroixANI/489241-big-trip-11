import constants from "../data/constants.js";

import moment from "moment";

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = 1440;
const HOURS_IN_DAY = 24;

const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

const formatDate = (date) => {
  return `${constants.MONTH_SHORT_NAMES[date.getMonth() - 1]} ${date.getDate()}`;
};

const formatDateToIso = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

const formatDateToInputValue = (date) => {
  return moment(date).format(`DD/MM/YYYY HH:mm`);
};

const getDateNumberForGrouping = (date) => {
  return date.getMonth() * 100 + date.getDate();
};

// more details here https://stackoverflow.com/questions/25150570/get-hours-difference-between-two-dates-in-moment-js
const getDurationInHours = (start, end) => {
  // small fix for dummy data
  let realStart = start;
  let realEnd = end;
  if (realStart > realEnd) {
    realStart = end;
    realEnd = start;
  }

  const duration = moment.duration(moment(realEnd).diff(moment(realStart)));
  return Math.round(duration.asHours());
};

// more details here https://medium.com/javascript-in-plain-english/find-difference-between-dates-in-javascript-80d9280d8598
const getDuration = (start, end) => {
  let totalMilliseconds = end - start;
  let totalSeconds = Math.floor(totalMilliseconds / MILLISECONDS_IN_SECOND);
  let totalMinutes = Math.floor(totalSeconds / SECONDS_IN_MINUTE);
  let totalHours = Math.floor(totalMinutes / MINUTES_IN_HOUR);
  let totalDays = Math.floor(totalHours / HOURS_IN_DAY);

  let result = {};
  result.days = totalDays;
  result.hours = totalHours - (result.days * HOURS_IN_DAY);
  result.minutes = totalMinutes - (result.hours * MINUTES_IN_HOUR) - (result.days * MINUTES_IN_DAY);

  return result;
};

const getFormattedDuration = (start, end) => {
  const duration = getDuration(start, end);
  if (duration.days > 0) {
    return `${duration.days}D ${duration.hours}H ${duration.minutes}M`;
  }

  if (duration.hours > 0) {
    return `${duration.hours}H ${duration.minutes}M`;
  }

  return `${duration.minutes}M`;
};

const getDateOnly = (date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());

const parseDate = (dateString) => new Date(moment(dateString, constants.CONTROLS_DATE_FORMAT).valueOf());

const parseDateISO8601 = (dateString) => new Date(moment(dateString).valueOf());

export default {
  formatTime,
  formatDate,
  formatDateToIso,
  getDurationInHours,
  getFormattedDuration,
  getDateNumberForGrouping,
  formatDateToInputValue,
  getDateOnly,
  parseDate,
  parseDateISO8601
};
