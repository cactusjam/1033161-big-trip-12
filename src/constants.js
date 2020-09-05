const EventMessage = {
  NO_EVENTS: `Click New Event to create your first point`,
  LOADING: `Loading...`,
};

const KeyboardKey = {
  ESCAPE: `Escape`,
  ESCAPE_IE: `Esc`,
};

const TRANSFER_TYPES = [
  `taxi`,
  `bus`,
  `train`,
  `ship`,
  `transport`,
  `drive`,
  `flight`
];

const ACTIVITY_TYPES = [
  `check-in`,
  `sightseeing`,
  `restaurant`
];

const TypeParticle = {
  ACTIVITY: `in`,
  TRANSFER: `to`,
};

const SortType = {
  DEFAULT: `Event`,
  TIME: `Time`,
  PRICE: `Price`
};

export {EventMessage, KeyboardKey, TypeParticle, TRANSFER_TYPES, ACTIVITY_TYPES, SortType};
