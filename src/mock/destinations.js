import {getRandomArray, getRandomInteger} from "../mock/utils.js";

const сities = [
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

const photos = [
  `img/photos/1.jpg`,
  `img/photos/2.jpg`,
  `img/photos/3.jpg`,
  `img/photos/4.jpg`,
  `img/photos/5.jpg`,
];

const getRandomDescription = () => {
  const descriptions = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

  const splittedText = descriptions.split(`.`);
  const randomIndex = getRandomInteger(0, splittedText.length - 1);

  return splittedText.slice(0, randomIndex);
};

const destinations = сities.map((cityName) => {
  return {
    name: cityName,
    photos: getRandomArray(photos),
    description: getRandomDescription(),
  };
});

export {destinations};
