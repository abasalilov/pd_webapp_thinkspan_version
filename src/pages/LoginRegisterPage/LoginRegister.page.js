/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-fragments */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-array-index-key */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import {Button} from '@mobiscroll/react';
import { connect } from 'react-redux';
import mechBg from '../../media/images/mech_bg_light.png';
import { LoginForm, RegistrationForm } from "../../components"
import { login } from '../../actions'

class LoginRegisterPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // console.log TODO
      showRegistrationForm: false,
        formErrors: {},
        formValues: {
          email: "",
          password: ""
      }
    };
    this.handleNavBack = this.handleNavBack.bind(this);
    this.handleActivateRegistration = this.handleActivateRegistration.bind(
      this
    );
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  

  componentDidMount() {
    setTimeout(() => {
      window.scrollTo({
        top: 600,
        behavior: 'smooth'
      });
    }, 1000);
    this.initValidation();
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLoggedIn, history } = this.props;
    // only navigate on props change
    if (prevProps.isLoggedIn !== isLoggedIn) {
      if (isLoggedIn) {
        //   until signed off by CEO this will route to the profile page
        history.push("/profile")
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

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

  onFormChange = (key, event) => {
    const valueUpd = { ...this.state.formValues };
    valueUpd[key] = event.target.value;
    const errorUpd = this.validateField(key, event.target.value);

    this.setState({
      formValues: valueUpd,
      formErrors: errorUpd
    });
  };

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

  makeAlert() {
    alert("This is placeholder, feature will be integrated later");
  }

  handleNavBack() {
    const { history } = this.props;
    history.push("/");
  }

  handleActivateRegistration() {
    this.props.history.push('/registration')
  }


  renderSignInHeader() {
    return (
      <div className="mbsc-justify-content-center">
        <span
          style={{ display: "flex", flexDirection: "row", textAlign: "center" }}
        >
          <h2 style={{ fontWeight: "bold", marginRight: "4px" }}>Sign In</h2>
          <h2 style={{ marginRight: "4px" }}>Or</h2>
          <Button
            onClick={this.handleActivateRegistration}
            className="reg_link"
            flat
          >
            <h2 style={{ fontWeight: "bold"}}>Register</h2>
          </Button>
          <h2>To Continue</h2>
        </span>
      </div>
    );
  }

  renderLoginOptions() {
    return (
      <div className="mbsc-row mbsc-justify-content-between">
        <Button
          className="orange_text"
          onClick={this.handleNavBack}
          flat
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <span
            style={{ fontSize: "2rem" }}
            className="mbsc-ic mbsc-ic-material-keyboard-arrow-left"
          />
          Back
        </Button>
        <Button
          onClick={this.handleActivateRegistration}
          className="orange_text"
          flat
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          Create Account
          <span
            style={{ fontSize: "2rem" }}
            className="mbsc-ic mbsc-ic-material-keyboard-arrow-right"
          />
        </Button>
      </div>
    );
  }

  render() {
    const { showRegistrationForm } = this.state;
    const { isMobile, submitLogin } = this.props;
    const marginTopContent = isMobile ? "3rem" : "0px";
    return (
      <React.Fragment>
        <section className="inner-intro bg-4">
          <div className="container">
            <div className="row text-center intro-title">
              <div className="col-md-6 text-md-left d-inline-block">
                <h1 className="text-white">Login </h1>
              </div>
              <div className="col-md-6 text-md-right float-right">
                <ul className="page-breadcrumb">
                  <li>
                    <a href="/">
                      <i className="fa fa-home" />
                      {' '}
                      Home
                    </a> 
                    {' '}
                    <i className="fa fa-angle-double-right" />
                  </li>
                  <li>
                    <span>Login</span>
                    {' '}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        {showRegistrationForm && (<RegistrationForm />)}
        <section className="login-form page-section-ptb">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-title">
                  <h2>Login To Your Account</h2>
                  <span
                    className="reg_container"
                  >
                    <h4 style={{ marginRight: "4px" }}>Or</h4>
                    <button
                      onClick={this.handleActivateRegistration}
                      className="reg_link"
                      type="button"
                    >
                      <h4 style={{ fontWeight: "bold"}}>Register</h4>
                    </button>
                    <h4>To Continue</h4>
                  </span>
                  <div className="separator" />
                </div>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-12">
                <div className="gray-form clearfix">
                  <LoginForm onSubmit={submitLogin} />
                </div>
                <div className="login-social text-center">
                  <h5>Login with Social media</h5>
                  <ul>
                    <li>
                      <a className="fb button" href="#">
                        <i className="fa fa-facebook" />
                        {' '}
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a className="twitter button" href="#">
                        <i className="fa fa-twitter" />
                        {' '}
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a className="pinterest button" href="#">
                        <i className="fa fa-google-plus" />
                        {' '}
                        google+
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}



const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  error: state.auth.error,
  ...state
});

const mapDispatchToProps = dispatch => ({
  submitLogin: (creds) => dispatch(login(creds))
});

export const LoginRegisterPage=  connect(mapStateToProps, mapDispatchToProps)(LoginRegisterPageComponent);
