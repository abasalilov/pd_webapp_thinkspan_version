/* eslint-disable no-case-declarations */
import { MODAL_OPEN, MODAL_CLOSE } from "../actions";

export default (state = false, action) => {
  switch (action.type) {
    case MODAL_OPEN:

      const newState = true;
      return newState;

  case MODAL_CLOSE:
    const modalState = false;
  return modalState;
    default:
      return state;
  }
};