import moment from "moment";

const isDate = (date) => date instanceof Date;

const getTimeFormat = (date) => moment(date).format(`HH:mm`);

const getDayFormat = (date) => moment(date).format(`MMM D`);

const convertDateNumbers = (value) => String(value).padStart(2, `0`);

const convertDate = (date) => isDate(date) ? moment(date).format(`DD/MM/YY HH:mm`) : ``;

const formatDuration = (start, end) => {
  const momentDiff = moment(end).diff(moment(start));
  const momentDuration = moment.duration(momentDiff);

  const duration = {
    days: momentDuration.get(`days`) > 0 ? `${convertDateNumbers(momentDuration.get(`days`))}D` : ``,
    hours: momentDuration.get(`days`) > 0 || momentDuration.get(`hours`) > 0 ? `${convertDateNumbers(momentDuration.get(`hours`))}H` : ``,
    minutes: momentDuration.get(`minutes`) > 0 ? `${convertDateNumbers(momentDuration.get(`minutes`))}M` : ``,
  };
  return `${duration.days} ${duration.hours} ${duration.minutes}`;
};

const convertDateToDay = (date) => {
  return `${date.getDate()}${date.getMonth()}${date.getFullYear()}`;
};

const groupCardsByDay = (cardsCollections) => {
  const reduceCardByDay = (days, card) => {
    const dayDate = convertDateToDay(card.startDate);

    if (Array.isArray(days[dayDate])) {
      days[dayDate].push(card);
    } else {
      days[dayDate] = [card];
    }

    return days;
  };

  return cardsCollections.reduce(reduceCardByDay, {});
};

const convertDateToISOString = (date) => moment(date).format();


export {getTimeFormat, getDayFormat, convertDate, formatDuration, groupCardsByDay, convertDateToISOString};
