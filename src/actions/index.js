import axios from "axios";

// const EbayAuthToken = require("ebay-oauth-nodejs-client");

// const ebayAuthToken = new EbayAuthToken({
//   clientId: "PartsDet-PartsDet-PRD-0ca83364c-5075a574",
//   clientSecret: "PRD-ca83364cd6d7-1521-4134-8792-a6ff"
// });
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/*
 src/actions/simpleAction.js
*/
const request = require("request");
const { decodeVin } = require("../utils/decoder");
const { sortParts } = require("../utils/index");
// const base_NHTSA_URL = [
//   "https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValuesExtended/",
//   "?format=json&modelyear="
// ];

const pdBaseProd = "https://partsdetect-api.herokuapp.com";
// const pdBaseStage = "https://partsdetect-api-test.herokuapp.com";
// const pdLocal = "http://localhost:3001";

const pdURL = pdBaseProd;

const loginURL = "/auth";
const emlCheck = "/user/email/check";
const verifyAutoZone = "/autozone/verify";
const verifyNapaAuto = "/user/napa/verify";
const verifyAdvanced = "/advance-auto/verify";
const user = "/user";
const userHx = "/user/history";

export const VIN_SEARCH = "VIN_SEARCH";
export const VIN_SEARCH_ERR = "VIN_SEARCH_ERR";
export const AA_VIN_SEARCH_QUESTION = "AA_VIN_SEARCH_QUESTION";

export const PD_LOGIN_SUBMIT = "PD_LOGIN_SUBMIT";
export const PD_LOGIN_ERROR = "PD_LOGIN_ERROR";

export const CONFIRM_UNIQUE_EML = "CONFIRM_UNIQUE_EML";
export const CONFIRM_UNIQUE_ERR = "CONFIRM_UNIQUE_ERR";

export const AZ_VERIFIED_SUBMIT = "AZ_VERIFIED_SUBMIT";
export const AZ_VERIFIED_ERR = "AZ_VERIFIED_ERR";

export const NAPA_VERIFIED_SUBMIT = "NAPA_VERIFIED_SUBMIT";
export const NAPA_VERIFIED_ERR = "NAPA_VERIFIED_ERR";

export const AA_VERIFIED_SUBMIT = "AA_VERIFIED_SUBMIT";
export const AA_VERIFIED_ERR = "AA_VERIFIED_ERR";

export const REGISTRATION_SUBMIT = "REGISTRATION_SUBMIT";
export const REGISTRATION_ERR = "REGISTRATION_ERR";

export const SEARCH_SUBMIT = "SEARCH_SUBMIT";
export const SEARCH_FAIL = "SEARCH_FAIL";

export const DECODE_VIN = "DECODE_VIN";
export const DECODE_VIN_ERR = "DECODE_VIN_ERR";

export const MODAL_OPEN = "MODAL_OPEN";
export const MODAL_CLOSE = "MODAL_CLOSE";

export const UPDATE_SEARCH_TERM = "UPDATE_SEARCH_TERM";
export const UPDATE_SEARCH_TERM_WCAR = "UPDATE_SEARCH_TERM_WCAR";

export const UPDATE_CAR_SPECS = "UDPATE_CAR_SPECS";

export const UPDATE_CART = "UPDATE_CART";
export const GET_EBAY_IMAGE = "GET_EBAY_IMAGE";

const options = {
  method: "POST",
  url: "",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "*/*",
    "Sec-Fetch-Site": "cross-site",
    "Sec-Fetch-Mode": "cors"
  }
};

export const toggleModal = () => async (dispatch, getState, api) => {
  const modalState = getState();
  const { modal } = modalState;
  if (modal) {
    dispatch({
      type: MODAL_CLOSE
    });
  } else {
    dispatch({
      type: MODAL_OPEN
    });
  }
};

export const updateCar = (attr, value) => (dispatch, getState, api) => {
  dispatch({
    type: UPDATE_CAR_SPECS,
    payload: { attr, value }
  });
};

export const updateSearchTerm = searchTerm => (dispatch, getState, api) => {
  const carState = getState().car;
  if (carState.confirmed) {
    dispatch({
      type: UPDATE_SEARCH_TERM_WCAR,
      payload: searchTerm
    });
  } else {
    dispatch({
      type: UPDATE_SEARCH_TERM,
      payload: searchTerm
    });
  }
};

