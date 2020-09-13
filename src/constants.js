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


const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

const FilterType = {
  EVERYTHING: `Everything`,
  FUTURE: `Future`,
  PAST: `Past`,
};

const InitialDayCounter = {
  ZERO: 0
};

const TabItem = {
  TABLE: `Table`,
  STATISTICS: `Stats`
};

export {EventMessage, KeyboardKey, TypeParticle, TRANSFER_TYPES, ACTIVITY_TYPES, SortType, UserAction, UpdateType, FilterType, InitialDayCounter, TabItem};
