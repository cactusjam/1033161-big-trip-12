import {KeyboardKey} from "../constants.js";

const escEventHandler = (evt) => {
  return (evt.key === KeyboardKey.ESCAPE || evt.key === KeyboardKey.ESCAPE_IE);
};

export {escEventHandler};
