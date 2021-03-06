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

const getDurationInHours = (start, end) => {
  const duration = moment.duration(moment(end).diff(moment(start)));
  return Math.round(duration.asHours());
};

const getDuration = (start, end) => {
  const totalMilliseconds = end - start;
  const totalSeconds = Math.floor(totalMilliseconds / MILLISECONDS_IN_SECOND);
  const totalMinutes = Math.floor(totalSeconds / SECONDS_IN_MINUTE);
  const totalHours = Math.floor(totalMinutes / MINUTES_IN_HOUR);
  const totalDays = Math.floor(totalHours / HOURS_IN_DAY);

  const result = {};
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
