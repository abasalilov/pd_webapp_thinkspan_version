/* eslint-disable no-case-declarations */
import {
  DECODE_VIN_ERR,
  DECODE_VIN,
  UPDATE_CAR_SPECS,
  updateCar
} from "../actions";
import { isUndefined } from "../utils";

const initialState = {
  vin: false,
  year: "",
  make: "",
  model: "",
  trim: "",
  engine: "",
  copy: {},
  attrs: [],
  confirmed: false
};
export default (state = initialState, action) => {
  const currentState = { ...state };

  switch (action.type) {
    case UPDATE_CAR_SPECS: {
      if (isUndefined(action.payload)) {
        return currentState;
      }
      const updatedCarSpecs = { ...state };

      updatedCarSpecs[action.payload.attr] = action.payload.value;
      if (updatedCarSpecs.confirmed) {
        const { year, make, model, trim } = updatedCarSpecs;
        updatedCarSpecs.attrs.push(["year", year]);
        updatedCarSpecs.attrs.push(["make", make]);
        updatedCarSpecs.attrs.push(["model", model]);
        updatedCarSpecs.attrs.push(["trim", trim]);
      }
      return updatedCarSpecs;
    }
    case DECODE_VIN:
      if (isUndefined(action.payload)) {
        return currentState;
      }

      const { Series, Trim, Model, vin } = action.payload;

      const decodeState = { ...state };
      decodeState.vin = vin;
      decodeState.make = action.payload["Manufacturer Name"];
      decodeState.year = action.payload["Model Year"];
      decodeState.body = action.payload["Body Class"];
      decodeState.model = Model;
      decodeState.trim = Trim;
      decodeState.subModel = Series;
      decodeState.confirmed = true;
      decodeState.attrs = Object.entries(action.payload);

      return decodeState;

    case DECODE_VIN_ERR:
      if (isUndefined(action.err)) {
        return currentState;
      }
      const errSt = { ...state };
      errSt.providers = {};
      return errSt;
    default:
      return state;
  }
};