export const RESIZE_EVENT = "RESIZE_EVENT";
export const resizeAction = mobile => async dispatch => {
  dispatch({
    type: RESIZE_EVENT,
    payload: mobile
  });
};

export const login = credentials => async dispatch => {
  options.url = pdURL + loginURL;
  options.form = {
    ...credentials
  };
  await request(options, async (err, res) => {
    if (err) {
      dispatch({
        type: PD_LOGIN_ERROR,
        err
      });
      throw new Error(err);
    } else {
      dispatch({
        type: PD_LOGIN_SUBMIT,
        payload: await JSON.parse(res.body)
      });
    }
  });
};

export const confirmUniqueEmail = email => async dispatch => {
  options.url = pdURL + emlCheck;
  options.form = { email };
  await request(options, async (err, res) => {
    const { exists } = await JSON.parse(res.body);
    if (err) {
      dispatch({
        type: CONFIRM_UNIQUE_ERR,
        err
      });
      throw new Error(err);
    } else {
      dispatch({
        type: CONFIRM_UNIQUE_EML,
        exists
      });
    }
  });
};

export const verifyAZ = pin => async dispatch => {
  options.url = pdURL + verifyAutoZone;
  options.form = { pin };
  await request(options, async (err, res) => {
    const { verified } = await JSON.parse(res.body);
    if (err) {
      dispatch({
        type: AZ_VERIFIED_ERR,
        err
      });
      throw new Error(err);
    } else {
      dispatch({
        type: AZ_VERIFIED_SUBMIT,
        verified
      });
    }
  });
};

export const UPDATE_VENDORS = "UPDATE_VENDORS";

export const verifyNapa = (storeId, proPassword) => async (
  dispatch,
  getState
) => {
  const currentState = await getState();
  const { auth } = currentState;
  options.url = pdURL + verifyNapaAuto;
  options.form = { storeId, proPassword, email: auth.user.email };
  request.mode = "no-cors";
  options.headers["Sec-Fetch-Mode"] = "no-cors";
  options.headers["x-access-token"] = auth.token;
  await request(options, async (err, res) => {
    const data = await JSON.parse(res.body);
    if (err) {
      dispatch({
        type: NAPA_VERIFIED_ERR,
        err
      });
      throw new Error(err);
    } else {
      dispatch({
        type: NAPA_VERIFIED_SUBMIT,
        verified: data.verified
      });
      dispatch({
        type: UPDATE_VENDORS,
        payload: { data }
      });
    }
  });
};

export const verifyAA = (id, password, store) => async dispatch => {
  options.url = pdURL + verifyAdvanced;
  options.form = { id, password, store };
  await request(options, async (err, res) => {
    const { verified } = await JSON.parse(res.body);
    if (err) {
      dispatch({
        type: AA_VERIFIED_ERR,
        err
      });
      throw new Error(err);
    } else {
      dispatch({
        type: AA_VERIFIED_SUBMIT,
        verified
      });
    }
  });
};

export const registerUser = formData => async dispatch => {
  options.url = pdURL + user;
  const {
    address1 = "",
    address2 = "",
    zip = "",
    state = "",
    city = "",
    name,
    email,
    password,
    napaStoreID = false,
    napaProAcct = false,
    azStorePhone = false,
    azAcct = false,
    smsStore = false,
    smsPW = false,
    smsID = false
  } = formData;

  const autozone = { pin: azAcct, phone: azStorePhone };
  const napaAuto = { storeId: napaStoreID, proPassword: napaProAcct };
  const advanceAuto = { id: smsID, password: smsPW, store: smsStore };

  const accountData = {
    name,
    password,
    email,
    address1,
    address2,
    city,
    state,
    zip,
    providers: []
  };

  if (napaStoreID) {
    accountData.providers.push("napa");
    accountData.napaAuto = napaAuto;
  }
  if (smsPW) {
    accountData.providers.push("advanceAuto");
    accountData.advanceAuto = advanceAuto;
  }

  if (azAcct) {
    accountData.providers.push("autozone");
    accountData.autozone = autozone;
  }
  options.body = JSON.stringify({ ...accountData });
  fetch(`${pdURL}/user`, {
    credentials: "omit",
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "x-access-token": "null"
    },
    referrer: "http://167.71.100.203:3001/app",
    referrerPolicy: "no-referrer-when-downgrade",
    body: options.body,
    method: "POST",
    mode: "cors"
  })
    .then(res => res.json())
    .then(body => {
      dispatch({
        type: REGISTRATION_SUBMIT
      });
      dispatch({
        type: PD_LOGIN_SUBMIT,
        payload: body
      });
    })
    .catch(err => {
      dispatch({
        type: REGISTRATION_ERR,
        err
      });
      throw new Error(err);
    });
};

