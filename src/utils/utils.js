const createItems = (elementsData, getHtml) => {
  const container = document.createDocumentFragment();
  container.innerHTML = ``;

  for (const elementData of elementsData) {
    container.innerHTML += getHtml(elementData);
  }

  return container.innerHTML;
};

const timeFormat = (date) => {
  return date.toLocaleTimeString(`en-GB`, {hour: `2-digit`, minute: `2-digit`, hour12: false});
};

const dayFormat = (date) => {
  return date.toLocaleDateString(`en`, {month: `short`, day: `2-digit`});
};

const convertDate = () => {
  let date = new Date();
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

const formatDiff = (startDate, endDate) => {
  const durationMiliseconds = endDate - startDate;
  const days = Math.floor(durationMiliseconds / 1000 / 60 / 60 / 24);
  const hours = Math.floor(durationMiliseconds / 1000 / 60 / 60);
  const minutes = durationMiliseconds / 1000 / 60 % 60;

  let result = ``;
  if (days > 0) {
    result += `${days}D `;
  }
  if (hours > 0) {
    result += `${hours}H `;
  }
  if (minutes > 0) {
    result += `${minutes}M`;
  }

  return result.trim();
};

export {createItems, timeFormat, dayFormat, getRandomArray, getRandomInteger, formatDiff, convertDate};
