/* eslint-disable react/no-unused-state */
/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component, lazy } from "react";
import {FormGroup, Input, Button} from "@mobiscroll/react";
import { connect } from "react-redux";
import { confirmUniqueEmail, updateUserAcct } from '../../../actions'
import { isUndefined } from "../../../utils"

const LocationSearchInput = lazy(() => import('./LocationSearchInput'));

class AccountFormComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            formErrors: {},
            formValues: {
                name: "",
                email: "",
                password: "",
                confirmPassword:"",
                phone: "",
                address1: "",
                address2: "",
                zip: "",
                state: "",
                city: ""
            },
            emailReady: false,
            selected: false,
            address: "",
            formatted_address: ""
        };

        this.checkEmailAvail = this.checkEmailAvail.bind(this)
        this.checkEmailError = this.checkEmailError.bind(this)
        this.onSelectAddress = this.onSelectAddress.bind(this);
    }

    componentDidMount() {
        this.initValidation();
        const { user='', prefill=false } = this.props;
        const { name='', email='', password='', city='', state='', zip='', address1='', address2=''} = user;

        if(prefill){
          const formValues = { name, email, password, 
            confirmPassword: password, 
            city, state, zip, address1, address2 };
          this.setState({ formValues, selected: true });     
        }
    }


    componentDidUpdate(prevProps, prevState) {
        const { emailUnq} = this.props;
        if (emailUnq !== prevProps.emailUnq){
            this.checkEmailError()
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
          name: [this.requiredCheck, this.minlengthCheck.bind(this, 2)],
          email: [this.requiredCheck, this.emailCheck],
          password: [this.requiredCheck, this.minlengthCheck.bind(this, 6)],
          confirmPassword: [
            this.requiredCheck,
            this.minlengthCheck.bind(this, 6),
            this.confirmPasswordMatch
          ],
          address1: [this.requiredCheck, this.minlengthCheck.bind(this, 2)],
          zip: [this.requiredCheck, this.minlengthCheck.bind(this, 5)],
          state: [this.requiredCheck, this.minlengthCheck.bind(this, 2)],
          city: [this.requiredCheck, this.minlengthCheck.bind(this, 2)],
          phone: [this.requiredCheck, this.minlengthCheck.bind(this, 9), this.checkPhone]
        };
    };

  checkPhone = (value) => {
    const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (value.match(phoneno)) {
      return false;
    }
    return "Not a valid Phone Number";
  }

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
       const { emailUnq } = this.props;
       const { emailReady} = this.state;
        const errorsUpd = { ...this.state.formErrors };
        const values = { ...this.state.formValues };
        let allValid = true;
        for (const key in values) {
            errorsUpd[key] = this.validateField(key, values[key])[key];
            allValid = allValid && !errorsUpd[key];
        }
        if(!emailUnq){
            if( values.email !== ""){
            errorsUpd.email =
            "This email already associated with an existing account";
          }
        }
        this.setState({
            formErrors: errorsUpd
        });
        if (allValid && emailReady) {
            this.props.confirmComplete(this.state.formValues);
        } else {
          this.props.updateAccount(this.state.formValues)
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

  onSelectAddress(str) {
    const addressData = str.split(",");
    const zip = addressData[2].slice(-5);
    const state = addressData[2].slice(1, 3);

    const formValues = {
      address1: addressData[0],
      address2: "",
      zip,
      state,
      city: addressData[1],
      password: this.state.formValues.password,
      confirmPassword: this.state.formValues.confirmPassword,
      name: this.state.formValues.name,
      email: this.state.formValues.email
    };
    this.setState({ selected: true, formValues, address: addressData[0] });
  }

    emailCheck = value => {
        if (/^\w+@\w+\.\w{2,3}$/.test(value)) {
            return false;
        }
        return "This is not a valid email";
    };

    // password match validation
    confirmPasswordMatch() {
      this.checkEmailAvail();
      return this.setState({checking: true}, () => {
          const { formValues } = this.state
          const { password, confirmPassword } = formValues

          if (password === confirmPassword) {
              return false;
          }

          return "Passwords must match exactly";
      });
    };

    // unique email validation
     async checkEmailAvail () {
        const { formValues } = this.state
        const { email } = formValues
         if (!isUndefined(email)){
             await this.props.confirmUniqueUser(email);
         }
    };

    checkEmailError() {
        const { emailUnq } = this.props;
        if(emailUnq) {
            this.setState({emailReady: true})
        } else {
            this.setState({
                formErrors:
                    { email: "This email already associated with an existing account" }
            })
        }
    }
    

    render() {
      const {selected} = this.state;
      const { prefill } = this.props;
        return (
          <section className="register-form page-section-ptb">
            <div className="container">
              {!prefill && (
              <div className="row justify-content-center">
                <div className="col-md-10">
                  <div className="section-title">
                    <span>Welcome to </span>
                    <h2>Parts Detect</h2>
                    <div className="separator" />
                  </div>
                </div>
              </div>
              )}
              <div className="row justify-content-center">
                <div className="col-lg-8 col-md-12">
                  <div className="gray-form">
                    <FormGroup>
                      <div className="row">
                        <div className="form-group col-md-12">
                          <label>Name</label>
                          <div className="hybridInput-account">
                            <Input
                              type="text"
                              className="form-control"
                              value={this.state.formValues.name}
                              onChange={this.onFormChange.bind(this, "name")}
                              valid={!this.state.formErrors.name}
                              errorMessage={this.state.formErrors.name}
                              onBlur={this.checkEmailAvail}
                              placeholder="Name"
                              icon="line-user"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Email (username) </label>
                        <div className="hybridInput-account">
                          <Input
                            type="email"
                            className="form-control"
                            value={this.state.formValues.email}
                            onChange={this.onFormChange.bind(this, "email")}
                            valid={!this.state.formErrors.email}
                            errorMessage={this.state.formErrors.email}
                            onBlur={this.checkEmailAvail}
                            placeholder="Email"
                            icon="ion-ios7-email"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Password </label>
                        <div className="hybridInput-account">
                          <Input
                            type="password"
                            value={this.state.formValues.password}
                            onChange={this.onFormChange.bind(this, "password")}
                            valid={!this.state.formErrors.password}
                            errorMessage={this.state.formErrors.password}
                            placeholder="Password"
                            icon="lock2"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Confirm Password</label>
                        <div className="hybridInput-account">
                          <Input
                            type="password"
                            value={this.state.formValues.confirmPassword}
                            onChange={this.onFormChange.bind(this, "confirmPassword")}
                            valid={!this.state.formErrors.confirmPassword}
                            errorMessage={this.state.formErrors.confirmPassword}
                            placeholder="Confirm Password"
                            icon="lock2"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </FormGroup>

                    <FormGroup>
                      <div className="form-group">
                        <label>Address</label>
                        <div className="hybridInput-account">
                          <LocationSearchInput className="form-control" selected={selected} address1={this.state.formValues.address1} onSelectAddress={this.onSelectAddress} />
                        </div>
                      </div>

                      {selected && (
                        // eslint-disable-next-line react/jsx-fragments
                        <React.Fragment>
                          <div className="form-group">
                            <label>Address Line 1</label>
                            <div className="hybridInput-account">
                              <Input
                                type="text"
                                value={this.state.formValues.address1}
                                onChange={this.onFormChange.bind(this, "address1")}
                                valid={!this.state.formErrors.address1}
                                errorMessage={this.state.formErrors.address1}
                                placeholder="Address Line 1"
                                icon="home"
                                className="form-control"
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label>Address Line 2</label>
                            <div className="hybridInput-account">
                              <Input
                                type="text"
                                value={this.state.formValues.address2}
                                onChange={this.onFormChange.bind(this, "address2")}
                                valid={!this.state.formErrors.address2}
                                errorMessage={this.state.formErrors.address2}
                                placeholder="Address Line 2"
                                icon="home"
                                className="form-control"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>City</label>
                            <div className="hybridInput-account">
                              <Input
                                type="text"
                                className="form-control"
                                value={this.state.formValues.city}
                                onChange={this.onFormChange.bind(this, "city")}
                                valid={!this.state.formErrors.city}
                                errorMessage={this.state.formErrors.city}
                                placeholder="City"
                                icon="office"
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label>State</label>
                            <div className="hybridInput-account">
                              <Input
                                type="text"
                                className="form-control"
                                value={this.state.formValues.state}
                                onChange={this.onFormChange.bind(this, "state")}
                                valid={!this.state.formErrors.state}
                                errorMessage={this.state.formErrors.state}
                                placeholder="State"
                                icon="earth"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label>State</label>
                            <div className="hybridInput-account">
                              <Input
                                type="number"
                                className="form-control"
                                value={this.state.formValues.zip}
                                onChange={this.onFormChange.bind(this, "zip")}
                                valid={!this.state.formErrors.zip}
                                errorMessage={this.state.formErrors.zip}
                                placeholder="Zip"
                                icon="location"
                              />
                            </div>
                          </div>
                        </React.Fragment>
                      )}
                      <div className="form-group">
                        <label>Phone</label>
                        <div className="hybridInput-account">
                          <Input
                            type="tel"
                            placeholder="Phone Number"
                            iconUpload="phone"
                            className="form-control"
                            value={this.state.formValues.phone}
                            onChange={this.onFormChange.bind(this, "phone")}
                            valid={!this.state.formErrors.phone}
                            errorMessage={this.state.formErrors.phone}
                          />
                        </div>
                      </div>
                    </FormGroup>
                    {!prefill && (
                    <div className="form-group">
                      <div className="remember-checkbox">
                        <input type="checkbox" name="one" id="one" />
                        <label htmlFor="one">
                          Accept our
                          {' '}
                          <a href="/#/tos"> privacy policy</a>
                          {' '}
                          and
                          {' '}
                          <a href="/#/customer-agreement"> customer agreement</a>
                        </label>
                      </div>
                    </div>
                    )}
                    <FormGroup className="mbsc-btn-group-block">
                      <Button
                        onClick={this.validateAllFields}
                        icon="checkmark"
                        style={{ backgroundColor: "#f68b1e", color: "#FFF" }}
                      >
                        {prefill ? "Update Account" : "Register Account"}
                      </Button>
                    </FormGroup>                    
                    <p className="link">
                      Already have an account? please
                      <a href="/#/login"> login here </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    loginError: state.auth.error,
    emailUnq: state.registration.emlUnique
});

const mapDispatchToProps = dispatch => ({
    confirmUniqueUser: (eml) => dispatch(confirmUniqueEmail(eml)),
    updateAccount: (d) => dispatch(updateUserAcct(d))
});

const AccountForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountFormComponent);

export default AccountForm