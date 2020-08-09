import {dates} from "../mock/const.js";
import {getRandomArray, getRandomInteger, getRandomElement} from "../utils/utils.js";

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

const types = [
  {
    name: `Taxi`,
    actionName: `Taxi to`,
    icon: `taxi`
  },
  {
    name: `Bus`,
    actionName: `Bus to`,
    icon: `bus`
  },
  {
    name: `Train`,
    actionName: `Train to`,
    icon: `train`
  },
  {
    name: `Ship`,
    actionName: `Ship to`,
    icon: `ship`
  },
  {
    name: `Transport`,
    actionName: `Transport to`,
    icon: `transport`
  },
  {
    name: `Drive`,
    actionName: `Drive to`,
    icon: `drive`
  },
  {
    name: `Flight`,
    actionName: `Flight to`,
    icon: `flight`
  },
  {
    name: `Check-in`,
    actionName: `Check into`,
    icon: `check`
  },
  {
    name: `Sightseeng`,
    actionName: `Sightseeng at`,
    icon: `sightseeing`
  },
  {
    name: `Restaurant`,
    actionName: `Eat at`,
    icon: `restaurant`
  }
];

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

const generateCard = (dateIndex) => {
  return {
    type: getRandomElement(types),
    city: getRandomCities(),
    photos: getRandomArray(photos),
    description: getRandomDescription(),
    services: getRandomArray(services),
    startDate: dates[dateIndex].startDate,
    endDate: dates[dateIndex].endDate,
    price: getRandomInteger(5, 1000),
    favorite: Boolean(Math.round(Math.random()) * 0.5)
  };
};

const generateCards = (count, dateIndex) => {
  let cards = [];

  for (let i = 0; i < count; i++) {
    cards.push(generateCard(dateIndex));
  }

  return cards;
};

export {generateCards};
