/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-unused-state */
/* eslint-disable camelcase */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */

import React, { Component, lazy} from "react";
import { connect } from "react-redux";
import {Form, FormGroup, Input, Button} from "@mobiscroll/react";

const LocationSearchInput = lazy(() => import('./LocationSearchInput'));

class DeliveryFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: {},
      formValues: {
        phone: "",
        address1: "",
        address2:"",
        zip:"", 
        state:"", 
        city:""
      },
      selected: false,
      address: "",
      formatted_address: ""
    };

    this.onSelectAddress = this.onSelectAddress.bind(this);
  }

  componentDidMount() {
    this.initValidation();
    const { prefill = false } = this.props;
    if (prefill) {
    }
  }

  componentDidUpdate(prevProps, prevState) {
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

  onSelectAddress(str) {
    const addressData = str.split(",");
    const zip = addressData[2].slice(-5);
    const state = addressData[2].slice(1,3);

    const formValues = {
      address1: addressData[0],
      address2: "",
      zip,
      state,
      city: addressData[1]
    };
    this.setState({ selected: true, formValues, address: addressData[0] });
  }

  setRef = comp => {
    this.success = comp;
  };

  // set up validation
  initValidation = () => {
    this.validationSettings = {
      address1: [this.requiredCheck, this.minlengthCheck.bind(this, 2)],
      zip: [this.requiredCheck, this.minlengthCheck.bind(this, 5)],
      state: [this.requiredCheck, this.minlengthCheck.bind(this, 2)],
      city: [this.requiredCheck, this.minlengthCheck.bind(this, 2)],
      phone: [this.requiredCheck, this.minlengthCheck.bind(this, 9), this.checkPhone]
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
      // this.success.instance.show();
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

  checkPhone = (value) => {
    const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (value.match(phoneno)) {
      return false;
    }
    return "Not a valid Phone Number";
  }

  render() {
    const { selected } = this.state;
    return (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <span
            className="mbsc-ic mbsc-ic-user4"
            style={{
              fontSize: "6rem",
              borderRadius: "50%",
              border: "solid black",
              padding: "6px",
              margin: "2rem"
            }}
          />
        </div>
        <Form noValidate>
          <FormGroup>
            <LocationSearchInput selected={selected} address1={this.state.formValues.address1} onSelectAddress={this.onSelectAddress} />

            {selected && (
              <React.Fragment>
                <Input
                  type="text"
                  value={this.state.formValues.address1}
                  onChange={this.onFormChange.bind(this, "address1")}
                  valid={!this.state.formErrors.address1}
                  errorMessage={this.state.formErrors.address1}
                  placeholder="Address Line 1"
                  icon="home"
                />

                <Input
                  type="text"
                  value={this.state.formValues.address2}
                  onChange={this.onFormChange.bind(this, "address2")}
                  valid={!this.state.formErrors.address2}
                  errorMessage={this.state.formErrors.address2}
                  placeholder="Address Line 2"
                  icon="home"
                />

                <Input
                  type="text"
                  value={this.state.formValues.city}
                  onChange={this.onFormChange.bind(this, "city")}
                  valid={!this.state.formErrors.city}
                  errorMessage={this.state.formErrors.city}
                  placeholder="City"
                  icon="office"
                />
                <Input
                  type="text"
                  value={this.state.formValues.state}
                  onChange={this.onFormChange.bind(this, "state")}
                  valid={!this.state.formErrors.state}
                  errorMessage={this.state.formErrors.state}
                  placeholder="State"
                  icon="earth"
                />

                <Input
                  type="number"
                  value={this.state.formValues.zip}
                  onChange={this.onFormChange.bind(this, "zip")}
                  valid={!this.state.formErrors.zip}
                  errorMessage={this.state.formErrors.zip}
                  placeholder="Zip"
                  icon="location"
                />
              </React.Fragment>
            )}

            <Input
              type="tel"
              placeholder="Phone Number"
              iconUpload="phone"
              value={this.state.formValues.phone}
              onChange={this.onFormChange.bind(this, "phone")}
              valid={!this.state.formErrors.phone}
              errorMessage={this.state.formErrors.phone}
            >
              Phone
            </Input>
          </FormGroup>

          <FormGroup className="mbsc-btn-group-block">
            <Button
              onClick={this.validateAllFields}
              icon="checkmark"
              color="warning"
            >
              Next
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loginError: state.auth.error,
  ...state
});

const mapDispatchToProps = dispatch => ({
});

const DeliveryForm = connect(
         mapStateToProps,
         mapDispatchToProps
       )(DeliveryFormComponent);

export default DeliveryForm