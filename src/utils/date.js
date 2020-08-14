import {getRandomInteger} from "../mock/utils.js";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const convertDate = () => {
  const date = new Date();
  return (new Intl.DateTimeFormat(`en-US`, {year: `2-digit`, month: `2-digit`, day: `2-digit`, hour: `2-digit`, minute: `2-digit`, hour12: false}).format(date).replace(`,`, ``));
};

const getTimeFormat = (date) => {
  return date.toLocaleTimeString(`en-GB`, {hour: `2-digit`, minute: `2-digit`, hour12: false});
};

const getDayFormat = (date) => {
  return date.toLocaleDateString(`en`, {month: `short`, day: `2-digit`});
};

const convertDateNumbers = (value) => String(value).padStart(2, `0`);

const formatDuration = (duration) => {

  const durationDays = Math.floor(duration / DAY);
  const durationDaysString = durationDays > 0 ? `${convertDateNumbers(durationDays)}D` : ``;

  const durationHours = Math.floor(duration / HOUR % 24);
  const durationHoursString = durationHours > 0 ? `${convertDateNumbers(durationHours)}H` : ``;

  const durationMinutes = Math.floor(duration / MINUTE % 60);
  const durationMinutesString = durationMinutes > 0 ? `${convertDateNumbers(durationMinutes)}M` : ``;

  return `${durationDaysString} ${durationHoursString} ${durationMinutesString}`;
};

const getFirstUpperCase = (element) => element[0].toUpperCase() + element.slice(1);

const getStartDate = () => {
  const maxDayRange = 4;
  const dayRange = getRandomInteger(1, maxDayRange);
  const currentDate = new Date();
  currentDate.setHours(getRandomInteger(0, 23), getRandomInteger(0, 59));
  currentDate.setDate(currentDate.getDate() + dayRange);
  return new Date(currentDate);
};

const getEndDate = (date) => {
  const startDate = new Date(date);
  const min = new Date(startDate).getTime();
  const max = new Date(startDate.setHours(36, 59, 59, 999)).getTime();
  const endDate = new Date(getRandomInteger(min, max));
  return new Date(endDate);
};

const convertDateToDay = (date) => date.toISOString().slice(0, 10);

const groupCardsByDay = (sortedCards) => {
  const reduceCardByDay = (days, card) => {
    const dayDate = convertDateToDay(card.startDate);

    if (Array.isArray(days[dayDate])) {
      days[dayDate].push(card);
    } else {
      days[dayDate] = [card];
    }

    return days;
  };

  return sortedCards.reduce(reduceCardByDay, {});
};

export {MINUTE, HOUR, DAY, getTimeFormat, getDayFormat, convertDate, formatDuration, getFirstUpperCase, getStartDate, getEndDate, groupCardsByDay};
