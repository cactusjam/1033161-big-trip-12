const createItems = (elementsData, getHtml) => {
  const container = document.createDocumentFragment();
  container.innerHTML = ``;

  for (const elementData of elementsData) {
    container.innerHTML += getHtml(elementData);
  }

  return container.innerHTML;
};

const dateFormat = (date) => {
  return date.toISOString().slice(0, -8);
};

const timeFormat = (date) => {
  return date.toLocaleTimeString(`en-GB`, {hour: `2-digit`, minute: `2-digit`, hour12: false});
};

const dayFormat = (date) => {
  return date.toLocaleDateString(`en`, {month: `short`, day: `2-digit`});
};

export {createItems, dateFormat, timeFormat, dayFormat};
