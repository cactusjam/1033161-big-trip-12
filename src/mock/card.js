import {
  getRandomArray,
  getRandomInteger
} from "../mock/utils.js";
import {
  getStartDate,
  getEndDate
} from "../mock/utils.js";

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

const mockedOffers = {
  "taxi": [
    {
      "title": "Upgrade to a business class",
      "price": 190
    },
    {
      "title": "Choose the radio station",
      "price": 30
    },
    {
      "title": "Choose temperature",
      "price": 170
    },
    {
      "title": "Drive quickly, I'm in a hurry",
      "price": 100
    },
    {
      "title": "Drive slowly",
      "price": 110
    }
  ],
  "bus": [
    {
      "title": "Infotainment system",
      "price": 50
    },
    {
      "title": "Order meal",
      "price": 100
    },
    {
      "title": "Choose seats",
      "price": 190
    }
  ],
  "train": [
    {
      "title": "Book a taxi at the arrival point",
      "price": 110
    },
    {
      "title": "Order a breakfast",
      "price": 80
    },
    {
      "title": "Wake up at a certain time",
      "price": 140
    }
  ],
  "flight": [
    {
      "title": "Choose meal",
      "price": 120
    },
    {
      "title": "Choose seats",
      "price": 90
    },
    {
      "title": "Upgrade to comfort class",
      "price": 120
    },
    {
      "title": "Upgrade to business class",
      "price": 120
    },
    {
      "title": "Add luggage",
      "price": 170
    },
    {
      "title": "Business lounge",
      "price": 160
    }
  ],
  "check-in": [
    {
      "title": "Choose the time of check-in",
      "price": 70
    },
    {
      "title": "Choose the time of check-out",
      "price": 190
    },
    {
      "title": "Add breakfast",
      "price": 110
    },
    {
      "title": "Laundry",
      "price": 140
    },
    {
      "title": "Order a meal from the restaurant",
      "price": 30
    }
  ],
  "sightseeing": [],
  "ship": [
    {
      "title": "Choose meal",
      "price": 130
    },
    {
      "title": "Choose seats",
      "price": 160
    },
    {
      "title": "Upgrade to comfort class",
      "price": 170
    },
    {
      "title": "Upgrade to business class",
      "price": 150
    },
    {
      "title": "Add luggage",
      "price": 100
    },
    {
      "title": "Business lounge",
      "price": 40
    }
  ],
  "transport": [],
  "drive": [
    {
      "title": "Choose comfort class",
      "price": 110
    },
    {
      "title": "Choose business class",
      "price": 180
    }
  ],
  "restaurant": [
    {
      "title": "Choose live music",
      "price": 150
    },
    {
      "title": "Choose VIP area",
      "price": 70
    }
  ],
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
  return {
    id: getRandomInteger(1, 4000),
    type: getRandomTypes(),
    destination: {
      name: getRandomCities(),
      photos: getRandomArray(photos),
      description: getRandomDescription(),
    },
    services: getRandomArray(services),
    startDate,
    endDate,
    price: getRandomInteger(5, 1000),
    isFavorite: Boolean(Math.round(Math.random()) * 0.5)
  };
};

const generateCards = (count) => new Array(count)
  .fill()
  .map(generateCard)
  .sort((a, b) => a.startDate - b.startDate);

export {
  generateCards,
  getRandomArray,
  getRandomDescription,
  photos,
  mockedOffers
};
