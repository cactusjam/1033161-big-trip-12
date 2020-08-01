import {render} from "../utils/dom.js";

const createHiddenCaptionTemplate = (title) => {
  return (
    `<h2 class="visually-hidden">${title}</h2>`
  );
};

const renderBlock = (container, title, generateTemplate) => {
  render(container, createHiddenCaptionTemplate(title), `beforeend`);
  render(container, generateTemplate(), `beforeend`);
};

export {createHiddenCaptionTemplate, renderBlock};
