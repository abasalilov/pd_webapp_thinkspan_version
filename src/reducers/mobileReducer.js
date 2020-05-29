/* eslint-disable no-case-declarations */
import { RESIZE_EVENT } from "../actions";
import { isMobile, isUndefined } from '../utils'

const initialState = false;
export default (state = initialState, action) => {
  switch (action.type) {
    case RESIZE_EVENT:
      if (isUndefined(action.payload)){
        return initialState;
      }
      const newState = isMobile(action.payload);
      return newState;
    default:
      return state;
  }
};