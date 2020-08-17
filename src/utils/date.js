
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const HOURS_PER_DAY = 24;
const MINUTES_PER_HOUR = 60;

const getTimeFormat = (date) => {
  return date.toLocaleTimeString(`en-GB`, {hour: `2-digit`, minute: `2-digit`, hour12: false});
};

const getDayFormat = (date) => {
  return date.toLocaleDateString(`en`, {month: `short`, day: `2-digit`});
};

const convertDateNumbers = (value) => String(value).padStart(2, `0`);

const convertDate = (time) => {
  return `${convertDateNumbers(time.getDate())}/${convertDateNumbers(time.getMonth())}/${convertDateNumbers(time.getFullYear().toString().substr(-2))} ${convertDateNumbers(time.getHours())}:${convertDateNumbers(time.getMinutes())}`;
};

const formatDuration = (duration) => {

  const durationDays = Math.floor(duration / DAY);
  const durationDaysResult = durationDays > 0 ? `${convertDateNumbers(durationDays)}D` : ``;

  const durationHours = Math.floor(duration / HOUR % HOURS_PER_DAY);
  const durationHoursResult = durationDays > 0 || durationHours > 0 ? `${convertDateNumbers(durationHours)}H` : ``;

  const durationMinutes = Math.floor(duration / MINUTE % MINUTES_PER_HOUR);
  const durationMinutesResult = durationMinutes > 0 ? `${convertDateNumbers(durationMinutes)}M` : ``;

  return `${durationDaysResult} ${durationHoursResult} ${durationMinutesResult}`;
};

const getFirstUpperCase = (element) => element[0].toUpperCase() + element.slice(1);

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

export {getTimeFormat, getDayFormat, convertDate, formatDuration, getFirstUpperCase, groupCardsByDay};
