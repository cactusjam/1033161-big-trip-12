import {getRandomArray, getRandomInteger} from "../mock/utils.js";
import {getStartDate, getEndDate} from "../mock/utils.js";

const CARD_COUNT = 20;

const services = [
  {
    type: `luggage`,
    title: `Add luggage`,
    price: 30
  },
  {
    type: `comfort`,
    title: `Switch to comfort class`,
    price: 100
  },
  {
    type: `meal`,
    title: `Add meal`,
    price: 15
  },
  {
    type: `seats`,
    title: `Choose seats`,
    price: 5
  }
];

const getRandomTypes = () => {
  const Types = [
    `taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`
  ];
  const randomIndex = getRandomInteger(0, Types.length - 1);

  return Types[randomIndex];
};

const photos = [
  `img/photos/1.jpg`,
  `img/photos/2.jpg`,
  `img/photos/3.jpg`,
  `img/photos/4.jpg`,
  `img/photos/5.jpg`,
];

const getRandomCities = () => {
  const Cities = [
    `Amsterdam`,
    `Geneva`,
    `Chamonix`,
    `Oslo`,
    `Berlin`,
    `Vancouver`,
    `Tallin`,
    `Rotterdam`,
    `Trondheim`,
    `Oakland`
  ];
  const randomIndex = getRandomInteger(0, Cities.length - 1);

  return Cities[randomIndex];
};

const getRandomDescription = () => {
  const descriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const splittedText = descriptions.split(`.`);
  const randomIndex = getRandomInteger(0, splittedText.length - 1);

  return splittedText.slice(0, randomIndex);
};

const generateCard = () => {
  const startDate = getStartDate();
  const endDate = getEndDate(startDate);
  const duration = endDate - startDate;
  return {
    type: getRandomTypes(),
    destination: {
      name: getRandomCities(),
      photos: getRandomArray(photos),
      description: getRandomDescription(),
    },
    services: getRandomArray(services),
    startDate,
    endDate,
    duration,
    price: getRandomInteger(5, 1000),
    isFavorite: Boolean(Math.round(Math.random()) * 0.5)
  };
};

const cards = new Array(CARD_COUNT)
  .fill()
  .map(generateCard)
  .sort((a, b) => a.startDate - b.startDate);

export {cards};