export const SEARCH_HX_LOAD = "SEARCH_HX_LOAD";
export const SEARCH_HX_FAIL = "SEARCH_HX_FAIL";

export const getHistory = formData => async dispatch => {
  options.url = pdURL + userHx;

  const { account, vendors, delivery } = formData;

  const { name, email, password } = account;

  const {
    napaStoreID = false,
    napaProAcct = false,
    azStorePhone = false,
    azAcct = false,
    smsStore = false,
    smsPW = false,
    smsID = false
  } = vendors;

  const {
    address1 = "",
    address2 = "",
    zip = "",
    state = "",
    city = ""
  } = delivery;

  const autozone = { pin: azAcct, phone: azStorePhone };
  const napaAuto = { storeId: napaStoreID, proPassword: napaProAcct };
  const advanceAuto = { id: smsID, password: smsPW, store: smsStore };

  const accountData = {
    name,
    password,
    email,
    address1,
    address2,
    city,
    state,
    zip,
    providers: []
  };

  if (napaStoreID) {
    accountData.providers.push("napa");
    accountData.napaAuto = napaAuto;
  }
  if (smsPW) {
    accountData.providers.push("advanceAuto");
    accountData.advanceAuto = advanceAuto;
  }

  if (azAcct) {
    accountData.providers.push("autozone");
    accountData.autozone = autozone;
  }

  options.body = JSON.stringify({ ...accountData });

  fetch(`${pdURL}/user`, {
    credentials: "omit",
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "x-access-token": "null"
    },
    referrer: "http://167.71.100.203:3001/app",
    referrerPolicy: "no-referrer-when-downgrade",
    body: options.body,
    method: "POST",
    mode: "cors"
  })
    .then(res => res.json())
    .then(body => {
      dispatch({
        type: REGISTRATION_SUBMIT
      });
      dispatch({
        type: SEARCH_HX_LOAD,
        payload: body
      });
    })
    .catch(err => {
      dispatch({
        type: SEARCH_HX_FAIL,
        err
      });
      throw new Error(err);
    });
};

export const lookUp = formData => async (dispatch, getState) => {
  options.url = pdURL + userHx;
  const { account, vendors, delivery } = formData;

  const { name, email, password } = account;
  const {
    napaStoreID = false,
    napaProAcct = false,
    azStorePhone = false,
    azAcct = false,
    smsStore = false,
    smsPW = false,
    smsID = false
  } = vendors;

  const {
    address1 = "",
    address2 = "",
    zip = "",
    state = "",
    city = ""
  } = delivery;

  const autozone = { pin: azAcct, phone: azStorePhone };
  const napaAuto = { storeId: napaStoreID, proPassword: napaProAcct };
  const advanceAuto = { id: smsID, password: smsPW, store: smsStore };

  const accountData = {
    name,
    password,
    email,
    address1,
    address2,
    city,
    state,
    zip,
    providers: []
  };

  if (napaStoreID) {
    accountData.providers.push("napa");
    accountData.napaAuto = napaAuto;
  }
  if (smsPW) {
    accountData.providers.push("advanceAuto");
    accountData.advanceAuto = advanceAuto;
  }

  if (azAcct) {
    accountData.providers.push("autozone");
    accountData.autozone = autozone;
  }

  options.body = JSON.stringify({ ...accountData });

  // 700001896
  // D01313
  fetch(`${pdURL}/user`, {
    credentials: "omit",
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "x-access-token": "null"
    },
    referrerPolicy: "no-referrer-when-downgrade",
    body: options.body,
    method: "POST",
    mode: "cors"
  })
    .then(res => res.json())
    .then(body => {
      dispatch({
        type: SEARCH_SUBMIT,
        payload: body
      });
    })
    .catch(err => {
      dispatch({
        type: SEARCH_FAIL,
        err
      });
      throw new Error(err);
    });
};

