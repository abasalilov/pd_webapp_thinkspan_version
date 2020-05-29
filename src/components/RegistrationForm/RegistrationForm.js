/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-fragments */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
import React, { Component, lazy } from "react";
import {OptionItem, FormGroup, Button, Progress} from "@mobiscroll/react";
import { connect } from "react-redux";
import { registerUser } from "../../actions";

const PayForm = lazy(() => import('./FormSections/PayForm'));
const AccountForm = lazy(() => import('./FormSections/AccountForm'));
const DeliveryForm = lazy(() => import('./FormSections/DeliveryForm'));
const VendorForm = lazy(() => import('./FormSections/VendorForm'));

const CREATE = "Create Account";
const DELIVERY = "Delivery Address";
const PAY = "Pay Options";
const VENDORS = "Parts Vendors";

class RegFormComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: CREATE,
      formReady: false,
      nextVal: 0,
      verifiedForm: {
        account: {},
        delivery: {},
        pay: {},
        vendors: {}
      }
    };

    this.options = [
      { name: CREATE, form: <AccountForm /> },
      { name: DELIVERY, form: <DeliveryForm /> },
      { name: PAY, form: <PayForm /> },
      { name: VENDORS, form: <VendorForm /> }
    ];

    this.confirmComplete = this.confirmComplete.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleOptionItemClick = this.handleOptionItemClick.bind(this);
  }

  componentDidMount() {
    const labelList = [
      "Create Account",
      "Delivery Address",
      "Pay Options",
      "Vendors",
      "Register"
    ];
    const checkoutLabels = document.querySelectorAll(
      ".md-demo .mbsc-progress-step-label"
    );
    // replace checkout progress labels
    for (let i = 0; i < checkoutLabels.length; ++i) {
      checkoutLabels[i].innerHTML = labelList[i];
    }
  }

  next = () => {
    if (this.state.nextVal >= 100) {
      this.setState({
        nextVal: 0
      });
    } else {
      this.setState({
        nextVal: this.state.nextVal + 25
      });
    }
  };

  handleOptionItemClick(nm) {
    this.setState({ selected: nm });
  }

  confirmComplete(data) {
    const { selected, formReady } = this.state;
    const verifiedForm = { ...this.state.verifiedForm };

    if (selected === CREATE) {
      verifiedForm.account = data;
      this.setState({ verifiedForm });
      this.setState({ selected: DELIVERY }, () => {
      });
    }
    if (selected === DELIVERY) {
      verifiedForm.delivery = data;
      this.setState({ verifiedForm });
      this.setState({ selected: PAY }, () => {
      });
    }
    if (selected === PAY) {
      verifiedForm.pay = data;
      this.setState({ verifiedForm });
      this.setState({ selected: VENDORS }, () => {
      });
    }
    if (selected === VENDORS) {
      verifiedForm.vendors = data;
      this.setState({ verifiedForm });
      this.setState({ formReady: true }, () => {
      });
      alert("You're ready to register! Registration button is on the left");
    }
    this.next();
  }

  handleRegistration(data) {
    this.props.register(data)
  }

  render() {
    const { selected, formReady } = this.state;
    // const { isMobile } = this.props;
    return (
      <div className="mbsc-grid">
        <div className="mbsc-row">
          <div
            className="mbsc-col-4"
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            {this.options.map((opt) => (
              <React.Fragment>
                <OptionItem
                  key={opt.name}
                  className={`selected_${opt.name === selected ? 0 : 6}`}
                  selected={opt.name === selected}
                  onClick={() => this.handleOptionItemClick(opt.name)}
                  value={opt.name}
                  style={{
                    padding: "2rem",
                    border: "solid gray 1px",
                    backgroundColor: "white"
                  }}
                >
                  {opt.name}
                </OptionItem>
              </React.Fragment>
            ))}
            {formReady && (
              <FormGroup className="mbsc-btn-group-block">
                <Button
                  onClick={this.handleRegistration}
                  icon="upload"
                  color="warning"
                >
                  Register
                </Button>
              </FormGroup>
            )}
          </div>
          <div className="mbsc-col-8">
            <h5>Registration</h5>
            <FormGroup>
              <label className="md-demo">
                <Progress
                  value={this.state.nextVal}
                  max={100}
                  data-step-labels="[0, 25, 50, 75, 100]"
                  color="warning"
                />
              </label>
            </FormGroup>
            {selected === CREATE && (
              <AccountForm confirmComplete={this.handleRegistration} />
            )}
            {/* {selected === DELIVERY && (
              <DeliveryForm confirmComplete={this.confirmComplete} />
            )} */}
            {/* {selected === PAY && (
              <PayForm confirmComplete={this.confirmComplete} />
            )}
            {selected === VENDORS && (
              <VendorForm confirmComplete={this.confirmComplete} />
            )} */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  isMobile: state.isMobile,
  isRegistrationComplete: state.registration.isRegistrationComplete,
  ...state
});

const mapDispatchToProps = dispatch => ({
  register: data => dispatch(registerUser(data))
});

export const RegistrationForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegFormComponent);
