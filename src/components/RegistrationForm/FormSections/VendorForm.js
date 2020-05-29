/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import {Form, FormGroup, Segmented, Button, Switch, Input} from "@mobiscroll/react";
import { connect } from "react-redux";
import { isUndefined } from "../../../utils";
import { verifyAZ, verifyNapa, verifyAA } from "../../../actions"

const vendorData = [{
  name: "NAPA",
  attrs: [
      {
        label: "NAPA Store ID#",
        icon: "location",
        name: "NAPA"
      },
      {
        label: "NAPA Pro Account #",
        icon: "lock2",
        name: "NAPA"
      }
    ]
  },
  {
    name: "AZ",
    attrs: [
      {
        label: "AZ Store ID#",
        icon: "location",
        name: "AZ"
      },
      {
        label: "AZ Pro Account #",
        icon: "lock2",
        name: "AZ"
      }
    ]
  },
  { name: "AA",
    attrs: [
      {
        label: "AA Store ID#",
        icon: "location",
        name: "AA"
      },
      {
        label: "NAPA Pro Account #",
        icon: "lock2",
        name: "AA"
      }
    ]
  },
  {
    name: "PA",
    attrs: [
      {
        label: "PA Store ID#",
        icon: "location",
        name: "PA"
      },
      {
        label: "PA Pro Account #",
        icon: "lock2",
        name: "PA"
      }
    ]
  },
  { name: "ONL",
    attrs: [
      {
        label: "ONL Store ID#",
        icon: "location",
        name: "ONL"
      },
      {
        label: "ONL Pro Account #",
        icon: "lock2",
        name: "ONL"
      }
    ]
  }]

class VendorFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNAPA: false,
      showAA: false,
      showPA: false,
      showAZ: false,
      editNAPA: false,
      editAA: false,
      editPA: false,
      editAZ: false,
      accountType: "",
      enabled: true,
      formErrors: {
      },
      formValues: {
        napaStoreID: "",
        napaProAcct: "",
        azStorePhone: "",
        azAcct: "",
        smsID: "",
        smsPW: "",
        smsStore: ""
      },
      vendors: {
        AZ: {
          checked: false,
          name: "AutoZone Auto Parts"
        },
        AA: {
          checked: false,
          name: "Advance Auto Parts"
        },
        NAPA: {
          checked: false,
          name: "NAPA Auto Parts"
        },
        ONL: {
          checked: true,
          name: "Online Auto Parts"
        }
    },
      verified: {
        AZ: false,
        AA: false,
        NAPA: false,
        ONL: true
      }
  }
    this.enable = this.enable.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAccount = this.handleAccount.bind(this);
    this.handleValidateAZ = this.handleValidateAZ.bind(this);
    this.handleValidateAA = this.handleValidateAA.bind(this);
    this.handleValidateNAPA = this.handleValidateNAPA.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const { prefill, user } =  this.props;
    if (prefill) {
      const { napaAuto, autozone, advanceAuto, providers } = user
      const formValues = { 
        napaStoreID: napaAuto.storeId,
        napaProAcct: napaAuto.proPassword,
        azStorePhone: autozone.phone,
        azAcct: autozone.pin,
        smsID: advanceAuto.id,
        smsPW: advanceAuto.password,
        smsStore: advanceAuto.store
       };
      const vendors= {
        AZ: {
          checked: providers.indexOf("autozone") !== -1,
            name: "AutoZone Auto Parts"
        },
        AA: {
          checked: providers.indexOf("advanceAuto") !== -1,
            name: "Advance Auto Parts"
        },
        NAPA: {
          checked: providers.indexOf("napa") !== -1,
            name: "NAPA Auto Parts"
        },
        ONL: {
          checked: false,
            name: "Online Auto Parts"
        }
      }

      const verified =  {
        AZ: providers.indexOf("autozone") !== -1,
        AA: providers.indexOf("advanceAuto") !== -1,
        NAPA: providers.indexOf("napa") !== -1,
        PA: false,
        ONL: true
      }
      const accountType = providers.length > 1 ? "AUTO" : "DIY";
      this.setState({ formValues, accountType, vendors, verified });
    }
    this.initValidation();
  }

  componentDidUpdate(prevProps, prevState) {
    const { verified } = this.props;
    const { AZ, NAPA, AA } = verified;
    if (AZ !== prevProps.verified.AZ) {
      this.showAZ();
    }
    if (NAPA !== prevProps.verified.NAPA) {
      this.showNAPA();
    }
    if (AA !== prevProps.verified.AA) {
      this.showAA();
    }
  }

  onFormChange = (key, event) => {
    const valueUpd = { ...this.state.formValues };
    valueUpd[key] = event.target.value;
    const errorUpd = this.validateField(key, event.target.value);

    this.setState({
      formValues: valueUpd,
      formErrors: errorUpd
    });
  };

  // set up validation
  initValidation = () => {
    this.validationSettings = {
      email: [this.requiredCheck],
      password: [this.requiredCheck, this.minlengthCheck.bind(this, 6)],
      confirmPassword: [this.requiredCheck, this.minlengthCheck.bind(this, 6)]
    };
  };

  // validation
  validateField = (key, value) => {
    let invalid = false;
    if (this.validationSettings[key] !== undefined) {
      for (let i = 0; i < this.validationSettings[key].length; i++) {
        // interate on validators
        const validator = this.validationSettings[key][i];
        invalid = invalid || validator.call(this, value);
      }
    }
    const errorUpd = {};
    errorUpd[key] = invalid;
    return errorUpd;
  };

  validateAllFields = async () => {
    const errorsUpd = { ...this.state.formErrors };
    const values = { ...this.state.formValues };
    let allValid = true;
    for (const key in values) {
      errorsUpd[key] = this.validateField(key, values[key])[key];
      allValid = allValid && !errorsUpd[key];
    }

    this.setState({
      formErrors: errorsUpd
    });

    if (allValid) {
      this.props.confirmComplete(this.state.formValues);
    }
  };

  // validation check functions
  requiredCheck = value => {
    if (value) {
      return false;
    }
    return "This field is required";
  };

  minlengthCheck = (minlength, value) => {
    if (!value || value.length < minlength) {
      return `It should be at least ${minlength} characters long`;
    }

    return false;
  };

  showNAPA = () => {
    const { showNAPA, editNAPA } = this.state;
    const {isLoggedIn} = this.props;
    if (isLoggedIn) {
      this.setState({ editNAPA: !editNAPA, showNAPA: !showNAPA  });
    } else {
      this.setState({ showNAPA: !showNAPA });
    }
  };

  showAZ = () => {
    const { showAZ, editAZ } = this.state;
    const { isLoggedIn } = this.props;
    if(isLoggedIn) {
      this.setState({ editAZ: !editAZ });
    } else {
      this.setState({ showAZ: !showAZ });
    }
  };

  showPA = () => {
    const { showPA, editPA } = this.state;
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      this.setState({ editPA: !editPA });
    } else {
    this.setState({ showPA: !showPA });
    }
  };

  showAA = () => {
    const { showAA, editAA } = this.state;
    const { isLoggedIn } = this.props;
    if (isLoggedIn) {
      this.setState({ editAA: !editAA });
    } else {
    this.setState({ showAA: !showAA });
    }
  };

  showONL = () => {
    const { showONL, editONL } = this.state;
    const {isLoggedIn} = this.props;
    if (isLoggedIn) {
      this.setState({ editONL: !editONL });
    } else {
      this.setState({ showONL: !showONL });
    }
  };

  handleRadio(e) {
    this.setState({ radio: e.target.value });
  }

  handleChange(name, e) {
    const valueUpd = { ...this.state.formValues };
    valueUpd[name] = e.target.value;
    const errorUpd = this.validateField(name, e.target.value);

    this.setState({
      formValues: valueUpd,
      formErrors: errorUpd
    });
  }

  handleAccount(name) {
    this.setState({ accountType: name });
  }

  enable() {
    const { enabled } = this.state;
    this.setState({ enabled: !enabled });
  }

  toggleAddVendor(v) {
    const { vendors } = this.state;
    const vns = { ...vendors };
    if (v === "NAPA") {
      this.showNAPA();
    }
    if (v === "AZ") {
      this.showAZ();
    }
    if (v === "AA") {
      this.showAA();
    }
    if (v === "PA") {
      this.showPA();
    }
    if (v === "ONL") {
      this.showONL();
    }

    if (vns[v].checked === false) {
      vns[v].checked = true;
      this.setState({
        vendors: vns,
        selected: vns[v].name,
        refSelector: v
      });
    } else {
      vns[v].checked = false;
      this.setState({ vendors: vns });
    }
  }

  async handleValidateAZ() {
    const { formValues } = this.state;
    const { azAcct } = formValues;
    await this.props.azVerify(azAcct);
  }

  async handleValidateAA() {
    const { formValues } = this.state;
    const { smsID, smsPW, smsStore } = formValues;
    await this.props.aaVerify(smsID, smsPW, smsStore);
  }

  async handleValidateNAPA() {
    const { formValues } = this.state;
    const { napaStoreID, napaProAcct } = formValues;
    await this.props.napaVerify(napaStoreID, napaProAcct);
  }

  render() {
             const {
               vendors,
               enabled,
               showNAPA,
               showPA,
               showAZ,
               showAA,
               editNAPA,
               editPA,
               editAZ,
               editAA,
               accountType,
               verified
             } = this.state;
             const { verified: propsVerified } = this.props
             const accountText = "Account Type";
             const showONL = this.state.accountType !== "";
             const napa = editNAPA || showNAPA && !verified.NAPA;
             const az = editAZ || showAZ && !verified.AZ;
             const advauto = editAA || showAA && !verified.AA;
             return (
               <div className="register_screen">
                 <Form noValidate>
                   <FormGroup>
                     <div className="mbsc-form-group">
                       <div className="mbsc-switch">
                         {accountText}
                         <FormGroup>
                           <Segmented
                             name="app"
                             value="featured"
                             color="warning"
                             icon="material-star"
                             checked={this.state.accountType === "DIY"}
                             onChange={() => this.handleAccount("DIY")}
                           >
                             Do-It-Yourselfer
                           </Segmented>
                           <Segmented
                             name="app"
                             value="explore"
                             icon="material-explore"
                             checked={this.state.accountType === "AUTO"}
                             onChange={() => this.handleAccount("AUTO")}
                           >
                             Auto Professional
                           </Segmented>
                         </FormGroup>
                         <span className="mbsc-desc">
                           **Only Auto Professionals will have the required
                           credentials to search using our Shop Management Parts
                           Search Software
                         </span>
                       </div>

                       {accountType === "AUTO" && (
                         <div>
                           <Switch
                             className="settings-notify"
                             onChange={() => this.toggleAddVendor("NAPA")}
                             value={vendors.NAPA.checked}
                             checked={vendors.NAPA.checked}
                             disabled={!enabled}
                           >
                             NAPA Auto Parts
                             {verified.NAPA || propsVerified.NAPA ? (
                               <span
                                 className="mbsc-desc"
                                 style={{ color: "green" }}
                               >
                                 Verified & Active
                               </span>
                             ) : (
                               <span
                                 className="mbsc-desc"
                                 style={{ color: "red" }}
                               >
                                 Account Not Verified Yet
                               </span>
                             )}
                             <Button
                               onClick={() => this.toggleEditVendor("NAPA")}
                             >
                               {editNAPA ? `Finish Editing` : `Edit`}
                             </Button>
                           </Switch>
                           {napa && (
                             <React.Fragment>
                               <FormGroup>
                                 <div className="form-group">
                                   <label>NAPA Store ID #</label>
                                   <div className="hybridInput-account">
                                     <Input
                                       type="text"
                                       value={this.state.formValues.napaStoreID}
                                       onChange={this.onFormChange.bind(
                                         this,
                                         "napaStoreID"
                                       )}
                                       valid={!this.state.formErrors.napaStoreID}
                                       placeholder="NAPA Store ID #"
                                       icon="user4"
                                       className="form-control"
                                     />
                                   </div>
                                 </div>

                                 <div className="form-group">
                                   <label>NAPA Pro Account #</label>
                                   <div className="hybridInput-account">
                                     <Input
                                       type="text"
                                       value={this.state.formValues.napaProAcct}
                                       onChange={this.onFormChange.bind(
                                         this,
                                         "napaProAcct"
                                       )}
                                       valid={!this.state.formErrors.napaProAcct}
                                       errorMessage={
                                         this.state.formErrors.napaProAcct
                                       }
                                       placeholder="NAPA Pro Account #"
                                       icon="lock2"
                                       className="form-control"
                                     />
                                   </div>
                                 </div>

                                 <Input
                                   type="text"
                                   value={this.state.formValues.napaProAcct}
                                   onChange={this.onFormChange.bind(
                                     this,
                                     "napaProAcct"
                                   )}
                                   valid={!this.state.formErrors.napaProAcct}
                                   errorMessage={
                                     this.state.formErrors.napaProAcct
                                   }
                                   placeholder="NAPA Pro Account #"
                                   icon="lock2"
                                 />
                               </FormGroup>
                               <FormGroup>
                                 <Button
                                   onClick={this.handleValidateNAPA}
                                   icon="checkmark"
                                   color="warning"
                                 >
                                   Verify NAPA Credentials
                                 </Button>
                               </FormGroup>
                             </React.Fragment>
                           )}
                           <Switch
                             className="settings-notify"
                             onChange={() => this.toggleAddVendor("AZ")}
                             value={vendors.AZ.checked}
                             checked={vendors.AZ.checked}
                             disabled={!enabled}
                           >
                             AUTOZONE AUTO PARTS
                             {verified.AZ ? (
                               <span
                                 className="mbsc-desc"
                                 style={{ color: "green" }}
                               >
                                 Verified & Active
                               </span>
                             ) : (
                               <span
                                 className="mbsc-desc"
                                 style={{ color: "red" }}
                               >
                                 Account Not Verified Yet
                               </span>
                             )}
                           </Switch>
                           {az && (
                             <React.Fragment>
                               <FormGroup>
                                 <Input
                                   type="text"
                                   value={this.state.formValues.azAcct}
                                   onChange={this.onFormChange.bind(
                                     this,
                                     "azAcct"
                                   )}
                                   valid={!this.state.formErrors.azAcct}
                                   placeholder="AutoZone Account #"
                                   icon="user4"
                                 />

                                 <Input
                                   type="text"
                                   value={this.state.formValues.azStorePhone}
                                   onChange={this.onFormChange.bind(
                                     this,
                                     "azStorePhone"
                                   )}
                                   valid={!this.state.formErrors.azStorePhone}
                                   errorMessage={
                                     this.state.formErrors.azStorePhone
                                   }
                                   placeholder="AutoZone Store Account #"
                                   icon="phone"
                                 />
                               </FormGroup>
                               <FormGroup>
                                 <Button
                                   onClick={this.handleValidateAZ}
                                   icon="checkmark"
                                   color="warning"
                                 >
                                   Verify AutoZone Credentials
                                 </Button>
                               </FormGroup>
                             </React.Fragment>
                           )}
                           <Switch
                             className="settings-notify"
                             onChange={() => this.toggleAddVendor("AA")}
                             value={vendors.AA.checked}
                             checked={vendors.AA.checked}
                             disabled={!enabled}
                           >
                             ADVANCE AUTO
                             {verified.AA ? (
                               <span
                                 className="mbsc-desc"
                                 style={{ color: "green" }}
                               >
                                 Verified & Active
                               </span>
                             ) : (
                               <span
                                 className="mbsc-desc"
                                 style={{ color: "red" }}
                               >
                                 Account Not Verified Yet
                               </span>
                             )}
                           </Switch>
                           {advauto && (
                             <React.Fragment>
                               <FormGroup>
                                 <Input
                                   type="text"
                                   value={this.state.formValues.smsID}
                                   onChange={this.onFormChange.bind(
                                     this,
                                     "smsID"
                                   )}
                                   valid={!this.state.formErrors.smsID}
                                   placeholder="SMS ID"
                                   icon="user4"
                                 />

                                 <Input
                                   type="text"
                                   value={this.state.formValues.smsPW}
                                   onChange={this.onFormChange.bind(
                                     this,
                                     "smsPW"
                                   )}
                                   valid={!this.state.formErrors.smsPW}
                                   errorMessage={this.state.formErrors.smsPW}
                                   placeholder="SMS Password"
                                   icon="lock4"
                                 />
                                 <Input
                                   type="text"
                                   value={this.state.formValues.smsStore}
                                   onChange={this.onFormChange.bind(
                                     this,
                                     "smsStore"
                                   )}
                                   valid={!this.state.formErrors.smsStore}
                                   errorMessage={this.state.formErrors.smsStore}
                                   placeholder="SMS Store Number"
                                   icon="location"
                                 />
                               </FormGroup>
                               <FormGroup>
                                 <Button
                                   onClick={this.handleValidateAA}
                                   icon="checkmark"
                                   color="warning"
                                 >
                                   Verify Advance Auto Credentials
                                 </Button>
                               </FormGroup>
                             </React.Fragment>
                           )}
                         </div>
                       )}
                       {showONL && (
                         <Switch
                           className="settings-notify"
                           onChange={() => this.toggleAddVendor("ONL")}
                           checked={vendors.ONL.checked}
                           value={vendors.ONL.checked}
                         >
                           ONLINE
                           <span className="mbsc-desc">
                             {" "}
                             eBay, (Amazon and Walmart coming soon)
                           </span>
                         </Switch>
                       )}
                     </div>
                   </FormGroup>
                 </Form>
               </div>
             );
           }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loginError: state.auth.error,
  verified: state.registration.verified,
  user: state.auth.user,
  providers: state.auth.user.providers,
  ...state
});

const mapDispatchToProps = dispatch => ({
  azVerify: pin => dispatch(verifyAZ(pin)),
  napaVerify: (store, proAcct) => dispatch(verifyNapa(store, proAcct)),
  aaVerify: (id, pw, store) => dispatch(verifyAA(id, pw, store))
});

const VendorForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(VendorFormComponent);


export default VendorForm