// 700001896
// D01313

// 764505
// 6023312706

export const NHTSA_GET_MAKES = "NHTSA_GET_MAKES";
const NHTSA_GET_MAKES_URL =
  "https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json";
export const getMakes = () => async dispatch => {
  options.url = NHTSA_GET_MAKES_URL;
  options.headers = {};
  options.method = "GET";
  await request(options, async (err, res) => {
    const data = await JSON.parse(res.body);
    if (err) {
      dispatch({
        type: AA_VERIFIED_ERR,
        err
      });
      throw new Error(err);
    } else {
      dispatch({
        type: NHTSA_GET_MAKES
      });
    }
  });
};

export const EBAY_SEARCH = "EBAY_SEARCH";
export const EBAY_SEARCH_ERR = "EBAY_SEARCH_ERR";
export const EBAY_SEARCH_VIN = "EBAY_SEARCH_VIN";
export const EBAY_EMPTY_RESULTS = "EBAY_EMPTY_RESULTS";
export const INIT_CART = "INIT_CART";

const eBayOptions = {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "*/*"
  }
};

export const checkout = data => async (dispatch, getState) => {
  eBayOptions.url = `${pdURL}/checkout/ebay`;
  eBayOptions.form = { data };
  await request(eBayOptions, async (err, res) => {
    const data = await JSON.parse(res.body);
    console.log("index.js, 564 ==> data", data);
  });
};

export const ebaySearch = keywords => async (dispatch, getState) => {
  eBayOptions.url = `${pdURL}/search/ebay`;
  eBayOptions.form = { keywords };
  console.log("keywords", keywords)
  await request(eBayOptions, async (err, res) => {
    const data = await JSON.parse(res.body);
    console.log('data', data)
    if (err) {
      dispatch({
        type: EBAY_SEARCH_ERR,
        err
      });
      throw new Error(err);
    } else if (typeof data.itemSummaries !== "undefined") {
      data.isEbay = true;
      const sortedParts = sortParts(data, keywords);
      console.log("sorted", sortedParts)
      dispatch({
        type: INIT_CART,
        payload: { items: sortedParts }
      });
      dispatch({
        type: VIN_SEARCH,
        payload: { ebay: { parts: sortedParts } }
      });
    } else {
      dispatch({
        type: EBAY_EMPTY_RESULTS,
        payload: { error: `No Ebay Results for: ${keywords}` }
      });
    }
  });
};

export const CLEAR_SEARCH_ERRS = "CLEAR_SEARCH_ERRS";

export const clearSearchErrors = () => dispatch => {
  dispatch({ type: CLEAR_SEARCH_ERRS });
};

export const AA_VIN_SEARCH_RESULTS = "AA_VIN_SEARCH_RESULTS";

export const itemTypeNext = itemType => async (dispatch, getState) => {
  const currentState = await getState();
  const { search, auth } = currentState;
  const { vehicle } = search;
  const { aa } = vehicle;
  // eBayOptions.url = `${pdURL}/search/ebay`;
  const body = await JSON.stringify({ vehicle: aa, itemType });
  // eBayOptions.form = { keywords };
  const partsData = await fetch(`${pdURL}/search/advance-auto/parts`, {
    credentials: "omit",
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json; charset=UTF-8",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "x-access-token": auth.token
    },
    referrerPolicy: "no-referrer-when-downgrade",
    body,
    method: "POST",
    mode: "cors"
  }).then(res => res.json());
  // <envvar name="MANTA_URI" value="https://us-east.manta.joyent.com/partsdetect/public/aap-images-08082017"/>
  // img '/images/' + req.params.mfg + '/' + req.params.img;

  dispatch({ type: AA_VIN_SEARCH_RESULTS, payload: { parts: partsData } });
};

