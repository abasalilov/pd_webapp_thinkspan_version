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
import {Form, Input, FormGroup, Card, CardContent, CardHeader, CardTitle, Button} from "@mobiscroll/react";
import { connect } from "react-redux";
import { confirmUniqueEmail } from "../../../actions"

class VendorFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: {},
      formValues: {
        name: "",
        card: "",
        cvv: "",
        exp: ""
      }
    };
  }

  componentDidMount() {
    this.initValidation();
  }

  componentDidUpdate(prevProps, prevState) {
    const { emailUnq } = this.props;
    if (emailUnq !== prevProps.emailUnq) {
      this.checkEmailError();
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

  setRef = comp => {
    this.success = comp;
  };

  // set up validation
  initValidation = () => {
    this.validationSettings = {
      card: [this.requiredCheck, this.minlengthCheck.bind(this, 10)],
      name: [this.requiredCheck, this.minlengthCheck.bind(this, 3)],
      exp: [this.requiredCheck, this.minlengthCheck.bind(this, 6)],
      cvv: [this.requiredCheck, this.minlengthCheck.bind(this, 3)]
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

  render() {
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
            <Card>
              <CardHeader>
                <CardTitle>
                  Billing Information (Might be removed)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  type="text"
                  value={this.state.formValues.name}
                  onChange={this.onFormChange.bind(this, "name")}
                  valid={!this.state.formErrors.name}
                  errorMessage={this.state.formErrors.name}
                  placeholder="Name"
                  icon="user4"
                />

                <Input
                  type="number"
                  value={this.state.formValues.card}
                  onChange={this.onFormChange.bind(this, "card")}
                  valid={!this.state.formErrors.card}
                  errorMessage={this.state.formErrors.card}
                  placeholder="Credit Card Number"
                  icon="newspaper"
                />

                <Input
                  type="text"
                  value={this.state.formValues.exp}
                  onChange={this.onFormChange.bind(this, "exp")}
                  valid={!this.state.formErrors.exp}
                  errorMessage={this.state.formErrors.exp}
                  placeholder="Expiration Date"
                  icon="calendar"
                />
                <Input
                  type="number"
                  value={this.state.formValues.cvv}
                  onChange={this.onFormChange.bind(this, "cvv")}
                  valid={!this.state.formErrors.cvv}
                  errorMessage={this.state.formErrors.cvv}
                  placeholder="3-digit CVV"
                  icon="lock2"
                />
              </CardContent>
            </Card>
            ;
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
  emailUnq: state.registration.emlUnique,
  ...state
});

const mapDispatchToProps = dispatch => ({
  confirmUniqueUser: eml => dispatch(confirmUniqueEmail(eml))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendorFormComponent);
