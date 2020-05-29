/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/jsx-fragments */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/no-array-index-key */
/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Input, Switch} from "@mobiscroll/react";
import { logoutUser } from "../../actions";

const VIN = "VIN"
// 1fmhk7f84cga66724

class CheckoutPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formCorrect: true,
      formErrors: {},
      formValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        address1: "",
        address2: "",
        zip: "",
        state: "",
        city: ""
      }
    };
    this.handleFormCorrection = this.handleFormCorrection.bind(this);
    this.handleCheckout = this.handleCheckout.bind(this);
  }

  componentDidMount() {
    const { isLoggedIn } = this.props;
    setTimeout(() => {
      window.scrollTo({
        top: 250,
        behavior: 'smooth'
      });
    }, 1000);  

    if (isLoggedIn) {
    const { user = {}} = this.props;
    const { name = '', city = '', state = '', zip = '', address1 = '', address2 = ''} = user;

      const formValues = {
        name, 
        city, state, zip, address1, address2
      };
      this.setState({ formValues});
    }
    this.initValidation();
  }

  // set up validation
  initValidation = () => {
    this.validationSettings = {
      name: [this.requiredCheck, this.minlengthCheck.bind(this, 2)],
      email: [this.requiredCheck, this.emailCheck],
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
    const { emailReady } = this.state;
    const errorsUpd = { ...this.state.formErrors };
    const values = { ...this.state.formValues };
    let allValid = true;
    for (const key in values) {
      errorsUpd[key] = this.validateField(key, values[key])[key];
      allValid = allValid && !errorsUpd[key];
    }
    if (!emailUnq) {
      if (values.email !== "") {
        errorsUpd.email =
          "This email already associated with an existing account";
      }
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


handleFormCorrection() {
  const { formCorrect } = this.state;
  this.setState({formCorrect: !formCorrect})
}

handleCheckout() {
  this.props.history.push('/thank-you')
}

  render() {
    const { isLoggedIn, items} = this.props

    let cartTotal = 0;
    items.map(item => {
      if (typeof item.quantity === "undefined") {
        cartTotal += Number(item.price) * 1;
      } else {
        const sub = Number(item.price) * Number(item.quantity);
        cartTotal += sub;
      }
    })
    return (
      <React.Fragment>
        <section className="login-form page-section-ptb">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-title">
                  <span>Almost Done! </span>
                  <h2>Checkout</h2>
                  <div className="separator" />
                </div>
              </div>
            </div>
            <form className="needs-validation" noValidate>
              <div className="row">
                <div className="col-md-6 order-md-2 mb-4">
                  <h4 className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-muted">Your cart</span>
                  </h4>
                  <ul className="list-group mb-3">
                    {items.map(item => {
                      return (
                        <li className="list-group-item d-flex justify-content-between lh-condensed">
                          <div>
                            <h6 className="my-0">Product name</h6>
                            <small className="text-muted">Brief description</small>
                          </div>
                          <span className="text-muted">$12</span>
                        </li>
                      )
                      })}
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 className="my-0">Second product</h6>
                        <small className="text-muted">Brief description</small>
                      </div>
                      <span className="text-muted">$8</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between lh-condensed">
                      <div>
                        <h6 className="my-0">Third item</h6>
                        <small className="text-muted">Brief description</small>
                      </div>
                      <span className="text-muted">$5</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Total (USD)</span>
                      <strong>{`$${cartTotal}`}</strong>
                    </li>
                  </ul>

                  <hr className="mb-4" />

                  <h4 className="mb-3">Payment</h4>

                  <div className="d-block my-3">
                    <div className="custom-control custom-radio">
                      <input id="cod" name="paymentMethod" type="radio" className="custom-control-input" checked required />
                      <label className="custom-control-label" htmlFor="cod">Pay Directly on eBay</label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
                      <label className="custom-control-label" htmlFor="debit">Debit card</label>
                    </div>
                    <div className="custom-control custom-radio">
                      <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required />
                      <label className="custom-control-label" htmlFor="paypal">Paypal</label>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="cc-name">Name on card</label>
                      <input type="text" className="form-control input-text" id="cc-name" placeholder="" required />
                      <small className="text-muted">Full name as displayed on card</small>
                      <div className="invalid-feedback">
                        Name on card is required
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="cc-number">Credit card number</label>
                      <div className="hybridInput-account">
                        <Input
                          type="text"
                          className="form-control input-text"
                          id="cc-number"
                          placeholder="xxxx-xxxx-xxxx-xxxx"
                          value={this.state.formValues.ccNumber}
                          onChange={this.onFormChange.bind(this, "ccNumber")}
                          valid={!this.state.formErrors.ccNumber}
                          errorMessage={this.state.formErrors.ccNumber}
                        />
                      </div>
                      <div className="invalid-feedback">
                        Credit card number is required
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="cc-expiration">Expiration</label>
                      <div className="hybridInput-account">
                        <Input
                          type="text"
                          className="form-control input-text"
                          placeholder=""
                          value={this.state.formValues.ccExp}
                          onChange={this.onFormChange.bind(this, "ccExp")}
                          valid={!this.state.formErrors.ccExp}
                          errorMessage={this.state.formErrors.ccExp}
                          id="cc-expiration" 
                        />
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="cc-expiration">CVV</label>
                      <div className="hybridInput-account">
                        <Input
                          type="text"
                          className="form-control input-text"
                          placeholder=""
                          value={this.state.formValues.cvv}
                          onChange={this.onFormChange.bind(this, "cvv")}
                          valid={!this.state.formErrors.cvv}
                          errorMessage={this.state.formErrors.cvv}
                          id="cc-cvv"
                        />
                      </div>
                      <div className="invalid-feedback">
                        Security code required
                      </div>
                    </div>
                  </div>
                  <hr className="mb-4" />
                  <button className="button cart_btn btn-lg btn-block" onClick={this.handleCheckout} type="submit">Continue to checkout</button>
                </div>
                <div className="col-md-6 order-md-1">
                  <div className="checkoutSwitch">
                    <h4 className="mb-3">Billing address</h4>
                    {isLoggedIn && (
                    <Switch checked={this.state.formCorrect} onChange={this.handleFormCorrection}>
                      Correct Address for Delivery?
                      <span className="mbsc-desc">Switch to update address</span>
                    </Switch>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName">First name</label>
                      <div className="hybridInput-account">
                        <Input
                          type="text"
                          className="form-control input-text"
                          placeholder=""
                          value={this.state.formValues.firstName}
                          onChange={this.onFormChange.bind(this, "firstName")}
                          valid={!this.state.formErrors.firstName}
                          errorMessage={this.state.formErrors.firstName}
                        />
                      </div>
                      <div className="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastName">Last name</label>
                      <div className="hybridInput-account">
                        <Input
                          type="text"
                          className="form-control input-text"
                          placeholder=""
                          value={this.state.formValues.lastName}
                          onChange={this.onFormChange.bind(this, "lastName")}
                          valid={!this.state.formErrors.lastName}
                          errorMessage={this.state.formErrors.lastName}
                        />
                      </div>                      
                      <div className="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="company">
                      Company
                      <span className="text-muted">(Optional)</span>
                    </label>
                    <div className="hybridInput-account">
                      <Input
                        type="text"
                        className="form-control"
                        placeholder=""
                        value={this.state.formValues.company}
                        onChange={this.onFormChange.bind(this, "company")}
                        errorMessage={this.state.formErrors.company}
                      />
                    </div>                      
                    <div className="invalid-feedback">
                      Please enter a valid email address for shipping updates.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address">Street address</label>
                    <div className="hybridInput-account">
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Street Address"
                        value={this.state.formValues.address1}
                        onChange={this.onFormChange.bind(this, "address1")}
                        valid={!this.state.formErrors.address1}
                        errorMessage={this.state.formErrors.address1}
                        id="address2" 
                      />
                    </div>                        
                    <div className="invalid-feedback">
                      Please enter your shipping address.
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address2" className="sr-only">
                      Address 2
                      <span className="text-muted">(Optional)</span>
                    </label>
                    <div className="hybridInput-account">
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Apartment, suite, unit etc. (optional)" 
                        value={this.state.formValues.address2}
                        onChange={this.onFormChange.bind(this, "address2")}
                        valid={!this.state.formErrors.address2}
                        errorMessage={this.state.formErrors.address2}
                        id="address2" 
                      />
                    </div> 
                  </div>
                  <div className="mb-3">
                    <label htmlFor="towncity"> City / Town</label>
                    <div className="hybridInput-account">
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="City"
                        value={this.state.formValues.city}
                        onChange={this.onFormChange.bind(this, "city")}
                        valid={!this.state.formErrors.city}
                        errorMessage={this.state.formErrors.city}
                        id="city"
                      />
                    </div>                     
                    <div className="invalid-feedback">
                      Please select a valid City.
                    </div>
                  </div>
                  <div className=" mb-3">
                    <label htmlFor="zip">Zip</label>
                    <div className="hybridInput-account">
                      <Input
                        type="text"
                        className="form-control"
                        placeholder="Zip"
                        value={this.state.formValues.zip}
                        onChange={this.onFormChange.bind(this, "zip")}
                        valid={!this.state.formErrors.zip}
                        errorMessage={this.state.formErrors.zip}
                        id="city"
                      />
                    </div>                       
                    <div className="invalid-feedback">
                      zip  required.
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="Phone">Phone </label>
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
                      <div className="invalid-feedback">
                        Valid Phone is required.
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="Emailaddress">Email address</label>
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
                      <div className="invalid-feedback">
                        Please enter a valid email address for shipping updates.
                      </div>
                    </div>
                  </div>
                  <hr className="mb-4" />
                  <h4 className="mb-3">Additional information</h4>
                  <div className=" mb-3">
                    <label htmlFor="Ordernotes">Order notes</label>
                    <textarea className="form-control textarea-text" id="Ordernotes" placeholder="Order notes" />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>      
      </React.Fragment>
    );
  }
}



const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
  items: state.cart.addedItems
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutUser())
});

export const CheckoutPage =  connect(mapStateToProps, mapDispatchToProps)(CheckoutPageComponent);
