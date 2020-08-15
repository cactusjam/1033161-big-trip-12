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
  const max = new Date(startDate.setHours(24, 59, 59, 999)).getTime();
  const endDate = new Date(getRandomInteger(min, max));
  return new Date(endDate);
};

export {getRandomArray, getRandomInteger, getStartDate, getEndDate};
