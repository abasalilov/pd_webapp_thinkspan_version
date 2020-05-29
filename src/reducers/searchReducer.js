/* eslint-disable no-unused-vars */
/* eslint-disable no-case-declarations */
import {
  SEARCH_HX_LOAD,
  SEARCH_HX_FAIL,
  VIN_SEARCH,
  AA_VIN_SEARCH_RESULTS,
  EBAY_SEARCH,
  EBAY_SEARCH_ERR,
  AA_VIN_SEARCH_QUESTION,
  UPDATE_SEARCH_TERM,
  UPDATE_SEARCH_TERM_WCAR,
  UPDATE_CART,
  GET_EBAY_IMAGE,
  GET_CAR_MODELS,
  EBAY_EMPTY_RESULTS,
  CLEAR_SEARCH_ERRS
} from "../actions";
import { isUndefined, parseAAItems } from "../utils";

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const initialState = {
  hx: [
    { value: 2019, text: "2019" },
    { value: 2020, text: "2020" },
    { value: 2018, text: "2018" }
  ],
  vehicle: { az: "", napa: "", aa: "", pa: "" },
  parts: [],
  questions: [],
  showAAquestions: false,
  showAAresults: false,
  searchTerm: "",
  termSelected: false,
  selectedItemUrl: "",
  ebay: {
    parts: []
  },
  selectedItem: {},
  cart: [],
  models: [],
  searchErrors: []
};
export default (state = initialState, action) => {
  const currentSearchState = { ...state };

  switch (action.type) {
    case UPDATE_CART: 
      const cartState = { ...state };
      cartState.selectedItem = action.payload;
      cartState.cart.unshift( action.payload )

    return cartState;
    case GET_CAR_MODELS: 
      const carModelState = { ...state };
      carModelState.models = action.payload.models;
      return carModelState;
    case CLEAR_SEARCH_ERRS: 
      const clearErrorState = { ...state };
      clearErrorState.searchErrors = [];
      clearErrorState.searchTerm = '';
      return clearErrorState;

    case UPDATE_SEARCH_TERM: 
    const searchTermState = {...state};
    searchTermState.searchTerm = action.payload;
    searchTermState.hx.unshift({ text: `${action.payload} (No Car Selected)`, value: action.payload})
    searchTermState.termSelected = true;
    return searchTermState;

    case UPDATE_SEARCH_TERM_WCAR:
      const termWithCar = { ...state };
      termWithCar.searchTerm = action.payload;
      termWithCar.hx.unshift({ text: action.payload, value: action.payload })
      termWithCar.termSelected = true;
      return termWithCar;
    case VIN_SEARCH:
      if (isUndefined(action.payload)) {
        return currentSearchState;
      }
      const vinSearchSt = { ...state };
      if (action.payload.napa) {
        const napaParts = action.payload.napa.parts.map(p => {
          const part = { ...p };
          part.vendor = "NAPA";
          return part;
        });
        const newNapaParts = [...napaParts, ...state.parts];
        vinSearchSt.parts = newNapaParts;
        vinSearchSt.vehicle.napa = action.payload.napa.vehicle;
        vinSearchSt.vehicle.last = action.payload.napa.vehicle;
      }

      if (action.payload.autozone) {
        const azParts = action.payload.autozone.parts.map(p => {
          const part = { ...p };
          part.vendor = "AZ";
          return part;
        });
        const newAZParts = [...azParts, ...state.parts];
        vinSearchSt.parts = newAZParts;
        vinSearchSt.vehicle.az = action.payload.autozone.vehicle;
        vinSearchSt.vehicle.last = action.payload.autozone.vehicle;
      }

      if (action.payload.advancedAuto) {
        const aaParts = action.payload.autozone.parts.map(p => {
          const part = { ...p };
          part.vendor = "AA";
          return part;
        });
        const newAAParts = [...aaParts, ...state.parts];
        vinSearchSt.parts = newAAParts;
        vinSearchSt.vehicle.aa = action.payload.advancedAuto.vehicle;
        vinSearchSt.vehicle.last = action.payload.advancedAuto.vehicle;
      }
      const { payload = {}} = action;
      if (payload.ebay) {
        const { ebay } = payload
        const { parts = [] } = ebay;
        const eBayParts = parts.map(p => {
          const part = { ...p };
          part.vendor = "EB";
          return part;
        });
        const newEBParts = [...eBayParts.slice(0, 20), ...state.parts];
        vinSearchSt.parts = newEBParts;
      }

      vinSearchSt.parts = shuffle(vinSearchSt.parts);

      return vinSearchSt;
    case GET_EBAY_IMAGE: 
      if (isUndefined(action.payload)) {
        return currentSearchState;
      }
      const imageState = {...currentSearchState};
      imageState.selectedItemUrl = action.payload.selectedItemUrl
      return imageState;

    case EBAY_EMPTY_RESULTS:
      if (isUndefined(action.payload)) {
        return currentSearchState;
      }
      const emptyState = { ...currentSearchState };
      emptyState.searchErrors.push(action.payload.error)
      return emptyState;
    case SEARCH_HX_LOAD:
      if (isUndefined(action.payload)) {
        return currentSearchState;
      }

      if (action.payload.message === "Login Failed") {
        currentSearchState.error = "Login Failed";
        return currentSearchState;
      }
      const searchSt = { ...state };
      return searchSt;

    case AA_VIN_SEARCH_QUESTION:
      if (isUndefined(action.payload)) {
        return currentSearchState;
      }

      const aaSearch = { ...state };
      aaSearch.questions = action.payload.questions;
      aaSearch.showAAquestions = true;
      aaSearch.vehicle.aa = action.payload.vehicle;
      return aaSearch;

    case AA_VIN_SEARCH_RESULTS:
      if (isUndefined(action.payload)) {
        return currentSearchState;
      }

      const aaResult = { ...state };
      const parsedItems = parseAAItems(action.payload.parts.items);
      const newParts = [...parsedItems, ...state.parts];
      aaResult.questions = [];
      aaResult.parts = newParts;
      aaResult.showAAquestions = false;
      aaResult.showAAresults = true;

      return aaResult;

    case SEARCH_HX_FAIL:
      if (isUndefined(action.err)) {
        return currentSearchState;
      }
      const errSearchSt = { ...state };
      errSearchSt.error = action.err;
      errSearchSt.user = {};
      errSearchSt.providers = {};
      return errSearchSt;

    case EBAY_SEARCH:
      if (isUndefined(action.payload)) {
        return currentSearchState;
      }
      const eBaySearchSt = { ...state };
      const { searchResult } = action.payload;
      eBaySearchSt.ebay.parts = searchResult[0].item;
      eBaySearchSt.ebay.display = true;

      return eBaySearchSt;

    case EBAY_SEARCH_ERR:
      if (isUndefined(action.err)) {
        return currentSearchState;
      }
      const eBaySearchErrSearchSt = { ...state };
      eBaySearchErrSearchSt.error = action.err;
      eBaySearchErrSearchSt.user = {};
      eBaySearchErrSearchSt.providers = {};
      return eBaySearchErrSearchSt;
    default:
      return state;
  }
};
