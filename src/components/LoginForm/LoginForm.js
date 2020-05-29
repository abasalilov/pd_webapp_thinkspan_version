/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";
import {Form, FormGroup, Input, Button, Popup} from "@mobiscroll/react";
import { connect } from "react-redux";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";

class LoginFormComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formErrors: {},
      formValues: {
        email: "",
        password: ""
      }
    };

    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.initValidation();
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
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
      username: [this.requiredCheck, this.minlengthCheck.bind(this, 2)],
      email: [this.requiredCheck, this.emailCheck],
      password: [this.requiredCheck, this.minlengthCheck.bind(this, 6)],
      gender: [this.requiredCheck],
      bio: [this.requiredCheck, this.minlengthCheck.bind(this, 20)]
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

    if (allValid) {
      // this.success.instance.show();
      await this.props.onSubmit(values);
    }

    this.setState({
      formErrors: errorsUpd
    });
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

  emailCheck = value => {
    if (/^\w+@\w+\.\w{2,3}$/.test(value)) {
      return false;
    }
    return "This is not a valid email";
  };

  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.validateAllFields();
    }
  }

  render() {
    return (
      <div>
        <Form className="loginForm" noValidate onSubmit={this.validateAllFields}>
          <FormGroup>
            <div
              className="hybridInput"
            >
              <Input
                type="email"
                value={this.state.formValues.email}
                onChange={this.onFormChange.bind(this, "email")}
                valid={!this.state.formErrors.email}
                errorMessage={this.state.formErrors.email}
                placeholder="Email"
                icon="ion-ios7-email"
              />
            </div>
            <div className="hybridInput">
              <Input
                type="password"
                value={this.state.formValues.password}
                onChange={this.onFormChange.bind(this, "password")}
                valid={!this.state.formErrors.password}
                errorMessage={this.state.formErrors.password}
                placeholder="Password"
                icon="lock2"
              />
            </div>
          </FormGroup>

          <FormGroup className="mbsc-btn-group-block">
            <Button
              onClick={this.validateAllFields}
              icon="checkmark"
              style={{ backgroundColor: "#f68b1e", color:"#FFF"}}
            >
              Log In
            </Button>
          </FormGroup>
        </Form>

        <Popup
          ref={this.setRef}
          focusOnClose={false}
          buttons={[
            {
              text: "Log in",
              handler: "set"
            }
          ]}
        >
          <h3>Thank you for registering</h3>
          <p>You have successfully signed up as a user!</p>
        </Popup>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  loginError: state.auth.error
});

const mapDispatchToProps = dispatch => ({});

export const LoginForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormComponent);
