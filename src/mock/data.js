const Preposition = {
  CHECK_IN: `check-in`,
  SIGHTSEEING: `sightseeing`,
  RESTAURANT: `restaurant`
};

const getPreposition = (type) => {
  return (type === Preposition.CHECK_IN || type === Preposition.SIGHTSEEING || type === Preposition.RESTAURANT) ? ` in ` : ` to `;
};

export {getPreposition};
