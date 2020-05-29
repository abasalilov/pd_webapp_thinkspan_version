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
import {FormGroup, Button} from "@mobiscroll/react";
import { connect } from "react-redux";
import { registerUser } from "../../actions";

const PayForm = lazy(() => import('../../components/RegistrationForm/FormSections/PayForm'));
const AccountForm = lazy(() => import('../../components/RegistrationForm/FormSections/AccountForm'));
const DeliveryForm = lazy(() => import('../../components/RegistrationForm/FormSections/DeliveryForm'));
const VendorForm = lazy(() => import('../../components/RegistrationForm/FormSections/VendorForm'));


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

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const { isRegistrationComplete } = this.props;
    if (isRegistrationComplete && isRegistrationComplete !== prevProps.isRegistrationComplete) {
      this.props.history.push("/#/dashboard")
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
    const { formReady } = this.state;
    return (
      <div className="mbsc-col-12">
        <AccountForm confirmComplete={this.handleRegistration} />
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

export const RegistrationPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegFormComponent);
