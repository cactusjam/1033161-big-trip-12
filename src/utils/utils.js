import {MINUTE, HOUR, DAY} from "../constants.js";
const getTimeFormat = (date) => {
  return date.toLocaleTimeString(`en-GB`, {hour: `2-digit`, minute: `2-digit`, hour12: false});
};

const getDayFormat = (date) => {
  return date.toLocaleDateString(`en`, {month: `short`, day: `2-digit`});
};

const convertDate = () => {
  const date = new Date();
  return (new Intl.DateTimeFormat(`en-US`, {year: `2-digit`, month: `2-digit`, day: `2-digit`, hour: `2-digit`, minute: `2-digit`, hour12: false}).format(date).replace(`,`, ``));
};

const getRandomElement = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const getRandomArray = (array) => {
  let newArrayLength = getRandomInteger(0, array.length);
  const newArray = [];
  while (newArrayLength > newArray.length) {
    const randomElement = getRandomElement(array);
    if (newArray.includes(randomElement) === false) {
      newArray.push(randomElement);
    }
  }
  return (newArray);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const convertDateNumbers = (value) => String(value).padStart(2, `0`);

const formatDiff = (startDate, endDate) => {
  const durationMiliseconds = endDate - startDate;
  const days = Math.floor(durationMiliseconds / DAY);
  const hours = Math.floor((durationMiliseconds - days * DAY) / HOUR);
  const minutes = Math.floor(durationMiliseconds - days * DAY - hours * HOUR) / MINUTE;

  let result = ``;
  if (days > 0) {
    result += `${convertDateNumbers(days)}D `;
  }
  if (hours >= 0) {
    result += `${convertDateNumbers(hours)}H `;
  }
  if (minutes >= 0) {
    result += `${convertDateNumbers(minutes)}M`;
  }

  return result;
};

const getFirstUpperCase = (element) => element[0].toUpperCase() + element.slice(1);

export {getTimeFormat, getDayFormat, getRandomArray, getRandomInteger, formatDiff, convertDate, getFirstUpperCase};
