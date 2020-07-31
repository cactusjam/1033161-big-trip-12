export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const createHiddenCaptionTemplate = (captionKind) => {
  let captionText = ``;

  if (captionKind === `switch`) {
    captionText = `Switch trip view`;
  } else if (captionKind === `filter`) {
    captionText = `Filter events`;
  }

  return (
    `<h2 class="visually-hidden">${captionText}</h2>`
  );
};