export const vinSearch = (vin, keyword) => async (dispatch, getState) => {
  const currentState = await getState();
  const { auth, car } = currentState;
  const { user } = auth;
  const { providers } = user;
  const searchNAPA = providers.indexOf("napa") !== -1;
  const searchAZ = false;
  // const searchAZ = providers.indexOf("autozone") !== -1;
  const searchAA = providers.indexOf("advanceAuto") !== -1;
  let advanceAutoVehicleData = {};
  // const searchAA = false;
  if (searchNAPA) {
    await fetch(`${pdURL}/search/napa`, {
      credentials: "omit",
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "x-access-token": auth.token
      },
      referrerPolicy: "no-referrer-when-downgrade",
      body: `searchTerm=${keyword}&vin=${car.vin}&vehicle=%7B%22vin%22%3A%22${car.vin}%22%2C%22years%22%3A%5B%7B%22year%22%3A%222012%22%7D%5D%2C%22make%22%3A%7B%22name%22%3A%22FORD%22%7D%2C%22model%22%3A%7B%22name%22%3A%22Fiesta%22%7D%2C%22engine%22%3A%7B%22size%22%3A%221.6%22%2C%22cylinder%22%3A%226%22%7D%7D&storeId=${user.napaAuto.storeId}%22%3A%22${user.napaAuto.proPassword}`,
      method: "POST",
      mode: "cors"
    })
      .then(res => res.json())
      .then(async body => {
        dispatch({
          type: VIN_SEARCH,
          payload: body
        });
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  if (searchAZ) {
    fetch(`${pdURL}/search/autozone`, {
      credentials: "omit",
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "x-access-token": auth.token
      },
      referrerPolicy: "no-referrer-when-downgrade",
      body: `searchTerm=${keyword}&vin=${car.vin}&pin=${user.autozone.pin}&storeId=${user.autozone.phone}`,
      method: "POST",
      mode: "cors"
    })
      .then(res => res.json())
      .then(async body => {
        dispatch({
          type: VIN_SEARCH,
          payload: body
        });
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  if (searchAA) {
    advanceAutoVehicleData = await fetch(`${pdURL}/advance-auto/vehicle`, {
      credentials: "omit",
      headers: {
        accept: "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        "x-access-token": auth.token
      },
      referrerPolicy: "no-referrer-when-downgrade",
      body: `vin=${car.vin}`,
      method: "POST",
      mode: "cors"
    }).then(res => res.json());

    const advancePartTermData = await fetch(
      `${pdURL}/advance-auto/item-types?searchTerm=${keyword.replace(
        /\s+/g,
        "+"
      )}`,
      {
        credentials: "omit",
        headers: {
          accept: "*/*",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "cross-site",
          "x-access-token": auth.token
        },
        referrerPolicy: "no-referrer-when-downgrade",
        method: "GET",
        mode: "cors"
      }
    ).then(res => res.json());
    dispatch({
      type: AA_VIN_SEARCH_QUESTION,
      payload: {
        questions: advancePartTermData,
        vehicle: advanceAutoVehicleData
      }
    });
  }
  const { year, make, model } = car;
  const newMake = make.slice(0, make.indexOf(` `));
  const eBayTerm = `${year} ${newMake} ${model} ${keyword}`;
  eBayOptions.url = `${pdURL}/search/ebay`;
  eBayOptions.form = { keywords: eBayTerm };
  await request(eBayOptions, async (err, res) => {
    const data = await JSON.parse(res.body);
    if (err) {
      dispatch({
        type: EBAY_SEARCH_ERR,
        err
      });
      throw new Error(err);
    } else {
      dispatch({
        type: VIN_SEARCH,
        payload: { ebay: { parts: data.itemSummaries[0].item } }
      });
    }
  });
};

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const SUB_QUANTITY = "SUB_QUANTITY";
export const ADD_QUANTITY = "ADD_QUANTITY";
export const ADD_SHIPPING = "ADD_SHIPPING";
export const UPDATE_QTY = "UPDATE_QTY";
// add cart action
export const addToCart = id => {
  return {
    type: ADD_TO_CART,
    id
  };
};
// remove item action
export const removeItem = id => async (dispatch, getState) => {
  dispatch({ type: REMOVE_ITEM, payload: { id } });
};

// remove item action
export const updatedItemQty = (id, qty) => async (dispatch, getState) => {
  dispatch({ type: UPDATE_QTY, payload: { id, qty } });
};

// subtract qt action
export const subtractQuantity = id => {
  return {
    type: SUB_QUANTITY,
    id
  };
};
// add qt action
export const addQuantity = id => {
  return {
    type: ADD_QUANTITY,
    id
  };
};

export const decodeVinNumber = vin => async (dispatch, getState) => {
  const vinData = await decodeVin(vin);
  vinData.vin = vin;
  dispatch({ type: DECODE_VIN, payload: vinData });
};

export const updateCart = item => async (dispatch, getState) => {
  const partsAvailable = getState().search.parts;
  dispatch({ type: ADD_TO_CART, payload: { item, items: partsAvailable } });
};

export const getEbayImage = item => async dispatch => {
  const { data } = await axios.post(`${pdURL}/ebay/images`, { item });
  dispatch({ type: GET_EBAY_IMAGE, payload: { selectedItemUrl: data.url } });
};

export const GET_CAR_MODELS = "GET_CAR_MODELS";
export const getCarModels = (searchMakeId, searchYear) => async dispatch => {
  const { data } = await axios.get(
    `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${searchMakeId}/modelyear/${searchYear}?format=json`
  );
  const { Results } = data;
  const models = [
    {
      text: "Select Model",
      value: ""
    }
  ];
  Results.forEach(md => {
    md.value = md.Model_ID;
    md.dataValue = md.Model_ID;
    md.text = md.Model_Name;
    models.push(md);
  });
  const sortedModels = models.sort((a, b) => {
    if (typeof a.Model_Name !== "undefined" && typeof b.Model_Name !== "undefined") {
      const textA = a.Model_Name.trim().toUpperCase();
      const textB = b.Model_Name.trim().toUpperCase();
      const val = (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      return val
    }
  })
  dispatch({ type: GET_CAR_MODELS, payload: { models: sortedModels } });
  return sortedModels;
};

export const LOG_OUT_USER = "LOG_OUT_USER";

export const logoutUser = () => async dispatch => {
  dispatch({ type: LOG_OUT_USER });
};

export const UPDATE_ACTIVE_USER = "UPDATE_ACTIVE_USER";

export const updateUserAcct = formData => async dispatch => {
  // TODO: GET USER ID HERE
  options.url = `${pdURL + user}/${user.id}`;

  const {
    address1 = "",
    address2 = "",
    zip = "",
    state = "",
    city = "",
    name,
    email,
    password,
    napaStoreID = false,
    napaProAcct = false,
    azStorePhone = false,
    azAcct = false,
    smsStore = false,
    smsPW = false,
    smsID = false
  } = formData;

  const autozone = { pin: azAcct, phone: azStorePhone };
  const napaAuto = { storeId: napaStoreID, proPassword: napaProAcct };
  const advanceAuto = { id: smsID, password: smsPW, store: smsStore };

  const accountData = {
    name,
    password,
    email,
    address1,
    address2,
    city,
    state,
    zip,
    providers: []
  };

  if (napaStoreID) {
    accountData.providers.push("napa");
    accountData.napaAuto = napaAuto;
  }
  if (smsPW) {
    accountData.providers.push("advanceAuto");
    accountData.advanceAuto = advanceAuto;
  }

  if (azAcct) {
    accountData.providers.push("autozone");
    accountData.autozone = autozone;
  }
  options.body = JSON.stringify({ ...accountData });
  fetch(`${pdURL}/user`, {
    credentials: "omit",
    headers: {
      accept: "application/json, text/javascript, */*; q=0.01",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/json",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      "x-access-token": "null"
    },
    referrer: "http://167.71.100.203:3001/app",
    referrerPolicy: "no-referrer-when-downgrade",
    body: options.body,
    method: "POST",
    mode: "cors"
  })
    .then(res => res.json())
    .then(body => {
      dispatch({
        type: UPDATE_ACTIVE_USER,
        payload: body
      });
    })
    .catch(err => {
      dispatch({
        type: REGISTRATION_ERR,
        err
      });
      throw new Error(err);
    });
};
