/* eslint-disable prefer-object-spread */
/* eslint-disable no-case-declarations */
import {
  CONFIRM_UNIQUE_EML,
  CONFIRM_UNIQUE_ERR,
  AZ_VERIFIED_SUBMIT,
  AZ_VERIFIED_ERR,
  NAPA_VERIFIED_SUBMIT,
  NAPA_VERIFIED_ERR,
  AA_VERIFIED_SUBMIT,
  AA_VERIFIED_ERR,
  REGISTRATION_SUBMIT
} from "../actions";
import { isUndefined } from "../utils";

const initialState = {
  emlUnique: undefined,
  err: undefined,
  verified: {
    AZ: false,
    AA: false,
    NAPA: false,
    PA: false,
    ONL: false
  },
 registration: {
  name: "",
  email: "",
  password: "",
  providers: [],
  autozone: {
    pin: "",
    phone: ""
  },
  partsAuthority: {
    acctNumber: "",
    user: "",
    password: ""
  },
  advanceAuto: {
    id: "",
    password: "",
    store: ""
  },
  napaAuto: {
    storeId: "",
    proPassword: "",
    user: "",
    password: ""
  },
  address1: "",
  address2: "",
  city: "",
  state: "",
  zip: "",
  mode: ""
},
isRegistrationComplete: false
};
export default (state = initialState, action) => {
    const currentState = { ...state }

    switch (action.type) {
      case REGISTRATION_SUBMIT:
        const formSt = Object.assign({}, state);
        formSt.isRegistrationComplete = true;

        return formSt;
      case CONFIRM_UNIQUE_EML:
        const UniqueSt = Object.assign({}, state);
        if (action.exists) {
          UniqueSt.emlUnique = false;
        } else {
          UniqueSt.emlUnique = true;
        }
        return UniqueSt;
      case CONFIRM_UNIQUE_ERR:

        const errSt = { ...currentState };
        errSt.err = action.err;
        return errSt;

      case AZ_VERIFIED_SUBMIT:
        const azRegState = Object.assign({}, state);
        if (action.verified) {
          azRegState.verified.AZ = true;
        }

        return azRegState;

      case AZ_VERIFIED_ERR:
        const azSt = { ...state };
        azSt.err = action.err;
        return azSt;

      case NAPA_VERIFIED_SUBMIT:
        const napaRegState = Object.assign({}, state);
        if (action.verified) {
          napaRegState.verified.NAPA = true;
        }

        return napaRegState;

      case NAPA_VERIFIED_ERR:

        const napaSt = { ...state };
        napaSt.err = action.err;
        return napaSt;
      case AA_VERIFIED_SUBMIT:
        const aaRegState = Object.assign({}, state);
        if (action.verified) {
          aaRegState.verified.AA = true;
        }

        return aaRegState;

      case AA_VERIFIED_ERR:

        const aaSt = { ...state };
        aaSt.err = action.err;
        return aaSt;
      default:
        return state;
    }
};