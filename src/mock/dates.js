import {generateCards} from "../mock/card.js";

const CARD_COUNT = 5;

const dates = [
  {
    startDate: new Date(`2019-03-18T10:30`),
    endDate: new Date(`2019-03-18T13:40`),
  },
  {
    startDate: new Date(`2019-03-19T15:30`),
    endDate: new Date(`2019-03-19T16:40`),
  },
  {
    startDate: new Date(`2019-03-20T18:30`),
    endDate: new Date(`2019-03-21T13:48`),
  }
];

dates.forEach((date, index) => {
  date.cards = generateCards(CARD_COUNT, date);
  date.counter = index + 1;
});

export {dates};
