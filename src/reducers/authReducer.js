/* eslint-disable no-case-declarations */
import { PD_LOGIN_SUBMIT, PD_LOGIN_ERROR, LOG_OUT_USER, UPDATE_ACTIVE_USER, UPDATE_VENDORS } from "../actions";
import { isUndefined, getUserData, getProviderData } from "../utils";

const initialState = {
  attempted: false,
  isLoggedIn: false,
  user: {},
  error: {}
};
export default (state = initialState, action) => {
  const currentState = { ...state };

  switch (action.type) {
    case UPDATE_VENDORS: 
    const updatedVendorState = {...currentState};
      updatedVendorState.token = action.payload.data.user.api.token;
      updatedVendorState.user = getUserData(action.payload.data.user);
      const updatedVendorArr = [];
      action.payload.data.user.searchHx.map(a => {
        const { year, make, model, vin } = a;
        updatedVendorArr.push({
          value: `${year} ${make} ${model} ${vin}`,
          text: `${year} ${make} ${model} ${vin}`
        });
      });
      updatedVendorState.user.napaAuto = action.payload.data.user.napaAuto;
      updatedVendorState.user.autozone = action.payload.data.user.autozone;
      updatedVendorState.user.advanceAuto = action.payload.data.user.advanceAuto;
      updatedVendorState.user.providers = action.payload.data.user.providers;
      updatedVendorState.isLoggedIn = true;
      updatedVendorState.error = {};
      updatedVendorState.attempted = true;
      updatedVendorState.user.searchHx = updatedVendorArr;
      return updatedVendorState;

    case UPDATE_ACTIVE_USER:
      // TODO: WHAT DOES UPDATED RETURN?
      const updatedSt = { ...currentState }
      updatedSt.token = action.payload.api.token;
      updatedSt.user = getUserData(action.payload);
      const updatedArr = [];
      action.payload.searchHx.map(a => {
        const { year, make, model, vin } = a;
        updatedArr.push({
          value: `${year} ${make} ${model} ${vin}`,
          text: `${year} ${make} ${model} ${vin}`
        });
      });
      updatedSt.user.napaAuto = action.payload.napaAuto;
      updatedSt.user.autozone = action.payload.autozone;
      updatedSt.user.advanceAuto = action.payload.advanceAuto;
      updatedSt.user.providers = action.payload.providers;
      updatedSt.isLoggedIn = true;
      updatedSt.error = {};
      updatedSt.attempted = true;
      updatedSt.user.searchHx = updatedArr;
    return updatedSt;

    case LOG_OUT_USER: 
    const logoutState = {...initialState};
    return logoutState;

    case PD_LOGIN_SUBMIT:
      if (isUndefined(action.payload)) {
        return currentState;
      }

      if (action.payload.message === "Login Failed") {
        currentState.error = "Login Failed";
        return currentState;
      }
      const loginSt = { ...state };
      const { payload } = action;
      const { api = {}, searchHx = [] } = payload;
      const { token = "" } = api;
      loginSt.token = token;
      loginSt.user = getUserData(payload);
      const { napaAuto = {}, autozone = {}, advanceAuto = {} } = payload;
      const arr = [];
      searchHx.map(a => {
        const { year, make, model, vin } = a;
        arr.push({
          value: `${year} ${make} ${model} ${vin}`,
          text: `${year} ${make} ${model} ${vin}`
        });
      });
      // loginSt.user.napaAuto = {
      //   napaStoreID: "700001896",
      //   napaProAcct: "D01313"
      // };
      loginSt.user.napaAuto = napaAuto;
      loginSt.user.autozone = autozone;
      loginSt.user.advanceAuto = advanceAuto;
      loginSt.user.providers = payload.providers;
      // loginSt.user.providers.push("napa");
      loginSt.isLoggedIn = true;
      loginSt.error = {};
      loginSt.attempted = true;
      loginSt.user.searchHx = arr;
      return loginSt;

    case PD_LOGIN_ERROR:
      if (isUndefined(action.err)) {
        return currentState;
      }
      const errSt = { ...state };
      errSt.error = action.err;
      errSt.isLoggedIn = false;
      errSt.attempted = true;
      errSt.user = {};
      errSt.providers = {};
      return errSt;
    default:
      return state;
  }
};
