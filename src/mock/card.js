import {dates} from "../mock/const.js";

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
    `Bus`,
    `Taxi`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,
    `Check`,
    `Sightseeing`,
    `Restaurant`
  ];
  const randomIndex = getRandomInteger(0, Types.length - 1);

  return Types[randomIndex];
};

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
  const descriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`

  const splittedText = descriptions.split(`.`);
  const randomIndex = getRandomInteger(0, splittedText.length - 1);

  return splittedText.slice(0, randomIndex);
};

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
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

// const getRandomDate = () => {
//   const currentDate = new Date();
//   currentDate.setDate(currentDate.getDate() + 1);
//   return new Date(currentDate);
// };

const generateCard = (dateIndex) => {
  return {
    type: getRandomTypes(),
    city: getRandomCities(),
    photos: `http://picsum.photos/248/152?r=${Math.random()}`,
    description: getRandomDescription(),
    services: getRandomArray(services),
    startDate: dates[dateIndex].startDate,
    endDate: dates[dateIndex].endDate,
    price: getRandomInteger(5, 1000)
  };
};

const generateCards = (count, dateIndex) => {
  let cards = [];

  for (let i = 0; i < count; i++) {
    cards.push(generateCard(dateIndex));
  }

  return cards;
  // return new Array(count).fill().map(generateCard(dateIndex));
};

export {generateCards};
