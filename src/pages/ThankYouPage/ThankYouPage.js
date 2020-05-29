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
import { logoutUser } from "../../actions";

class ThankYouPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
  }
}

  render() {
    const { isMobile, isLoggedIn, items} = this.props
    return (
      <React.Fragment>
        <section className="login-form page-section-ptb">
          <div className="yiv0445440591" id="yui_3_16_0_1_1441126343728_2384">
            <div className="yiv0445440591" id="yui_3_16_0_1_1441126343728_2383">
              <p className="yiv0445440591">
                Parts Detect
              </p>
              <table>
                <tr>
                  <td>
                    <strong>Parts Detect</strong>
                    <br />
                    "user.autozone.phone" 
                    <br />
                    <br />
                  </td>
                  <td>
                    <strong>"vehicle"</strong>
                    <br />
                    "vin"
                    <br />
                    <br />
                  </td>
                </tr>
              </table>
              <br />
              <table>
                <tr>
                  <td>
                    <strong>Customer Information</strong>
                    <hr />
                  </td>
                  <td>
                    <strong>Order Information</strong>
                    <hr />
                  </td>
                </tr>
                <tr>
                  <td valign="top">
                    "user.name" 
                    <br />
                    "user.email" 
                  </td>
                  <td valign="top">
                    Order Date: "date"
                    <br />
                    "delivery"
                    <br />
                    PO #: "checkout.po"
                    <br />
                    Notes: "checkout.notes"
                  </td>
                </tr>
              </table>
              <br />
              <br />
              <table>
                <tr>
                  <td>
                    <strong>Items</strong>
                  </td>
                </tr>
              </table>
              <table>
                <tr>
                  <td>
                    Qty
                  </td>
                  <td>
                    Sku
                  </td>
                  <td>
                    Description
                  </td>
                  <td>
                    Cost
                  </td>
                  <td>
                    Core
                  </td>
                </tr>
                <tr>
                  <td colSpan="5">
                    <hr />
                  </td>
                </tr>
                "items"
                <tr>
                  <td>
                    "qty"
                  </td>
                  <td>
                    "sku"
                  </td>
                  <td>
                    "description"
                  </td>
                  <td>
                    "cost"
                  </td>
                  <td>
                    "corePrice"
                  </td>
                </tr>
                "items"
              </table>

              <p className="yiv0445440591">
                <br />
                <br />
                Thank you for placing your order using the Parts Detect system. Your order was placed successfully. Please refer to your AutoZone account for further details.
              </p>
            </div>
            <div className="yiv0445440591">
              <p className="yiv0445440591">
                If you did not place this order, please contact support at 
                <a rel="nofollow" ymailto="mailto:support@partsdetect.com" target="_blank" href="mailto:support@partsdetect.com" className="yiv0445440591">support@partsdetect.com</a>
                .
              </p>
            </div>
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

export const ThankYouPage =  connect(mapStateToProps, mapDispatchToProps)(ThankYouPageComponent);
