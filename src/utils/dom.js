const render = (container, element, position) => {
  switch (position) {
    case `beforebegin`:
      container.before(element);
      break;
    case `afterbegin`:
      container.prepend(element);
      break;
    case `beforeend`:
      container.append(element);
      break;
    case `afterend`:
      container.after(element);
      break;
  }
};

const createNode = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export {render, createNode};
