const Activities = {
  CHECK_IN: `check-in`,
  SIGHTSEEING: `sightseeing`,
  RESTAURANT: `restaurant`
};

const getParticle = (type) => {
  return (type === Activities.CHECK_IN || type === Activities.SIGHTSEEING || type === Activities.RESTAURANT) ? ` in ` : ` to `;
};

export {getParticle};
